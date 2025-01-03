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
          game: "KC @ PIT",
          moneyline: { KC: -162, PIT: 136 },
          spread: { favorite: "KC", line: 3.0 },
          ou: { line: 43.5, prediction: "Under" },
          pointDiff: 0.91,
          winner: "KC",
          projectedScore: { KC: 21.29, PIT: 20.39 }
        },
        {
          game: "BAL @ HOU",
          moneyline: { BAL: -245, HOU: 200 },
          spread: { favorite: "BAL", line: 5.5 },
          ou: { line: 46.5, prediction: "Over" },
          pointDiff: 2.37,
          winner: "BAL",
          projectedScore: { BAL: 23.60, HOU: 21.23 }
        },
        {
          game: "SEA @ CHI",
          moneyline: { SEA: -192, CHI: 160 },
          spread: { favorite: "SEA", line: 3.5 },
          ou: { line: 43.5, prediction: "Under" },
          pointDiff: 2.99,
          winner: "SEA",
          projectedScore: { SEA: 22.58, CHI: 19.59 }
        },
        {
          game: "LAC @ NE",
          moneyline: { LAC: -225, NE: 185 },
          spread: { favorite: "LAC", line: 4.0 },
          ou: { line: 42.5, prediction: "Under" },
          pointDiff: 3.92,
          winner: "LAC",
          projectedScore: { LAC: 23.17, NE: 19.25 }
        },
        {
          game: "DEN @ CIN",
          moneyline: { DEN: 142, CIN: -170 },
          spread: { favorite: "CIN", line: 3.5 },
          ou: { line: 50.0, prediction: "Under" },
          pointDiff: 3.99,
          winner: "CIN",
          projectedScore: { DEN: 20.88, CIN: 24.87 }
        },
        {
          game: "ARI @ LA",
          moneyline: { ARI: 230, LA: -285 },
          spread: { favorite: "LA", line: 6.0 },
          ou: { line: 48.5, prediction: "Under" },
          pointDiff: 4.39,
          winner: "LA",
          projectedScore: { ARI: 21.24, LA: 25.63 }
        },
        {
          game: "NYJ @ BUF",
          moneyline: { NYJ: 370, BUF: -485 },
          spread: { favorite: "BUF", line: 9.5 },
          ou: { line: 46.5, prediction: "Over" },
          pointDiff: 6.65,
          winner: "BUF",
          projectedScore: { NYJ: 20.20, BUF: 26.85 }
        },
        {
          game: "TEN @ JAX",
          moneyline: { TEN: -105, JAX: -115 },
          spread: { favorite: "JAX", line: 1.0 },
          ou: { line: 41.0, prediction: "Over" },
          pointDiff: 0.54,
          winner: "TEN",
          projectedScore: { TEN: 20.48, JAX: 19.95 }
        },
        {
          game: "LV @ NO",
          moneyline: { LV: -105, NO: -115 },
          spread: { favorite: "NO", line: 1.0 },
          ou: { line: 39.5, prediction: "Over" },
          pointDiff: 3.49,
          winner: "NO",
          projectedScore: { LV: 18.47, NO: 21.96 }
        },
        {
          game: "IND @ NYG",
          moneyline: { IND: -440, NYG: 340 },
          spread: { favorite: "IND", line: 8.0 },
          ou: { line: 40.5, prediction: "Over" },
          pointDiff: 3.67,
          winner: "IND",
          projectedScore: { IND: 23.84, NYG: 20.17 }
        },
        {
          game: "DAL @ PHI",
          moneyline: { DAL: 330, PHI: -425 },
          spread: { favorite: "PHI", line: 9.0 },
          ou: { line: 43.0, prediction: "Over" },
          pointDiff: 4.95,
          winner: "PHI",
          projectedScore: { DAL: 19.52, PHI: 24.47 }
        },
        {
          game: "CAR @ TB",
          moneyline: { CAR: 320, TB: -410 },
          spread: { favorite: "TB", line: 8.0 },
          ou: { line: 49.5, prediction: "Under" },
          pointDiff: 4.49,
          winner: "TB",
          projectedScore: { CAR: 20.46, TB: 24.94 }
        },
        {
          game: "MIA @ CLE",
          moneyline: { MIA: -310, CLE: 250 },
          spread: { favorite: "MIA", line: 6.5 },
          ou: { line: 40.0, prediction: "Over" },
          pointDiff: 3.37,
          winner: "MIA",
          projectedScore: { MIA: 24.26, CLE: 20.89 }
        },
        {
          game: "GB @ MIN",
          moneyline: { GB: 102, MIN: -122 },
          spread: { favorite: "MIN", line: 1.5 },
          ou: { line: 49.0, prediction: "Under" },
          pointDiff: 1.43,
          winner: "MIN",
          projectedScore: { GB: 21.61, MIN: 23.04 }
        },
        {
          game: "ATL @ WAS",
          moneyline: { ATL: 160, WAS: -192 },
          spread: { favorite: "WAS", line: 4.0 },
          ou: { line: 47.5, prediction: "Under" },
          pointDiff: 3.31,
          winner: "WAS",
          projectedScore: { ATL: 22.06, WAS: 25.37 }
        },
        {
          game: "DET @ SF",
          moneyline: { DET: -185, SF: 154 },
          spread: { favorite: "DET", line: 3.5 },
          ou: { line: 51.0, prediction: "Under" },
          pointDiff: 3.65,
          winner: "DET",
          projectedScore: { DET: 24.02, SF: 20.37 }
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
              Week 17 Predictions
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  MDL-13 predictions for Week 17 NFL games. These picks are based on historical data, use your own best judgement if bets are placed.
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
