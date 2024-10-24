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
        { game: "MIN @ LA", moneyline: { MIN: -148, LA: 124 }, spread: { favorite: "MIN", line: -2.5 }, ou: { line: 48.0, prediction: "Under" }, pointDiff: 1.72, winner: "MIN", projectedScore: { MIN: 22.40, LA: 20.68 } },
        { game: "PHI @ CIN", moneyline: { PHI: 110, CIN: -130 }, spread: { favorite: "CIN", line: 2.0 }, ou: { line: 48.0, prediction: "Under" }, pointDiff: 4.02, winner: "CIN", projectedScore: { PHI: 20.86, CIN: 24.88 } },
        { game: "BAL @ CLE", moneyline: { BAL: -425, CLE: 330 }, spread: { favorite: "BAL", line: -8.5 }, ou: { line: 44.5, prediction: "Over" }, pointDiff: 4.61, winner: "BAL", projectedScore: { BAL: 25.07, CLE: 20.46 } },
        { game: "TEN @ DET", moneyline: { TEN: 525, DET: -750 }, spread: { favorite: "DET", line: 11.5 }, ou: { line: 45.0, prediction: "Over" }, pointDiff: 8.12, winner: "DET", projectedScore: { TEN: 20.70, DET: 28.82 } },
        { game: "IND @ HOU", moneyline: { IND: 180, HOU: -218 }, spread: { favorite: "HOU", line: 5.0 }, ou: { line: 46.0, prediction: "Over" }, pointDiff: 4.83, winner: "HOU", projectedScore: { IND: 21.26, HOU: 26.10 } },
        { game: "GB @ JAX", moneyline: { GB: -192, JAX: 160 }, spread: { favorite: "GB", line: -3.5 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 2.68, winner: "GB", projectedScore: { GB: 23.96, JAX: 21.28 } },
        { game: "ARI @ MIA", moneyline: { ARI: 150, MIA: -180 }, spread: { favorite: "MIA", line: 3.5 }, ou: { line: 45.5, prediction: "Over" }, pointDiff: 3.84, winner: "MIA", projectedScore: { ARI: 20.53, MIA: 24.38 } },
        { game: "NYJ @ NE", moneyline: { NYJ: -310, NE: 250 }, spread: { favorite: "NYJ", line: -7.0 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 2.32, winner: "NYJ", projectedScore: { NYJ: 21.54, NE: 19.22 } },
        { game: "ATL @ TB", moneyline: { ATL: -142, TB: 120 }, spread: { favorite: "ATL", line: -2.5 }, ou: { line: 46.0, prediction: "Under" }, pointDiff: 1.63, winner: "ATL", projectedScore: { ATL: 21.50, TB: 19.87 } },
        { game: "NO @ LAC", moneyline: { NO: 250, LAC: -310 }, spread: { favorite: "LAC", line: 7.0 }, ou: { line: 40.5, prediction: "Over" }, pointDiff: 6.08, winner: "LAC", projectedScore: { NO: 20.99, LAC: 27.07 } },
        { game: "BUF @ SEA", moneyline: { BUF: -162, SEA: 136 }, spread: { favorite: "BUF", line: -3.0 }, ou: { line: 47.0, prediction: "Under" }, pointDiff: 0.72, winner: "BUF", projectedScore: { BUF: 21.50, SEA: 20.78 } },
        { game: "CAR @ DEN", moneyline: { CAR: 350, DEN: -455 }, spread: { favorite: "DEN", line: 9.5 }, ou: { line: 41.5, prediction: "Over" }, pointDiff: 7.60, winner: "DEN", projectedScore: { CAR: 20.11, DEN: 27.72 } },
        { game: "KC @ LV", moneyline: { KC: -425, LV: 330 }, spread: { favorite: "KC", line: -9.5 }, ou: { line: 41.5, prediction: "Over" }, pointDiff: 5.25, winner: "KC", projectedScore: { KC: 25.15, LV: 19.90 } },
        { game: "CHI @ WAS", moneyline: { CHI: -148, WAS: 124 }, spread: { favorite: "CHI", line: -3.0 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 1.77, winner: "CHI", projectedScore: { CHI: 20.50, WAS: 18.73 } },
        { game: "DAL @ SF", moneyline: { DAL: 160, SF: -192 }, spread: { favorite: "SF", line: 4.0 }, ou: { line: 46.5, prediction: "Over" }, pointDiff: 6.29, winner: "SF", projectedScore: { DAL: 20.84, SF: 27.13 } },
        { game: "NYG @ PIT", moneyline: { NYG: 210, PIT: -258 }, spread: { favorite: "PIT", line: 6.5 }, ou: { line: 36.0, prediction: "Over" }, pointDiff: 2.97, winner: "PIT", projectedScore: { NYG: 19.39, PIT: 22.36 } }
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
              Week 8 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
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
