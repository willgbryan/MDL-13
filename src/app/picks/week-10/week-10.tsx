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
            game: "CIN @ BAL", 
            moneyline: { CIN: 210, BAL: -258 }, 
            spread: { favorite: "BAL", line: 6.0 }, 
            ou: { line: 48.53, prediction: "Under" }, 
            pointDiff: 8.07,
            winner: "BAL", 
            projectedScore: { CIN: 20.40, BAL: 28.47 },
            actual: { 
                winner: "BAL", 
                score: { 
                    BAL: 35, 
                    CIN: 34 
                }, 
                total: 69 
            }
        },
        { 
            game: "NYG @ CAR", 
            moneyline: { NYG: -290, CAR: 235 }, 
            spread: { favorite: "NYG", line: 6.5 }, 
            ou: { line: 40.5, prediction: "Over" }, 
            pointDiff: 2.85,
            winner: "NYG", 
            projectedScore: { NYG: 23.81, CAR: 20.96 },
            actual: { 
                winner: "CAR", 
                score: { 
                    CAR: 20, 
                    NYG: 17 
                }, 
                total: 37 
            }
        },
        { 
            game: "NE @ CHI", 
            moneyline: { NE: 235, CHI: -290 }, 
            spread: { favorite: "CHI", line: 6.8 }, 
            ou: { line: 38.5, prediction: "Over" }, 
            pointDiff: 8.48,
            winner: "CHI", 
            projectedScore: { NE: 18.36, CHI: 26.84 },
            actual: { 
                winner: "NE", 
                score: { 
                    NE: 19, 
                    CHI: 3 
                }, 
                total: 22 
            }
        },
        { 
            game: "BUF @ IND", 
            moneyline: { BUF: -198, IND: 164 }, 
            spread: { favorite: "BUF", line: 4.1 }, 
            ou: { line: 48, prediction: "Over" }, 
            pointDiff: 1.25,
            winner: "BUF", 
            projectedScore: { BUF: 23.88, IND: 22.63 },
            actual: { 
                winner: "BUF", 
                score: { 
                    BUF: 30, 
                    IND: 20 
                }, 
                total: 50 
            }
        },
        {
            game: "MIN @ JAX",
            moneyline: { MIN: -198, JAX: 164 },
            spread: { favorite: "MIN", line: 4.3 },
            ou: { line: 45, prediction: "Under" },
            pointDiff: 3.09,
            winner: "MIN",
            projectedScore: { MIN: 23.96, JAX: 20.87 },
            actual: {
                winner: "MIN",
                score: {
                    MIN: 12,
                    JAX: 7
                },
                total: 19
            }
        },
        {
            game: "DEN @ KC",
            moneyline: { DEN: 295, KC: -375 },
            spread: { favorite: "KC", line: 7.5 },
            ou: { line: 42, prediction: "Over" },
            pointDiff: 4.09,
            winner: "KC",
            projectedScore: { DEN: 19.97, KC: 24.06 },
            actual: {
                winner: "KC",
                score: {
                    KC: 16,
                    DEN: 14
                },
                total: 30
            }
        },
        {
            game: "ATL @ NO",
            moneyline: { ATL: -198, NO: 164 },
            spread: { favorite: "ATL", line: 3.5 },
            ou: { line: 46, prediction: "Under" },
            pointDiff: 1.54,
            winner: "ATL",
            projectedScore: { ATL: 23.14, NO: 21.60 },
            actual: {
                winner: "NO",
                score: {
                    NO: 20,
                    ATL: 17
                },
                total: 37
            }
        },
        {
            game: "SF @ TB",
            moneyline: { SF: -278, TB: 225 },
            spread: { favorite: "SF", line: 6.4 },
            ou: { line: 50.5, prediction: "Under" },
            pointDiff: 4.51,
            winner: "SF",
            projectedScore: { SF: 24.32, TB: 19.81 },
            actual: {
                winner: "SF",
                score: {
                    SF: 23,
                    TB: 20
                },
                total: 43
            }
        },
        {
            game: "PIT @ WAS",
            moneyline: { PIT: 124, WAS: -148 },
            spread: { favorite: "WAS", line: 3.0 },
            ou: { line: 45.5, prediction: "Under" },
            pointDiff: 0.45,
            winner: "PIT",
            projectedScore: { PIT: 21.37, WAS: 20.92 },
            actual: {
                winner: "PIT",
                score: {
                    PIT: 28,
                    WSH: 27
                },
                total: 55
            }
        },
        {
            game: "TEN @ LAC",
            moneyline: { TEN: 280, LAC: -355 },
            spread: { favorite: "LAC", line: 7.5 },
            ou: { line: 39, prediction: "Over" },
            pointDiff: 7.24,
            winner: "LAC",
            projectedScore: { TEN: 18.88, LAC: 26.12 },
            actual: {
                winner: "LAC",
                score: {
                    LAC: 27,
                    TEN: 17
                },
                total: 44
            }
        },
        {
            game: "NYJ @ ARI",
            moneyline: { NYJ: -118, ARI: -102 },
            spread: { favorite: "NYJ", line: 1.0 },
            ou: { line: 46, prediction: "Under" },
            pointDiff: 0.22,
            winner: "NYJ",
            projectedScore: { NYJ: 22.90, ARI: 22.68 },
            actual: {
                winner: "ARI",
                score: {
                    ARI: 31,
                    NYJ: 6
                },
                total: 37
            }
        },
        {
            game: "PHI @ DAL",
            moneyline: { PHI: -360, DAL: 285 },
            spread: { favorite: "PHI", line: 7.2 },
            ou: { line: 43, prediction: "Over" },
            pointDiff: 2.17,
            winner: "PHI",
            projectedScore: { PHI: 24.23, DAL: 22.06 },
            actual: {
                winner: "PHI",
                score: {
                    PHI: 34,
                    DAL: 6
                },
                total: 40
            }
        },
        {
            game: "DET @ HOU",
            moneyline: { DET: -192, HOU: 160 },
            spread: { favorite: "DET", line: 3.5 },
            ou: { line: 49, prediction: "Under" },
            pointDiff: 0.76,
            winner: "DET",
            projectedScore: { DET: 24.10, HOU: 23.34 },
            actual: {
                winner: "DET",
                score: {
                    DET: 26,
                    HOU: 23
                },
                total: 49
            }
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
              Week 10 Results
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions vs Actual Results</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 10 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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