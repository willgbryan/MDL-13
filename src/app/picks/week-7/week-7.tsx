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
        { game: "DEN @ NO", moneyline: { DEN: -148, NO: 124 }, spread: { favorite: "NO", line: -2.5 }, ou: { line: 37.0, prediction: "Over" }, pointDiff: 7.75, winner: "NO", projectedScore: { DEN: 19.70, NO: 27.45 }, actual: { winner: "DEN", score: { DEN: 33, NO: 10 }, total: 43 } },
        { game: "NE @ JAX", moneyline: { NE: 205, JAX: -250 }, spread: { favorite: "JAX", line: 6.0 }, ou: { line: 42.0, prediction: "Over" }, pointDiff: 5.27, winner: "JAX", projectedScore: { NE: 21.18, JAX: 26.45 }, actual: { winner: "JAX", score: { JAX: 32, NE: 16 }, total: 48 } },
        { game: "SEA @ ATL", moneyline: { SEA: 130, ATL: -155 }, spread: { favorite: "ATL", line: 3.0 }, ou: { line: 51.5, prediction: "Under" }, pointDiff: 10.97, winner: "ATL", projectedScore: { SEA: 21.12, ATL: 32.09 }, actual: { winner: "SEA", score: { SEA: 34, ATL: 14 }, total: 48 } },
        { game: "TEN @ BUF", moneyline: { TEN: 360, BUF: -470 }, spread: { favorite: "BUF", line: 9.5 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 8.85, winner: "BUF", projectedScore: { TEN: 19.96, BUF: 28.81 }, actual: { winner: "BUF", score: { BUF: 34, TEN: 10 }, total: 44 } },
        { game: "CIN @ CLE", moneyline: { CIN: -230, CLE: 190 }, spread: { favorite: "CIN", line: -5.5 }, ou: { line: 41.5, prediction: "Over" }, pointDiff: 0.27, winner: "CIN", projectedScore: { CIN: 24.33, CLE: 24.60 }, actual: { winner: "CIN", score: { CIN: 21, CLE: 14 }, total: 35 } },
        { game: "HOU @ GB", moneyline: { HOU: 124, GB: -148 }, spread: { favorite: "GB", line: 3.0 }, ou: { line: 48.5, prediction: "Under" }, pointDiff: 8.71, winner: "GB", projectedScore: { HOU: 20.66, GB: 29.37 }, actual: { winner: "GB", score: { GB: 24, HOU: 22 }, total: 46 } },
        { game: "MIA @ IND", moneyline: { MIA: 130, IND: -155 }, spread: { favorite: "IND", line: 3.0 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 8.21, winner: "IND", projectedScore: { MIA: 20.41, IND: 28.62 }, actual: { winner: "IND", score: { IND: 16, MIA: 10 }, total: 26 } },
        { game: "DET @ MIN", moneyline: { DET: 100, MIN: -120 }, spread: { favorite: "MIN", line: 1.5 }, ou: { line: 50.5, prediction: "Under" }, pointDiff: 4.27, winner: "MIN", projectedScore: { DET: 22.51, MIN: 26.78 }, actual: { winner: "DET", score: { DET: 31, MIN: 29 }, total: 60 } },
        { game: "PHI @ NYG", moneyline: { PHI: -170, NYG: 142 }, spread: { favorite: "PHI", line: -3.5 }, ou: { line: 42.5, prediction: "Under" }, pointDiff: 1.95, winner: "PHI", projectedScore: { PHI: 23.80, NYG: 21.86 }, actual: { winner: "PHI", score: { PHI: 28, NYG: 3 }, total: 31 } },
        { game: "LV @ LA", moneyline: { LV: 275, LA: -345 }, spread: { favorite: "LA", line: 7.0 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 3.48, winner: "LAR", projectedScore: { LV: 21.43, LA: 24.91 }, actual: { winner: "LAR", score: { LAR: 20, LV: 15 }, total: 35 } },
        { game: "CAR @ WAS", moneyline: { CAR: 360, WAS: -470 }, spread: { favorite: "WAS", line: 9.5 }, ou: { line: 51.5, prediction: "Under" }, pointDiff: 8.83, winner: "WAS", projectedScore: { CAR: 20.23, WAS: 29.06 }, actual: { winner: "WAS", score: { WSH: 40, CAR: 7 }, total: 47 } },
        { game: "KC @ SF", moneyline: { KC: 105, SF: -125 }, spread: { favorite: "SF", line: 2.0 }, ou: { line: 47.0, prediction: "Under" }, pointDiff: 2.99, winner: "SF", projectedScore: { KC: 25.19, SF: 28.17 }, actual: { winner: "KC", score: { KC: 28, SF: 18 }, total: 46 } },
        { game: "NYJ @ PIT", moneyline: { NYJ: -135, PIT: 114 }, spread: { favorite: "NYJ", line: -1.5 }, ou: { line: 39.0, prediction: "Over" }, pointDiff: 2.37, winner: "PIT", projectedScore: { NYJ: 19.30, PIT: 21.66 }, actual: { winner: "PIT", score: { PIT: 37, NYJ: 15 }, total: 52 } },
        { game: "BAL @ TB", moneyline: { BAL: -180, TB: 150 }, spread: { favorite: "BAL", line: -3.5 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 3.57, winner: "BAL", projectedScore: { BAL: 24.53, TB: 20.96 }, actual: { winner: "BAL", score: { BAL: 41, TB: 31 }, total: 72 } },
        { game: "LAC @ ARI", moneyline: { LAC: -125, ARI: 105 }, spread: { favorite: "LAC", line: -2.0 }, ou: { line: 44.0, prediction: "Under" }, pointDiff: 0.78, winner: "LAC", projectedScore: { LAC: 23.17, ARI: 22.40 }, actual: { winner: "ARI", score: { ARI: 17, LAC: 15 }, total: 32 } }
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
              Week 6 Results
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions vs Actual Results</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 6 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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