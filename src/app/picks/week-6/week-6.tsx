"use client"

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { MoreHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { motion } from "framer-motion"
import { getUserDetails } from "@/app/_data/user";
import { checkSeasonPayment, checkWeeklyPayment, getStripeCustomerId } from "@/app/_actions/stripe";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-fit mx-auto p-4 flex items-center justify-center">
      <motion.div
        initial={{
          width: 0,
          height: 0,
          borderRadius: 0,
        }}
        whileInView={{
          width: "100%",
          height: "100%",
        }}
        style={{
          transformOrigin: "top-left",
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="absolute inset-0 h-full border border-neutral-200 dark:border-neutral-800 w-full"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -top-1 -left-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -top-1 -right-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -bottom-1 -left-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeInOut" }}
          className="absolute -bottom-1 -right-1 h-2 w-2 dark:bg-neutral-800 bg-neutral-200"
        />
      </motion.div>
      {children}
    </div>
  );
};

export default function Picks() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasPaid, setHasPaid] = useState(false);
    const router = useRouter();

    const predictions = [
        { game: "SF @ SEA", moneyline: { SF: -170, SEA: 142 }, spread: { favorite: "SF", line: -3.5 }, ou: { line: 47.5, prediction: "Over" }, pointDiff: 3.98, winner: "SF", projectedScore: { SF: 23.83, SEA: 19.85 } },
        { game: "JAX @ CHI", moneyline: { JAX: 120, CHI: -142 }, spread: { favorite: "CHI", line: -2.5 }, ou: { line: 44.5, prediction: "Over" }, pointDiff: 2.89, winner: "CHI", projectedScore: { JAX: 22.27, CHI: 25.17 } },
        { game: "WAS @ BAL", moneyline: { WAS: 230, BAL: -285 }, spread: { favorite: "BAL", line: -6.5 }, ou: { line: 52.5, prediction: "Under" }, pointDiff: 6.16, winner: "BAL", projectedScore: { WAS: 20.77, BAL: 26.93 } },
        { game: "ARI @ GB", moneyline: { ARI: 195, GB: -238 }, spread: { favorite: "GB", line: -5.0 }, ou: { line: 49.5, prediction: "Under" }, pointDiff: 6.22, winner: "GB", projectedScore: { ARI: 20.97, GB: 27.20 } },
        { game: "HOU @ NE", moneyline: { HOU: -310, NE: 250 }, spread: { favorite: "HOU", line: 7.0 }, ou: { line: 38.0, prediction: "Over" }, pointDiff: 1.63, winner: "HOU", projectedScore: { HOU: 19.70, NE: 18.07 } },
        { game: "TB @ NO", moneyline: { TB: -180, NO: 150 }, spread: { favorite: "TB", line: -3.5 }, ou: { line: 41.5, prediction: "Over" }, pointDiff: 3.02, winner: "TB", projectedScore: { TB: 24.09, NO: 21.08 } },
        { game: "CLE @ PHI", moneyline: { CLE: 330, PHI: -425 }, spread: { favorite: "PHI", line: -8.5 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 6.52, winner: "PHI", projectedScore: { CLE: 20.35, PHI: 26.87 } },
        { game: "IND @ TEN", moneyline: { IND: -112, TEN: -108 }, spread: { favorite: "IND", line: -1.0 }, ou: { line: 43.0, prediction: "Under" }, pointDiff: 1.63, winner: "IND", projectedScore: { IND: 20.47, TEN: 18.84 } },
        { game: "LAC @ DEN", moneyline: { LAC: -155, DEN: 130 }, spread: { favorite: "LAC", line: -3.0 }, ou: { line: 35.5, prediction: "Under" }, pointDiff: 1.42, winner: "LAC", projectedScore: { LAC: 18.96, DEN: 17.55 } },
        { game: "PIT @ LV", moneyline: { PIT: -155, LV: 130 }, spread: { favorite: "PIT", line: 3.0 }, ou: { line: 36.5, prediction: "Over" }, pointDiff: 3.63, winner: "LV", projectedScore: { PIT: 18.02, LV: 21.65 } },
        { game: "ATL @ CAR", moneyline: { ATL: -265, CAR: 215 }, spread: { favorite: "ATL", line: -6.0 }, ou: { line: 47.5, prediction: "Under" }, pointDiff: 3.58, winner: "ATL", projectedScore: { ATL: 23.41, CAR: 19.83 } },
        { game: "DET @ DAL", moneyline: { DET: -162, DAL: 136 }, spread: { favorite: "DET", line: 3.0 }, ou: { line: 52.5, prediction: "Under" }, pointDiff: 0.08, winner: "DET", projectedScore: { DET: 20.69, DAL: 20.61 } },
        { game: "CIN @ NYG", moneyline: { CIN: -170, NYG: 142 }, spread: { favorite: "CIN", line: -3.5 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 5.08, winner: "CIN", projectedScore: { CIN: 23.73, NYG: 18.65 } },
        { game: "BUF @ NYJ", moneyline: { BUF: -135, NYJ: 114 }, spread: { favorite: "BUF", line: -2.0 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 3.69, winner: "BUF", projectedScore: { BUF: 20.93, NYJ: 17.24 } },
      ];
  
    useEffect(() => {
      async function checkAuthAndPayment() {
        const session = await getUserDetails();
        setIsAuthenticated(!!session);
        setIsLoading(false);
      }
      checkAuthAndPayment();
    }, []);
  
    if (isLoading) {
      return <div className="flex min-h-screen w-full items-center justify-center bg-transparent">
        <p className="text-neutral-800 dark:text-neutral-200">Loading...</p>
      </div>;
    }
  
    if (!isAuthenticated) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-transparent">
          <Card className="w-full max-w-md bg-transparent border-none">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Only authenticated users can see historical picks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push('/auth/sign-in')} 
                className="w-full"
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-transparent">
          <Header>
            <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              Week 6
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  Predictions are made by analyzing a diverse set of historical data. Add in your own best judgement to inform your own decisions.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Game</TableHead>
                      <TableHead>Moneyline</TableHead>
                      <TableHead>Spread</TableHead>
                      <TableHead>Predicted Score Diff</TableHead>
                      <TableHead>O/U Line</TableHead>
                      <TableHead>O/U Prediction</TableHead>
                      <TableHead>Predicted Winner</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictions.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.game}</TableCell>
                        <TableCell>
                          {Object.entries(row.moneyline).map(([team, odds]) => (
                            <div key={team}>{team}: {odds > 0 ? '+' : ''}{odds}</div>
                          ))}
                        </TableCell>
                        <TableCell>{row.spread.favorite} {row.spread.line}</TableCell>
                        <TableCell>{row.pointDiff.toFixed(2)}</TableCell>
                        <TableCell>{row.ou.line}</TableCell>
                        <TableCell>
                          <Badge variant={row.ou.prediction === "Over" ? "outline" : "secondary"}>
                            {row.ou.prediction}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.winner}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
    )
}