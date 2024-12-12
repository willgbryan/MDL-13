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
      { game: "LA @ SF", moneyline: { LA: 120, SF: -142 }, spread: { favorite: "SF", line: 3.0 }, ou: { line: 48.5, prediction: "Under" }, pointDiff: 2.39, winner: "SF", projectedScore: { LA: 21.28, SF: 23.66 } },
      { game: "DAL @ CAR", moneyline: { DAL: 124, CAR: -148 }, spread: { favorite: "CAR", line: 3.0 }, ou: { line: 43.0, prediction: "Under" }, pointDiff: 3.27, winner: "CAR", projectedScore: { DAL: 20.24, CAR: 23.50 } },
      { game: "KC @ CLE", moneyline: { KC: -198, CLE: 164 }, spread: { favorite: "KC", line: 4.0 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 2.52, winner: "KC", projectedScore: { KC: 23.30, CLE: 20.78 } },
      { game: "MIA @ HOU", moneyline: { MIA: 124, HOU: -148 }, spread: { favorite: "HOU", line: 3.0 }, ou: { line: 46.5, prediction: "Over" }, pointDiff: 4.12, winner: "HOU", projectedScore: { MIA: 21.40, HOU: 25.52 } },
      { game: "NYJ @ JAX", moneyline: { NYJ: -166, JAX: 140 }, spread: { favorite: "NYJ", line: 3.0 }, ou: { line: 40.5, prediction: "Under" }, pointDiff: 1.32, winner: "NYJ", projectedScore: { NYJ: 20.41, JAX: 19.09 } },
      { game: "WAS @ NO", moneyline: { WAS: -340, NO: 270 }, spread: { favorite: "WAS", line: 7.5 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 1.14, winner: "WAS", projectedScore: { WAS: 22.63, NO: 21.49 } },
      { game: "BAL @ NYG", moneyline: { BAL: -1350, NYG: 800 }, spread: { favorite: "BAL", line: 16.0 }, ou: { line: 42.5, prediction: "Under" }, pointDiff: 6.24, winner: "BAL", projectedScore: { BAL: 25.20, NYG: 18.95 } },
      { game: "CIN @ TEN", moneyline: { CIN: -218, TEN: 180 }, spread: { favorite: "CIN", line: 5.0 }, ou: { line: 46.0, prediction: "Under" }, pointDiff: 1.13, winner: "CIN", projectedScore: { CIN: 22.74, TEN: 21.61 } },
      { game: "NE @ ARI", moneyline: { NE: 195, ARI: -238 }, spread: { favorite: "ARI", line: 6.0 }, ou: { line: 46.0, prediction: "Over" }, pointDiff: 2.42, winner: "ARI", projectedScore: { NE: 22.38, ARI: 24.80 } },
      { game: "IND @ DEN", moneyline: { IND: 164, DEN: -198 }, spread: { favorite: "DEN", line: 4.0 }, ou: { line: 44.0, prediction: "Under" }, pointDiff: 4.19, winner: "DEN", projectedScore: { IND: 20.02, DEN: 24.22 } },
      { game: "BUF @ DET", moneyline: { BUF: 110, DET: -130 }, spread: { favorite: "DET", line: 2.5 }, ou: { line: 54.5, prediction: "Under" }, pointDiff: 2.27, winner: "DET", projectedScore: { BUF: 21.71, DET: 23.98 } },
      { game: "TB @ LAC", moneyline: { TB: 120, LAC: -142 }, spread: { favorite: "LAC", line: 3.0 }, ou: { line: 45.0, prediction: "Under" }, pointDiff: 1.79, winner: "LAC", projectedScore: { TB: 20.63, LAC: 22.42 } },
      { game: "PIT @ PHI", moneyline: { PIT: 205, PHI: -250 }, spread: { favorite: "PHI", line: 5.5 }, ou: { line: 43.0, prediction: "Over" }, pointDiff: 5.80, winner: "PHI", projectedScore: { PIT: 20.25, PHI: 26.05 } },
      { game: "GB @ SEA", moneyline: { GB: -135, SEA: 114 }, spread: { favorite: "GB", line: 2.5 }, ou: { line: 45.5, prediction: "Under" }, pointDiff: 1.57, winner: "GB", projectedScore: { GB: 22.61, SEA: 21.04 } },
      { game: "CHI @ MIN", moneyline: { CHI: 235, MIN: -290 }, spread: { favorite: "MIN", line: 6.5 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 3.69, winner: "MIN", projectedScore: { CHI: 19.98, MIN: 23.67 } },
      { game: "ATL @ LV", moneyline: { ATL: -205, LV: 170 }, spread: { favorite: "ATL", line: 4.0 }, ou: { line: 44.0, prediction: "Under" }, pointDiff: 3.78, winner: "ATL", projectedScore: { ATL: 22.40, LV: 18.62 } }
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
              Week 15 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 15 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
