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
      { game: "WAS @ PHI", moneyline: { WAS: 150, PHI: -180 }, spread: { favorite: "PHI", line: 3.5 }, ou: { line: 48.5, prediction: "Under" }, pointDiff: 5.63, winner: "PHI", projectedScore: { WAS: 21.04, PHI: 26.68 } },
      { game: "GB @ CHI", moneyline: { GB: -230, CHI: 190 }, spread: { favorite: "GB", line: 5.5 }, ou: { line: 40.5, prediction: "Over" }, pointDiff: 1.35, winner: "GB", projectedScore: { GB: 23.96, CHI: 22.60 } },
      { game: "JAX @ DET", moneyline: { JAX: 525, DET: -750 }, spread: { favorite: "DET", line: 13.0 }, ou: { line: 47.0, prediction: "Over" }, pointDiff: 8.71, winner: "DET", projectedScore: { JAX: 20.06, DET: 28.77 } },
      { game: "LV @ MIA", moneyline: { LV: 260, MIA: -325 }, spread: { favorite: "MIA", line: 7.0 }, ou: { line: 44.0, prediction: "Under" }, pointDiff: 3.41, winner: "MIA", projectedScore: { LV: 20.08, MIA: 23.49 } },
      { game: "LA @ NE", moneyline: { LA: -205, NE: 170 }, spread: { favorite: "LA", line: 4.5 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 0.77, winner: "LA", projectedScore: { NE: 21.69, LA: 22.47 } },
      { game: "CLE @ NO", moneyline: { CLE: -108, NO: -112 }, spread: { favorite: "NO", line: 1.0 }, ou: { line: 44.5, prediction: "Over" }, pointDiff: 1.98, winner: "NO", projectedScore: { CLE: 20.94, NO: 22.92 } },
      { game: "IND @ NYJ", moneyline: { IND: 164, NYJ: -198 }, spread: { favorite: "NYJ", line: 4.0 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 3.04, winner: "NYJ", projectedScore: { IND: 20.46, NYJ: 23.50 } },
      { game: "BAL @ PIT", moneyline: { BAL: -175, PIT: 145 }, spread: { favorite: "BAL", line: 3.0 }, ou: { line: 48.0, prediction: "Under" }, pointDiff: 0.65, winner: "BAL", projectedScore: { BAL: 22.63, PIT: 21.98 } },
      { game: "MIN @ TEN", moneyline: { MIN: -258, TEN: 210 }, spread: { favorite: "MIN", line: 6.0 }, ou: { line: 39.5, prediction: "Over" }, pointDiff: 1.28, winner: "MIN", projectedScore: { TEN: 20.21, MIN: 21.49 } },
      { game: "ATL @ DEN", moneyline: { ATL: 120, DEN: -142 }, spread: { favorite: "DEN", line: 2.5 }, ou: { line: 44.0, prediction: "Over" }, pointDiff: 3.71, winner: "DEN", projectedScore: { ATL: 19.95, DEN: 23.65 } },
      { game: "SEA @ SF", moneyline: { SEA: 235, SF: -290 }, spread: { favorite: "SF", line: 6.5 }, ou: { line: 48.0, prediction: "Under" }, pointDiff: 7.28, winner: "SF", projectedScore: { SEA: 21.13, SF: 28.41 } },
      { game: "KC @ BUF", moneyline: { KC: 110, BUF: -130 }, spread: { favorite: "BUF", line: 2.0 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 2.65, winner: "BUF", projectedScore: { KC: 22.09, BUF: 24.74 } },
      { game: "CIN @ LAC", moneyline: { CIN: 105, LAC: -125 }, spread: { favorite: "LAC", line: 1.5 }, ou: { line: 48.0, prediction: "Under" }, pointDiff: 2.96, winner: "LAC", projectedScore: { CIN: 22.12, LAC: 25.08 } },
      { game: "HOU @ DAL", moneyline: { HOU: -325, DAL: 260 }, spread: { favorite: "HOU", line: 7.5 }, ou: { line: 42.0, prediction: "Over" }, pointDiff: 0.74, winner: "HOU", projectedScore: { HOU: 23.64, DAL: 22.90 } }
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
              Week 11 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
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
