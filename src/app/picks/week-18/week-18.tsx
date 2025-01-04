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
        {
          game: "CLE @ BAL",
          moneyline: { CLE: 1200, BAL: -2400 },
          spread: { favorite: "BAL", line: 20.5 },
          ou: { line: 41.5, prediction: "Over" },
          pointDiff: 5.98,
          winner: "BAL",
          projectedScore: { CLE: 18.88, BAL: 24.85 }
        },
        {
          game: "CIN @ PIT",
          moneyline: { CIN: -135, PIT: 114 },
          spread: { favorite: "CIN", line: 2.5 },
          ou: { line: 48.5, prediction: "Under" },
          pointDiff: 0.21,
          winner: "PIT",
          projectedScore: { CIN: 21.63, PIT: 21.85 }
        },
        {
          game: "CAR @ ATL",
          moneyline: { CAR: 300, ATL: -380 },
          spread: { favorite: "ATL", line: 7.5 },
          ou: { line: 47.5, prediction: "Under" },
          pointDiff: 4.14,
          winner: "ATL",
          projectedScore: { CAR: 20.95, ATL: 25.09 }
        },
        {
          game: "WAS @ DAL",
          moneyline: { WAS: -278, DAL: 225 },
          spread: { favorite: "WAS", line: 6.5 },
          ou: { line: 43.5, prediction: "Over" },
          pointDiff: 1.50,
          winner: "WAS",
          projectedScore: { WAS: 22.88, DAL: 21.38 }
        },
        {
          game: "CHI @ GB",
          moneyline: { CHI: 350, GB: -455 },
          spread: { favorite: "GB", line: 10.0 },
          ou: { line: 41.5, prediction: "Over" },
          pointDiff: 5.93,
          winner: "GB",
          projectedScore: { CHI: 19.30, GB: 25.23 }
        },
        {
          game: "JAX @ IND",
          moneyline: { JAX: 154, IND: -185 },
          spread: { favorite: "IND", line: 3.5 },
          ou: { line: 43.5, prediction: "Over" },
          pointDiff: 4.34,
          winner: "IND",
          projectedScore: { JAX: 20.47, IND: 24.80 }
        },
        {
          game: "BUF @ NE",
          moneyline: { BUF: -180, NE: 150 },
          spread: { favorite: "BUF", line: 3.5 },
          ou: { line: 36.5, prediction: "Over" },
          pointDiff: 0.04,
          winner: "BUF",
          projectedScore: { BUF: 18.32, NE: 18.28 }
        },
        {
          game: "NYG @ PHI",
          moneyline: { NYG: 105, PHI: -125 },
          spread: { favorite: "PHI", line: 1.5 },
          ou: { line: 36.5, prediction: "Over" },
          pointDiff: 1.53,
          winner: "PHI",
          projectedScore: { NYG: 18.25, PHI: 19.78 }
        },
        {
          game: "NO @ TB",
          moneyline: { NO: 625, TB: -950 },
          spread: { favorite: "TB", line: 14.0 },
          ou: { line: 44.5, prediction: "Over" },
          pointDiff: 5.56,
          winner: "TB",
          projectedScore: { NO: 19.75, TB: 25.31 }
        },
        {
          game: "HOU @ TEN",
          moneyline: { HOU: 105, TEN: -125 },
          spread: { favorite: "TEN", line: 1.5 },
          ou: { line: 36.5, prediction: "Over" },
          pointDiff: 2.31,
          winner: "TEN",
          projectedScore: { HOU: 18.35, TEN: 20.66 }
        },
        {
          game: "SF @ ARI",
          moneyline: { SF: 180, ARI: -218 },
          spread: { favorite: "ARI", line: 4.5 },
          ou: { line: 42.5, prediction: "Over" },
          pointDiff: 2.73,
          winner: "ARI",
          projectedScore: { SF: 21.51, ARI: 24.24 }
        },
        {
          game: "KC @ DEN",
          moneyline: { KC: 390, DEN: -520 },
          spread: { favorite: "DEN", line: 10.5 },
          ou: { line: 40.5, prediction: "Under" },
          pointDiff: 4.99,
          winner: "DEN",
          projectedScore: { KC: 20.00, DEN: 25.00 }
        },
        {
          game: "SEA @ LA",
          moneyline: { SEA: -270, LA: 220 },
          spread: { favorite: "SEA", line: 6.5 },
          ou: { line: 38.5, prediction: "Under" },
          pointDiff: 4.06,
          winner: "LA",
          projectedScore: { SEA: 18.75, LA: 22.81 }
        },
        {
          game: "LAC @ LV",
          moneyline: { LAC: -198, LV: 164 },
          spread: { favorite: "LAC", line: 4.5 },
          ou: { line: 41.5, prediction: "Over" },
          pointDiff: 3.24,
          winner: "LAC",
          projectedScore: { LAC: 23.18, LV: 19.94 }
        },
        {
          game: "MIA @ NYJ",
          moneyline: { MIA: -112, NYJ: -108 },
          spread: { favorite: "MIA", line: 0.5 },
          ou: { line: 38.5, prediction: "Over" },
          pointDiff: 3.31,
          winner: "NYJ",
          projectedScore: { MIA: 17.49, NYJ: 20.80 }
        },
        {
          game: "MIN @ DET",
          moneyline: { MIN: 130, DET: -155 },
          spread: { favorite: "DET", line: 3.0 },
          ou: { line: 56.5, prediction: "Under" },
          pointDiff: 4.59,
          winner: "DET",
          projectedScore: { MIN: 21.68, DET: 26.26 }
        }
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
              Week 18 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 18 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
