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
        { game: "GB @ DET", moneyline: { GB: 140, DET: -166 }, spread: { favorite: "DET", line: 3.0 }, ou: { line: 52.0, prediction: "Under" }, pointDiff: 3.88, winner: "DET", projectedScore: { GB: 21.45, DET: 25.33 }, actual: { winner: "DET", score: { GB: 31, DET: 34 }, total: 65 } },
        { game: "NYJ @ MIA", moneyline: { NYJ: 205, MIA: -250 }, spread: { favorite: "MIA", line: 5.5 }, ou: { line: 45.0, prediction: "Under" }, pointDiff: 3.35, winner: "MIA", projectedScore: { NYJ: 20.65, MIA: 24.00 }, actual: { winner: "MIA", score: { NYJ: 26, MIA: 32 }, total: 58 } },
        { game: "ATL @ MIN", moneyline: { ATL: 200, MIN: -245 }, spread: { favorite: "MIN", line: 5.5 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 1.37, winner: "MIN", projectedScore: { ATL: 22.64, MIN: 24.01 }, actual: { winner: "MIN", score: { ATL: 21, MIN: 42 }, total: 63 } },
        { game: "NO @ NYG", moneyline: { NO: -245, NYG: 200 }, spread: { favorite: "NO", line: 4.5 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 3.92, winner: "NO", projectedScore: { NO: 22.75, NYG: 18.83 }, actual: { winner: "NO", score: { NO: 14, NYG: 11 }, total: 25 } },
        { game: "CAR @ PHI", moneyline: { CAR: 470, PHI: -650 }, spread: { favorite: "PHI", line: 12.5 }, ou: { line: 46.0, prediction: "Over" }, pointDiff: 4.78, winner: "PHI", projectedScore: { CAR: 21.20, PHI: 25.98 }, actual: { winner: "PHI", score: { CAR: 16, PHI: 22 }, total: 38 } },
        { game: "CLE @ PIT", moneyline: { CLE: 220, PIT: -270 }, spread: { favorite: "PIT", line: 6.5 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 2.68, winner: "PIT", projectedScore: { CLE: 20.59, PIT: 23.27 }, actual: { winner: "PIT", score: { CLE: 14, PIT: 27 }, total: 41 } },
        { game: "LV @ TB", moneyline: { LV: 220, TB: -270 }, spread: { favorite: "TB", line: 6.5 }, ou: { line: 46.5, prediction: "Over" }, pointDiff: 2.54, winner: "TB", projectedScore: { LV: 22.72, TB: 25.26 }, actual: { winner: "TB", score: { LV: 13, TB: 28 }, total: 41 } },
        { game: "JAX @ TEN", moneyline: { JAX: 142, TEN: -170 }, spread: { favorite: "TEN", line: 3.0 }, ou: { line: 39.5, prediction: "Over" }, pointDiff: 2.89, winner: "TEN", projectedScore: { JAX: 18.93, TEN: 21.82 }, actual: { winner: "JAX", score: { JAX: 10, TEN: 6 }, total: 16 } },
        { game: "SEA @ ARI", moneyline: { SEA: 124, ARI: -148 }, spread: { favorite: "ARI", line: 3.0 }, ou: { line: 44.5, prediction: "Under" }, pointDiff: 0.88, winner: "ARI", projectedScore: { SEA: 21.65, ARI: 22.53 }, actual: { winner: "SEA", score: { SEA: 30, ARI: 18 }, total: 48 } },
        { game: "BUF @ LA", moneyline: { BUF: -170, LA: 142 }, spread: { favorite: "BUF", line: 3.5 }, ou: { line: 49.5, prediction: "Under" }, pointDiff: 3.23, winner: "BUF", projectedScore: { BUF: 23.67, LA: 20.44 }, actual: { winner: "LA", score: { BUF: 42, LA: 44 }, total: 86 } },
        { game: "CHI @ SF", moneyline: { CHI: 154, SF: -185 }, spread: { favorite: "SF", line: 3.5 }, ou: { line: 44.0, prediction: "Under" }, pointDiff: 4.39, winner: "SF", projectedScore: { CHI: 19.79, SF: 24.18 }, actual: { winner: "SF", score: { CHI: 13, SF: 38 }, total: 51 } },
        { game: "LAC @ KC", moneyline: { LAC: 180, KC: -218 }, spread: { favorite: "KC", line: 4.0 }, ou: { line: 43.0, prediction: "Under" }, pointDiff: 2.72, winner: "KC", projectedScore: { LAC: 19.94, KC: 22.66 }, actual: { winner: "KC", score: { LAC: 17, KC: 19 }, total: 36 } }
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
              Week 14 Results
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions vs Actual Results</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 14 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
