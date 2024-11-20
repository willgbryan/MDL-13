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
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const predictions = [
        { 
            game: "WAS @ PHI", 
            moneyline: { WAS: 150, PHI: -180 }, 
            spread: { favorite: "PHI", line: 3.5 }, 
            ou: { line: 48.5, prediction: "Under" }, 
            pointDiff: 5.63, 
            winner: "PHI", 
            projectedScore: { WAS: 21.04, PHI: 26.68 },
            actual: { winner: "PHI", score: { PHI: 26, WAS: 18 }, total: 44 }
        },
        {
            game: "GB @ CHI",
            moneyline: { GB: -230, CHI: 190 },
            spread: { favorite: "GB", line: 5.5 },
            ou: { line: 40.5, prediction: "Over" },
            pointDiff: 1.35,
            winner: "GB",
            projectedScore: { GB: 23.96, CHI: 22.60 },
            actual: { winner: "GB", score: { GB: 20, CHI: 19 }, total: 39 }
        },
        {
            game: "JAX @ DET",
            moneyline: { JAX: 525, DET: -750 },
            spread: { favorite: "DET", line: 13.0 },
            ou: { line: 47.0, prediction: "Over" },
            pointDiff: 8.71,
            winner: "DET",
            projectedScore: { JAX: 20.06, DET: 28.77 },
            actual: { winner: "DET", score: { DET: 52, JAX: 6 }, total: 58 }
        },
        {
            game: "LV @ MIA",
            moneyline: { LV: 260, MIA: -325 },
            spread: { favorite: "MIA", line: 7.0 },
            ou: { line: 44.0, prediction: "Under" },
            pointDiff: 3.41,
            winner: "MIA",
            projectedScore: { LV: 20.08, MIA: 23.49 },
            actual: { winner: "MIA", score: { MIA: 34, LV: 19 }, total: 53 }
        },
        {
            game: "LA @ NE",
            moneyline: { LA: -205, NE: 170 },
            spread: { favorite: "LA", line: 4.5 },
            ou: { line: 43.5, prediction: "Under" },
            pointDiff: 0.77,
            winner: "LA",
            projectedScore: { NE: 21.69, LA: 22.47 },
            actual: { winner: "LA", score: { LA: 28, NE: 22 }, total: 50 }
        },
        {
            game: "CLE @ NO",
            moneyline: { CLE: -108, NO: -112 },
            spread: { favorite: "NO", line: 1.0 },
            ou: { line: 44.5, prediction: "Over" },
            pointDiff: 1.98,
            winner: "NO",
            projectedScore: { CLE: 20.94, NO: 22.92 },
            actual: { winner: "NO", score: { NO: 35, CLE: 14 }, total: 49 }
        },
        {
            game: "IND @ NYJ",
            moneyline: { IND: 164, NYJ: -198 },
            spread: { favorite: "NYJ", line: 4.0 },
            ou: { line: 43.5, prediction: "Over" },
            pointDiff: 3.04,
            winner: "NYJ",
            projectedScore: { IND: 20.46, NYJ: 23.50 },
            actual: { winner: "IND", score: { IND: 28, NYJ: 27 }, total: 55 }
        },
        {
            game: "BAL @ PIT",
            moneyline: { BAL: -175, PIT: 145 },
            spread: { favorite: "BAL", line: 3.0 },
            ou: { line: 48.0, prediction: "Under" },
            pointDiff: 0.65,
            winner: "BAL",
            projectedScore: { BAL: 22.63, PIT: 21.98 },
            actual: { winner: "PIT", score: { PIT: 18, BAL: 16 }, total: 34 }
        },
        {
            game: "MIN @ TEN",
            moneyline: { MIN: -258, TEN: 210 },
            spread: { favorite: "MIN", line: 6.0 },
            ou: { line: 39.5, prediction: "Over" },
            pointDiff: 1.28,
            winner: "MIN",
            projectedScore: { TEN: 20.21, MIN: 21.49 },
            actual: { winner: "MIN", score: { MIN: 23, TEN: 13 }, total: 36 }
        },
        {
            game: "ATL @ DEN",
            moneyline: { ATL: 120, DEN: -142 },
            spread: { favorite: "DEN", line: 2.5 },
            ou: { line: 44.0, prediction: "Over" },
            pointDiff: 3.71,
            winner: "DEN",
            projectedScore: { ATL: 19.95, DEN: 23.65 },
            actual: { winner: "DEN", score: { DEN: 38, ATL: 6 }, total: 44 }
        },
        {
            game: "SEA @ SF",
            moneyline: { SEA: 235, SF: -290 },
            spread: { favorite: "SF", line: 6.5 },
            ou: { line: 48.0, prediction: "Under" },
            pointDiff: 7.28,
            winner: "SF",
            projectedScore: { SEA: 21.13, SF: 28.41 },
            actual: { winner: "SEA", score: { SEA: 20, SF: 17 }, total: 37 }
        },
        {
            game: "KC @ BUF",
            moneyline: { KC: 110, BUF: -130 },
            spread: { favorite: "BUF", line: 2.0 },
            ou: { line: 45.5, prediction: "Over" },
            pointDiff: 2.65,
            winner: "BUF",
            projectedScore: { KC: 22.09, BUF: 24.74 },
            actual: { winner: "BUF", score: { BUF: 30, KC: 21 }, total: 51 }
        },
        {
            game: "CIN @ LAC",
            moneyline: { CIN: 105, LAC: -125 },
            spread: { favorite: "LAC", line: 1.5 },
            ou: { line: 48.0, prediction: "Under" },
            pointDiff: 2.96,
            winner: "LAC",
            projectedScore: { CIN: 22.12, LAC: 25.08 },
            actual: { winner: "LAC", score: { LAC: 34, CIN: 27 }, total: 61 }
        },
        {
            game: "HOU @ DAL",
            moneyline: { HOU: -325, DAL: 260 },
            spread: { favorite: "HOU", line: 7.5 },
            ou: { line: 42.0, prediction: "Over" },
            pointDiff: 0.74,
            winner: "HOU",
            projectedScore: { HOU: 23.64, DAL: 22.90 },
            actual: { winner: "HOU", score: { HOU: 34, DAL: 10 }, total: 44 }
        }
    ];

    // useEffect(() => {
    //   async function checkAuth() {
    //     const session = await getUserDetails();
    //     setIsAuthenticated(!!session);
    //     setIsLoading(false);
    //   }
    //   checkAuth();
    // }, []);

    // if (isLoading) {
    //   return <div className="flex min-h-screen w-full items-center justify-center bg-transparent">
    //     <p className="text-neutral-800 dark:text-neutral-200">Loading...</p>
    //   </div>;
    // }

    // if (!isAuthenticated) {
    //   return (
    //     <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-transparent">
    //       <Card className="w-full max-w-md bg-transparent border-none">
    //         <CardHeader>
    //           <CardTitle>Authentication Required</CardTitle>
    //           <CardDescription>
    //             Only authenticated users can see historical picks.
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <Button 
    //             onClick={() => router.push('/auth/sign-in')} 
    //             className="w-full"
    //           >
    //             Login
    //           </Button>
    //         </CardContent>
    //       </Card>
    //     </div>
    //   );
    // }

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-transparent">
          <Header>
            <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              Week 11 Results
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions vs Actual Results</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 11 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
                      <TableHead>Actual Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictions.map((row, index) => {
                      const losingTeam = Object.keys(row.actual.score).find(team => team !== row.actual.winner);
                      const losingScore = losingTeam ? row.actual.score[losingTeam] : 'N/A';
                      
                      return (
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
                            <Badge 
                              variant={row.ou.prediction === "Over" ? "outline" : "secondary"}
                              style={{ color: ((row.ou.prediction === "Over" && row.actual.total > row.ou.line) || (row.ou.prediction === "Under" && row.actual.total < row.ou.line)) ? '#4BFFBA' : '#FF6B6B' }}
                            >
                              {row.ou.prediction}
                            </Badge>
                          </TableCell>
                          <TableCell style={{ color: row.winner === row.actual.winner ? '#4BFFBA' : '#FF6B6B' }}>
                            {row.winner}
                          </TableCell>
                          <TableCell>
                            {row.actual.winner} {row.actual.score[row.actual.winner]} - {losingScore}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
    )
}