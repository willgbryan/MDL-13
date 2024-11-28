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
    const [hasPaid, setHasPaid] = useState(false);
    const router = useRouter();

    const predictions = [
      { game: "CHI @ DET", moneyline: { CHI: 390, DET: -520 }, spread: { favorite: "DET", line: 9.5 }, ou: { line: 47.5, prediction: getOUPrediction(51.64, 47.5) }, pointDiff: 6.72, winner: "DET", projectedScore: { CHI: 20.89, DET: 27.61 } },
      { game: "NYG @ DAL", moneyline: { NYG: 160, DAL: -192 }, spread: { favorite: "DAL", line: 3.5 }, ou: { line: 37.5, prediction: getOUPrediction(46.72, 37.5) }, pointDiff: 9.43, winner: "DAL", projectedScore: { NYG: 18.97, DAL: 28.40 } },
      { game: "MIA @ GB", moneyline: { MIA: 150, GB: -180 }, spread: { favorite: "GB", line: 3.5 }, ou: { line: 47.5, prediction: getOUPrediction(49.42, 47.5) }, pointDiff: 4.43, winner: "GB", projectedScore: { MIA: 21.64, GB: 26.07 } },
      { game: "LV @ KC", moneyline: { LV: 525, KC: -750 }, spread: { favorite: "KC", line: 13.0 }, ou: { line: 42.5, prediction: getOUPrediction(45.11, 42.5) }, pointDiff: 4.14, winner: "KC", projectedScore: { LV: 19.99, KC: 24.13 } },
      { game: "LAC @ ATL", moneyline: { LAC: -120, ATL: 100 }, spread: { favorite: "LAC", line: 1.0 }, ou: { line: 47.5, prediction: getOUPrediction(47.71, 47.5) }, pointDiff: 1.03, winner: "LAC", projectedScore: { LAC: 22.35, ATL: 21.32 } },
      { game: "PIT @ CIN", moneyline: { PIT: 136, CIN: -162 }, spread: { favorite: "CIN", line: 3.0 }, ou: { line: 47.5, prediction: getOUPrediction(44.34, 47.5) }, pointDiff: 3.37, winner: "CIN", projectedScore: { PIT: 21.07, CIN: 24.44 } },
      { game: "HOU @ JAX", moneyline: { HOU: -185, JAX: 154 }, spread: { favorite: "HOU", line: 3.5 }, ou: { line: 44.0, prediction: getOUPrediction(40.95, 44.0) }, pointDiff: 3.64, winner: "HOU", projectedScore: { HOU: 23.53, JAX: 19.89 } },
      { game: "ARI @ MIN", moneyline: { ARI: 140, MIN: -166 }, spread: { favorite: "MIN", line: 3.5 }, ou: { line: 45.0, prediction: getOUPrediction(44.79, 45.0) }, pointDiff: 1.37, winner: "MIN", projectedScore: { ARI: 21.33, MIN: 22.70 } },
      { game: "IND @ NE", moneyline: { IND: -142, NE: 120 }, spread: { favorite: "IND", line: 2.5 }, ou: { line: 42.5, prediction: getOUPrediction(41.48, 42.5) }, pointDiff: 0.13, winner: "NE", projectedScore: { IND: 20.57, NE: 20.70 } },
      { game: "SEA @ NYJ", moneyline: { SEA: -130, NYJ: 110 }, spread: { favorite: "SEA", line: 2.5 }, ou: { line: 42.0, prediction: getOUPrediction(40.61, 42.0) }, pointDiff: 1.95, winner: "SEA", projectedScore: { SEA: 20.89, NYJ: 18.94 } },
      { game: "TEN @ WAS", moneyline: { TEN: 200, WAS: -245 }, spread: { favorite: "WAS", line: 5.5 }, ou: { line: 44.5, prediction: getOUPrediction(45.67, 44.5) }, pointDiff: 1.32, winner: "WAS", projectedScore: { TEN: 21.19, WAS: 22.51 } },
      { game: "TB @ CAR", moneyline: { TB: -245, CAR: 200 }, spread: { favorite: "TB", line: 5.5 }, ou: { line: 46.5, prediction: getOUPrediction(44.45, 46.5) }, pointDiff: 5.13, winner: "TB", projectedScore: { TB: 24.27, CAR: 19.14 } },
      { game: "LA @ NO", moneyline: { LA: -148, NO: 124 }, spread: { favorite: "LA", line: 2.5 }, ou: { line: 49.5, prediction: getOUPrediction(44.87, 49.5) }, pointDiff: 1.56, winner: "LA", projectedScore: { LA: 22.35, NO: 20.79 } },
      { game: "PHI @ BAL", moneyline: { PHI: 130, BAL: -155 }, spread: { favorite: "BAL", line: 3.0 }, ou: { line: 50.5, prediction: getOUPrediction(44.63, 50.5) }, pointDiff: 2.68, winner: "BAL", projectedScore: { PHI: 21.37, BAL: 24.06 } },
      { game: "SF @ BUF", moneyline: { SF: 250, BUF: -310 }, spread: { favorite: "BUF", line: 7.0 }, ou: { line: 44.5, prediction: getOUPrediction(46.04, 44.5) }, pointDiff: 3.87, winner: "BUF", projectedScore: { SF: 20.82, BUF: 24.69 } },
      { game: "CLE @ DEN", moneyline: { CLE: 190, DEN: -230 }, spread: { favorite: "DEN", line: 5.5 }, ou: { line: 41.5, prediction: getOUPrediction(44.38, 41.5) }, pointDiff: 4.70, winner: "DEN", projectedScore: { CLE: 20.73, DEN: 25.43 } }
    ];
  
    // useEffect(() => {
    //   async function checkAuthAndPayment() {
    //     const session = await getUserDetails();
    //     setIsAuthenticated(!!session);
    //     setIsAuthenticated(true);

  
    //     if (session) {
    //       const stripeCustomerId = await getStripeCustomerId(session.id);
    //       if (stripeCustomerId) {
    //         const weeklyPaid = await checkWeeklyPayment(stripeCustomerId, 6);
    //         const seasonPaid = await checkSeasonPayment(stripeCustomerId, '2023');
    //         setHasPaid(weeklyPaid || seasonPaid);
    //       }
    //     }
  
    //     setIsLoading(false);
    //   }
    //   checkAuthAndPayment();
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
  
    // if (!hasPaid) {
    //   return (
    //     <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-transparent">
    //       <Card className="w-full max-w-md bg-transparent border-none">
    //         <CardHeader>
    //           <CardTitle>Payment Required</CardTitle>
    //           <CardDescription>
    //             You need to purchase either a weekly or season pass to view this week's picks.
    //           </CardDescription>
    //         </CardHeader>
    //         <CardContent>
    //           <Button 
    //             onClick={() => router.push('/pricing')} 
    //             className="w-full"
    //           >
    //             View Pricing
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
              Week 13 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 13 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
                      <TableHead>Projected Score</TableHead>
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
                          <Badge 
                            variant={row.ou.prediction === "Over" ? "outline" : "secondary"}
                          >
                            {row.ou.prediction}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.winner}</TableCell>
                        <TableCell>
                          {Object.entries(row.projectedScore).map(([team, score]) => (
                            <div key={team}>{team}: {score.toFixed(2)}</div>
                          ))}
                        </TableCell>
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
