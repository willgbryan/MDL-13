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
        { game: "DEN @ NO", moneyline: { DEN: -148, NO: 124 }, spread: { favorite: "NO", line: -2.5 }, ou: { line: 37.0, prediction: "Over" }, pointDiff: 7.75, winner: "NO", projectedScore: { DEN: 19.70, NO: 27.45 } },
        { game: "NE @ JAX", moneyline: { NE: 205, JAX: -250 }, spread: { favorite: "JAX", line: 6.0 }, ou: { line: 42.0, prediction: "Over" }, pointDiff: 5.27, winner: "JAX", projectedScore: { NE: 21.18, JAX: 26.45 } },
        { game: "SEA @ ATL", moneyline: { SEA: 130, ATL: -155 }, spread: { favorite: "ATL", line: 3.0 }, ou: { line: 51.5, prediction: "Under" }, pointDiff: 10.97, winner: "ATL", projectedScore: { SEA: 21.12, ATL: 32.09 } },
        { game: "TEN @ BUF", moneyline: { TEN: 360, BUF: -470 }, spread: { favorite: "BUF", line: 9.5 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 8.85, winner: "BUF", projectedScore: { TEN: 19.96, BUF: 28.81 } },
        { game: "CIN @ CLE", moneyline: { CIN: -230, CLE: 190 }, spread: { favorite: "CIN", line: -5.5 }, ou: { line: 41.5, prediction: "Over" }, pointDiff: 0.27, winner: "CLE", projectedScore: { CIN: 24.33, CLE: 24.60 } },
        { game: "HOU @ GB", moneyline: { HOU: 124, GB: -148 }, spread: { favorite: "GB", line: 3.0 }, ou: { line: 48.5, prediction: "Under" }, pointDiff: 8.71, winner: "GB", projectedScore: { HOU: 20.66, GB: 29.37 } },
        { game: "MIA @ IND", moneyline: { MIA: 130, IND: -155 }, spread: { favorite: "IND", line: 3.0 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 8.21, winner: "IND", projectedScore: { MIA: 20.41, IND: 28.62 } },
        { game: "DET @ MIN", moneyline: { DET: 100, MIN: -120 }, spread: { favorite: "MIN", line: 1.5 }, ou: { line: 50.5, prediction: "Under" }, pointDiff: 4.27, winner: "MIN", projectedScore: { DET: 22.51, MIN: 26.78 } },
        { game: "PHI @ NYG", moneyline: { PHI: -170, NYG: 142 }, spread: { favorite: "PHI", line: -3.5 }, ou: { line: 42.5, prediction: "Under" }, pointDiff: 1.95, winner: "PHI", projectedScore: { PHI: 23.80, NYG: 21.86 } },
        { game: "LV @ LA", moneyline: { LV: 275, LA: -345 }, spread: { favorite: "LA", line: 7.0 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 3.48, winner: "LA", projectedScore: { LV: 21.43, LA: 24.91 } },
        { game: "CAR @ WAS", moneyline: { CAR: 360, WAS: -470 }, spread: { favorite: "WAS", line: 9.5 }, ou: { line: 51.5, prediction: "Under" }, pointDiff: 8.83, winner: "WAS", projectedScore: { CAR: 20.23, WAS: 29.06 } },
        { game: "KC @ SF", moneyline: { KC: 105, SF: -125 }, spread: { favorite: "SF", line: 2.0 }, ou: { line: 47.0, prediction: "Under" }, pointDiff: 2.99, winner: "SF", projectedScore: { KC: 25.19, SF: 28.17 } },
        { game: "NYJ @ PIT", moneyline: { NYJ: -135, PIT: 114 }, spread: { favorite: "NYJ", line: -1.5 }, ou: { line: 39.0, prediction: "Over" }, pointDiff: 2.37, winner: "NYJ", projectedScore: { NYJ: 19.30, PIT: 21.66 } },
        { game: "BAL @ TB", moneyline: { BAL: -180, TB: 150 }, spread: { favorite: "BAL", line: -3.5 }, ou: { line: 49.0, prediction: "Under" }, pointDiff: 3.57, winner: "BAL", projectedScore: { BAL: 24.53, TB: 20.96 } },
        { game: "LAC @ ARI", moneyline: { LAC: -125, ARI: 105 }, spread: { favorite: "LAC", line: -2.0 }, ou: { line: 44.0, prediction: "Under" }, pointDiff: 0.78, winner: "LAC", projectedScore: { LAC: 23.17, ARI: 22.40 } },
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
              Week 7 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  Our model's predictions for Week 7 NFL games.
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