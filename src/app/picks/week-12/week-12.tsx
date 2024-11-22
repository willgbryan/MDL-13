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
      { game: "PIT @ CLE", moneyline: { PIT: -192, CLE: 160 }, spread: { favorite: "PIT", line: 3.5 }, ou: { line: 37.0, prediction: "Under" }, pointDiff: 0.59, winner: "CLE", projectedScore: { PIT: 17.81, CLE: 18.40 } },
      { game: "KC @ CAR", moneyline: { KC: -675, CAR: 490 }, spread: { favorite: "KC", line: 11.0 }, ou: { line: 43.0, prediction: "Over" }, pointDiff: 6.21, winner: "KC", projectedScore: { KC: 25.74, CAR: 19.53 } },
      { game: "MIN @ CHI", moneyline: { MIN: -175, CHI: 145 }, spread: { favorite: "MIN", line: 3.5 }, ou: { line: 39.0, prediction: "Under" }, pointDiff: 2.07, winner: "MIN", projectedScore: { MIN: 20.67, CHI: 18.61 } },
      { game: "TEN @ HOU", moneyline: { TEN: 295, HOU: -375 }, spread: { favorite: "HOU", line: 8.0 }, ou: { line: 40.5, prediction: "Over" }, pointDiff: 7.33, winner: "HOU", projectedScore: { TEN: 19.33, HOU: 26.67 } },
      { game: "DET @ IND", moneyline: { DET: -410, IND: 320 }, spread: { favorite: "DET", line: 7.5 }, ou: { line: 50.5, prediction: "Under" }, pointDiff: 3.45, winner: "DET", projectedScore: { DET: 25.32, IND: 21.86 } },
      { game: "NE @ MIA", moneyline: { NE: 310, MIA: -395 }, spread: { favorite: "MIA", line: 7.5 }, ou: { line: 46.0, prediction: "Under" }, pointDiff: 4.01, winner: "MIA", projectedScore: { NE: 20.48, MIA: 24.48 } },
      { game: "TB @ NYG", moneyline: { TB: -265, NYG: 215 }, spread: { favorite: "TB", line: 6.0 }, ou: { line: 41.0, prediction: "Under" }, pointDiff: 5.06, winner: "TB", projectedScore: { TB: 23.59, NYG: 18.54 } },
      { game: "DAL @ WAS", moneyline: { DAL: 440, WAS: -600 }, spread: { favorite: "WAS", line: 10.5 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 2.85, winner: "WAS", projectedScore: { DAL: 20.62, WAS: 23.46 } },
      { game: "DEN @ LV", moneyline: { DEN: -270, LV: 220 }, spread: { favorite: "DEN", line: 6.0 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 3.05, winner: "DEN", projectedScore: { DEN: 24.04, LV: 20.99 } },
      { game: "SF @ GB", moneyline: { SF: 105, GB: -125 }, spread: { favorite: "GB", line: 1.5 }, ou: { line: 47.5, prediction: "Under" }, pointDiff: 0.70, winner: "GB", projectedScore: { SF: 21.83, GB: 22.53 } },
      { game: "ARI @ SEA", moneyline: { ARI: -108, SEA: -112 }, spread: { favorite: "SEA", line: 1.0 }, ou: { line: 47.5, prediction: "Under" }, pointDiff: 0.54, winner: "ARI", projectedScore: { ARI: 21.79, SEA: 21.25 } },
      { game: "PHI @ LA", moneyline: { PHI: -155, LA: 130 }, spread: { favorite: "PHI", line: 2.5 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 1.24, winner: "PHI", projectedScore: { PHI: 22.14, LA: 20.90 } },
      { game: "BAL @ LAC", moneyline: { BAL: -135, LAC: 114 }, spread: { favorite: "BAL", line: 2.5 }, ou: { line: 51.0, prediction: "Under" }, pointDiff: 1.84, winner: "BAL", projectedScore: { BAL: 22.31, LAC: 20.47 } }
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
              Week 12 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 12 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
