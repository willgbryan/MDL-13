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
            game: "MIN @ LA", 
            moneyline: { MIN: -148, LA: 124 }, 
            spread: { favorite: "MIN", line: -2.5 }, 
            ou: { line: 48.0, prediction: "Under" }, 
            pointDiff: 1.72, 
            winner: "MIN", 
            projectedScore: { MIN: 22.40, LA: 20.68 },
            actual: { winner: "LAR", score: { LAR: 30, MIN: 20 }, total: 50 }
        },
        { 
            game: "PHI @ CIN", 
            moneyline: { PHI: 120, CIN: -142 }, 
            spread: { favorite: "CIN", line: 2.5 }, 
            ou: { line: 47.5, prediction: "Under" }, 
            pointDiff: 7.51, 
            winner: "CIN", 
            projectedScore: { PHI: 20.68, CIN: 28.19 },
            actual: { winner: "PHI", score: { PHI: 37, CIN: 17 }, total: 54 }
        },
        { 
            game: "BAL @ CLE", 
            moneyline: { BAL: -380, CLE: 300 }, 
            spread: { favorite: "BAL", line: -8.0 }, 
            ou: { line: 45.5, prediction: "Under" }, 
            pointDiff: 4.08, 
            winner: "BAL", 
            projectedScore: { BAL: 24.86, CLE: 20.78 },
            actual: { winner: "CLE", score: { CLE: 29, BAL: 24 }, total: 53 }
        },
        { 
            game: "TEN @ DET", 
            moneyline: { TEN: 470, DET: -650 }, 
            spread: { favorite: "DET", line: 11.5 }, 
            ou: { line: 45.0, prediction: "Over" }, 
            pointDiff: 7.51, 
            winner: "DET", 
            projectedScore: { TEN: 20.80, DET: 28.31 },
            actual: { winner: "DET", score: { DET: 52, TEN: 14 }, total: 66 }
        },
        { 
            game: "IND @ HOU", 
            moneyline: { IND: 180, HOU: -218 }, 
            spread: { favorite: "HOU", line: 5.0 }, 
            ou: { line: 45.0, prediction: "Over" }, 
            pointDiff: 4.72, 
            winner: "HOU", 
            projectedScore: { IND: 20.94, HOU: 25.66 },
            actual: { winner: "HOU", score: { HOU: 23, IND: 20 }, total: 43 }
        },
        { 
            game: "GB @ JAX", 
            moneyline: { GB: -198, JAX: 164 }, 
            spread: { favorite: "GB", line: -4.0 }, 
            ou: { line: 49.0, prediction: "Under" }, 
            pointDiff: 3.25, 
            winner: "GB", 
            projectedScore: { GB: 24.00, JAX: 20.75 },
            actual: { winner: "GB", score: { GB: 30, JAX: 27 }, total: 57 }
        },
        { 
            game: "ARI @ MIA", 
            moneyline: { ARI: 164, MIA: -198 }, 
            spread: { favorite: "MIA", line: 4.0 }, 
            ou: { line: 46.0, prediction: "Over" }, 
            pointDiff: 4.21, 
            winner: "MIA", 
            projectedScore: { ARI: 20.74, MIA: 24.95 },
            actual: { winner: "ARI", score: { ARI: 28, MIA: 27 }, total: 55 }
        },
        { 
            game: "NYJ @ NE", 
            moneyline: { NYJ: -325, NE: 260 }, 
            spread: { favorite: "NYJ", line: -7.0 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 2.61, 
            winner: "NYJ", 
            projectedScore: { NYJ: 21.58, NE: 18.97 },
            actual: { winner: "NE", score: { NE: 25, NYJ: 22 }, total: 47 }
        },
        { 
            game: "ATL @ TB", 
            moneyline: { ATL: -142, TB: 120 }, 
            spread: { favorite: "ATL", line: -2.5 }, 
            ou: { line: 46.0, prediction: "Under" }, 
            pointDiff: 1.74, 
            winner: "ATL", 
            projectedScore: { ATL: 21.38, TB: 19.63 },
            actual: { winner: "ATL", score: { ATL: 31, TB: 26 }, total: 57 }
        },
        { 
            game: "NO @ LAC", 
            moneyline: { NO: 250, LAC: -310 }, 
            spread: { favorite: "LAC", line: 7.0 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 5.93, 
            winner: "LAC", 
            projectedScore: { NO: 21.23, LAC: 27.16 },
            actual: { winner: "LAC", score: { LAC: 26, NO: 8 }, total: 34 }
        },
        { 
            game: "BUF @ SEA", 
            moneyline: { BUF: -162, SEA: 136 }, 
            spread: { favorite: "BUF", line: -3.0 }, 
            ou: { line: 45.0, prediction: "Under" }, 
            pointDiff: 0.67, 
            winner: "BUF", 
            projectedScore: { BUF: 21.06, SEA: 20.39 },
            actual: { winner: "BUF", score: { BUF: 31, SEA: 10 }, total: 41 }
        },
        { 
            game: "CAR @ DEN", 
            moneyline: { CAR: 425, DEN: -575 }, 
            spread: { favorite: "DEN", line: 11.0 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 7.84, 
            winner: "DEN", 
            projectedScore: { CAR: 19.99, DEN: 27.82 },
            actual: { winner: "DEN", score: { DEN: 28, CAR: 14 }, total: 42 }
        },
        { 
            game: "KC @ LV", 
            moneyline: { KC: -425, LV: 330 }, 
            spread: { favorite: "KC", line: -9.5 }, 
            ou: { line: 41.0, prediction: "Over" }, 
            pointDiff: 5.58, 
            winner: "KC", 
            projectedScore: { KC: 25.03, LV: 19.45 },
            actual: { winner: "KC", score: { KC: 27, LV: 20 }, total: 47 }
        },
        { 
            game: "CHI @ WAS", 
            moneyline: { CHI: -142, WAS: 120 }, 
            spread: { favorite: "CHI", line: -2.5 }, 
            ou: { line: 43.5, prediction: "Under" }, 
            pointDiff: 2.13, 
            winner: "CHI", 
            projectedScore: { CHI: 20.09, WAS: 17.96 },
            actual: { winner: "WAS", score: { WAS: 18, CHI: 15 }, total: 33 }
        },
        { 
            game: "DAL @ SF", 
            moneyline: { DAL: 180, SF: -218 }, 
            spread: { favorite: "SF", line: 4.5 }, 
            ou: { line: 47.0, prediction: "Over" }, 
            pointDiff: 6.67, 
            winner: "SF", 
            projectedScore: { DAL: 21.02, SF: 27.70 },
            actual: { winner: "SF", score: { SF: 30, DAL: 24 }, total: 54 }
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
              Week 8 Results
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions vs Actual Results</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 8 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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