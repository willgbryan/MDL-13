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
          game: "DEN @ LAC", 
          moneyline: { DEN: 120, LAC: -142 }, 
          spread: { favorite: "LAC", line: 2.5 }, 
          ou: { line: 41.0, prediction: "Over" }, 
          pointDiff: 3.25, 
          winner: "LAC", 
          projectedScore: { DEN: 20.62, LAC: 23.87 },
          actual: { winner: "LAC", score: { DEN: 27, LAC: 34 }, total: 61 }
        },
        {
          game: "HOU @ KC",
          moneyline: { HOU: 145, KC: -175 },
          spread: { favorite: "KC", line: 3.5 },
          ou: { line: 42.0, prediction: "Over" },
          pointDiff: 2.61,
          winner: "KC",
          projectedScore: { HOU: 20.16, KC: 22.77 },
          actual: { winner: "KC", score: { HOU: 19, KC: 27 }, total: 46 }
        },
        {
          game: "PIT @ BAL",
          moneyline: { PIT: 235, BAL: -290 },
          spread: { favorite: "BAL", line: 6.5 },
          ou: { line: 45.0, prediction: "Over" },
          pointDiff: 5.44,
          winner: "BAL",
          projectedScore: { PIT: 20.51, BAL: 25.95 },
          actual: { winner: "BAL", score: { PIT: 17, BAL: 34 }, total: 51 }
        },
        {
          game: "NYG @ ATL",
          moneyline: { NYG: 330, ATL: -425 },
          spread: { favorite: "ATL", line: 8.5 },
          ou: { line: 42.0, prediction: "Over" },
          pointDiff: 6.07,
          winner: "ATL",
          projectedScore: { NYG: 19.44, ATL: 25.51 },
          actual: { winner: "ATL", score: { NYG: 7, ATL: 34 }, total: 41 }
        },
        {
          game: "DET @ CHI",
          moneyline: { DET: -305, CHI: 245 },
          spread: { favorite: "DET", line: 6.5 },
          ou: { line: 48.0, prediction: "Under" },
          pointDiff: 3.14,
          winner: "DET",
          projectedScore: { DET: 24.08, CHI: 20.94 },
          actual: { winner: "DET", score: { DET: 34, CHI: 17 }, total: 51 }
        },
        {
          game: "CLE @ CIN",
          moneyline: { CLE: 275, CIN: -345 },
          spread: { favorite: "CIN", line: 7.5 },
          ou: { line: 47.0, prediction: "Over" },
          pointDiff: 6.36,
          winner: "CIN",
          projectedScore: { CLE: 21.05, CIN: 27.41 },
          actual: { winner: "CIN", score: { CLE: 6, CIN: 24 }, total: 30 }
        },
        {
          game: "TEN @ IND",
          moneyline: { TEN: 160, IND: -192 },
          spread: { favorite: "IND", line: 3.5 },
          ou: { line: 42.5, prediction: "Over" },
          pointDiff: 4.11,
          winner: "IND",
          projectedScore: { TEN: 20.53, IND: 24.64 },
          actual: { winner: "IND", score: { TEN: 30, IND: 38 }, total: 68 }
        },
        {
          game: "LA @ NYJ",
          moneyline: { LA: -175, NYJ: 145 },
          spread: { favorite: "LA", line: 3.0 },
          ou: { line: 46.5, prediction: "Under" },
          pointDiff: 0.12,
          winner: "NYJ",
          projectedScore: { LA: 21.31, NYJ: 21.43 },
          actual: { winner: "LA", score: { LA: 19, NYJ: 9 }, total: 28 }
        },
        {
          game: "PHI @ WAS",
          moneyline: { PHI: -180, WAS: 150 },
          spread: { favorite: "PHI", line: 3.5 },
          ou: { line: 45.5, prediction: "Under" },
          pointDiff: 4.21,
          winner: "PHI",
          projectedScore: { PHI: 24.50, WAS: 20.29 },
          actual: { winner: "WAS", score: { PHI: 33, WAS: 36 }, total: 69 }
        },
        {
          game: "ARI @ CAR",
          moneyline: { ARI: -218, CAR: 180 },
          spread: { favorite: "ARI", line: 5.0 },
          ou: { line: 47.0, prediction: "Under" },
          pointDiff: 3.91,
          winner: "ARI",
          projectedScore: { ARI: 23.91, CAR: 20.01 },
          actual: { winner: "CAR", score: { ARI: 30, CAR: 36 }, total: 66 }
        },
        {
          game: "MIN @ SEA",
          moneyline: { MIN: -166, SEA: 140 },
          spread: { favorite: "MIN", line: 3.0 },
          ou: { line: 42.5, prediction: "Under" },
          pointDiff: 1.77,
          winner: "MIN",
          projectedScore: { MIN: 21.66, SEA: 19.89 },
          actual: { winner: "MIN", score: { MIN: 27, SEA: 24 }, total: 51 }
        },
        {
          game: "NE @ BUF",
          moneyline: { NE: 650, BUF: -1000 },
          spread: { favorite: "BUF", line: 14.0 },
          ou: { line: 46.5, prediction: "Over" },
          pointDiff: 8.98,
          winner: "BUF",
          projectedScore: { NE: 19.68, BUF: 28.65 },
          actual: { winner: "BUF", score: { NE: 21, BUF: 24 }, total: 45 }
        },
        {
          game: "JAX @ LV",
          moneyline: { JAX: -102, LV: -118 },
          spread: { favorite: "LV", line: 1.5 },
          ou: { line: 40.5, prediction: "Over" },
          pointDiff: 2.63,
          winner: "LV",
          projectedScore: { JAX: 20.31, LV: 22.94 },
          actual: { winner: "LV", score: { JAX: 14, LV: 19 }, total: 33 }
        },
        {
          game: "SF @ MIA",
          moneyline: { SF: -110, MIA: -110 },
          spread: { favorite: "SF", line: 1.0 },
          ou: { line: 44.5, prediction: "Under" },
          pointDiff: 1.14,
          winner: "SF",
          projectedScore: { SF: 20.76, MIA: 19.63 },
          actual: { winner: "MIA", score: { SF: 17, MIA: 29 }, total: 46 }
        },
        {
          game: "TB @ DAL",
          moneyline: { TB: -198, DAL: 164 },
          spread: { favorite: "TB", line: 4.0 },
          ou: { line: 48.0, prediction: "Under" },
          pointDiff: 2.52,
          winner: "TB",
          projectedScore: { TB: 24.46, DAL: 21.93 },
          actual: { winner: "DAL", score: { TB: 24, DAL: 26 }, total: 50 }
        },
        {
          game: "NO @ GB",
          moneyline: { NO: 625, GB: -950 },
          spread: { favorite: "GB", line: 14.0 },
          ou: { line: 42.5, prediction: "Over" },
          pointDiff: 4.01,
          winner: "GB",
          projectedScore: { NO: 20.28, GB: 24.29 },
          actual: { winner: "GB", score: { NO: 0, GB: 34 }, total: 34 }
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
              Week 16 Results
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions vs Actual Results</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 16 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
                            //   style={{ color: ((row.ou.prediction === "Over" && row.actual.total > row.ou.line) || (row.ou.prediction === "Under" && row.actual.total < row.ou.line)) ? '#4BFFBA' : '#FF6B6B' }}
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
