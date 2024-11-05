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
        { game: "HOU @ NYJ", moneyline: { HOU: 105, NYJ: -125 }, spread: { favorite: "NYJ", line: 1.5 }, ou: { line: 42.0, prediction: "Over" }, pointDiff: 3.37, winner: "HOU", projectedScore: { HOU: 23.82, NYJ: 20.45 }, actual: { winner: "NYJ", score: { NYJ: 21, HOU: 13 }, total: 34 } },
        { game: "DAL @ ATL", moneyline: { DAL: 124, ATL: -148 }, spread: { favorite: "ATL", line: 3.0 }, ou: { line: 52.0, prediction: "Under" }, pointDiff: 5.26, winner: "ATL", projectedScore: { DAL: 20.67, ATL: 25.93 }, actual: { winner: "ATL", score: { ATL: 27, DAL: 21 }, total: 48 } },
        { game: "DEN @ BAL", moneyline: { DEN: 340, BAL: -440 }, spread: { favorite: "BAL", line: 9.0 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 5.82, winner: "BAL", projectedScore: { DEN: 20.30, BAL: 26.12 }, actual: { winner: "BAL", score: { BAL: 41, DEN: 10 }, total: 51 } },
        { game: "MIA @ BUF", moneyline: { MIA: 215, BUF: -265 }, spread: { favorite: "BUF", line: 6.0 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 9.05, winner: "BUF", projectedScore: { MIA: 20.94, BUF: 29.98 }, actual: { winner: "BUF", score: { BUF: 30, MIA: 27 }, total: 57 } },
        { game: "NO @ CAR", moneyline: { NO: -355, CAR: 280 }, spread: { favorite: "NO", line: 7.5 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 4.79, winner: "NO", projectedScore: { NO: 24.20, CAR: 19.42 }, actual: { winner: "CAR", score: { CAR: 23, NO: 22 }, total: 45 } },
        { game: "LV @ CIN", moneyline: { LV: 260, CIN: -325 }, spread: { favorite: "CIN", line: 7.0 }, ou: { line: 46.5, prediction: "Over" }, pointDiff: 7.18, winner: "CIN", projectedScore: { LV: 20.83, CIN: 28.01 }, actual: { winner: "CIN", score: { CIN: 41, LV: 24 }, total: 65 } },
        { game: "LAC @ CLE", moneyline: { LAC: -122, CLE: 102 }, spread: { favorite: "LAC", line: 1.5 }, ou: { line: 43.0, prediction: "Over" }, pointDiff: 0.09, winner: "LAC", projectedScore: { LAC: 21.13, CLE: 21.06 }, actual: { winner: "LAC", score: { LAC: 27, CLE: 10 }, total: 37 } },
        { game: "WAS @ NYG", moneyline: { WAS: -198, NYG: 164 }, spread: { favorite: "WAS", line: 3.5 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 4.17, winner: "WAS", projectedScore: { WAS: 23.52, NYG: 19.34 }, actual: { winner: "WAS", score: { WAS: 27, NYG: 22 }, total: 49 } },
        { game: "NE @ TEN", moneyline: { NE: 154, TEN: -185 }, spread: { favorite: "TEN", line: 3.5 }, ou: { line: 38.0, prediction: "Over" }, pointDiff: 5.36, winner: "TEN", projectedScore: { NE: 18.04, TEN: 23.40 }, actual: { winner: "TEN", score: { TEN: 20, NE: 17 }, total: 37 } },
        { game: "CHI @ ARI", moneyline: { CHI: -102, ARI: -118 }, spread: { favorite: "ARI", line: 1.0 }, ou: { line: 44.5, prediction: "Over" }, pointDiff: 1.89, winner: "ARI", projectedScore: { CHI: 22.05, ARI: 23.16 }, actual: { winner: "ARI", score: { ARI: 29, CHI: 9 }, total: 38 } },
        { game: "JAX @ PHI", moneyline: { JAX: 260, PHI: -325 }, spread: { favorite: "PHI", line: 7.5 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 6.17, winner: "PHI", projectedScore: { JAX: 21.13, PHI: 27.30 }, actual: { winner: "PHI", score: { PHI: 28, JAX: 23 }, total: 51 } },
        { game: "DET @ GB", moneyline: { DET: -175, GB: 145 }, spread: { favorite: "DET", line: 3.5 }, ou: { line: 48.5, prediction: "Under" }, pointDiff: 4.63, winner: "DET", projectedScore: { DET: 24.63, GB: 20.00 }, actual: { winner: "DET", score: { DET: 24, GB: 14 }, total: 38 } },
        { game: "LA @ SEA", moneyline: { LA: -120, SEA: 100 }, spread: { favorite: "LA", line: 1.5 }, ou: { line: 48.0, prediction: "Under" }, pointDiff: 0.24, winner: "SEA", projectedScore: { LA: 21.07, SEA: 21.31 }, actual: { winner: "LA", score: { LA: 26, SEA: 20 }, total: 46 } },
        { game: "IND @ MIN", moneyline: { IND: 185, MIN: -225 }, spread: { favorite: "MIN", line: 5.0 }, ou: { line: 46.5, prediction: "Over" }, pointDiff: 5.53, winner: "MIN", projectedScore: { IND: 22.61, MIN: 28.14 }, actual: { winner: "MIN", score: { MIN: 21, IND: 13 }, total: 34 } },
        { game: "TB @ KC", moneyline: { TB: 360, KC: -470 }, spread: { favorite: "KC", line: 8.5 }, ou: { line: 45.5, prediction: "Under" }, pointDiff: 2.87, winner: "KC", projectedScore: { TB: 20.81, KC: 23.68 }, actual: { winner: "KC", score: { KC: 30, TB: 24 }, total: 54 } }
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
              Week 9 Results
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions vs Actual Results</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 9 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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