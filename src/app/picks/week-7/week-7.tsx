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
        { game: "DEN @ NO", moneyline: { DEN: -142, NO: 120 }, spread: { favorite: "NO", line: -3.0 }, ou: { line: 37.0, prediction: "Over" }, pointDiff: 7.72, winner: "NO", projectedScore: { DEN: 19.94, NO: 27.67 } },
        { game: "NE @ JAX", moneyline: { NE: 195, JAX: -238 }, spread: { favorite: "JAX", line: -5.5 }, ou: { line: 42.5, prediction: "Over" }, pointDiff: 5.92, winner: "JAX", projectedScore: { NE: 21.21, JAX: 27.12 } },
        { game: "SEA @ ATL", moneyline: { SEA: 130, ATL: -155 }, spread: { favorite: "ATL", line: -2.5 }, ou: { line: 51.0, prediction: "Under" }, pointDiff: 12.62, winner: "ATL", projectedScore: { SEA: 20.75, ATL: 33.37 } },
        { game: "TEN @ BUF", moneyline: { TEN: 340, BUF: -440 }, spread: { favorite: "BUF", line: -9.0 }, ou: { line: 41.0, prediction: "Over" }, pointDiff: 9.26, winner: "BUF", projectedScore: { TEN: 19.98, BUF: 29.24 } },
        { game: "CIN @ CLE", moneyline: { CIN: -258, CLE: 210 }, spread: { favorite: "CIN", line: -6.0 }, ou: { line: 42.0, prediction: "Over" }, pointDiff: 0.46, winner: "CIN", projectedScore: { CIN: 24.42, CLE: 24.88 } },
        { game: "HOU @ GB", moneyline: { HOU: 120, GB: -142 }, spread: { favorite: "GB", line: -2.5 }, ou: { line: 47.5, prediction: "Under" }, pointDiff: 9.78, winner: "GB", projectedScore: { HOU: 21.00, GB: 30.78 } },
        { game: "MIA @ IND", moneyline: { MIA: 140, IND: -166 }, spread: { favorite: "IND", line: -3.0 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 7.31, winner: "IND", projectedScore: { MIA: 21.40, IND: 28.71 } },
        { game: "DET @ MIN", moneyline: { DET: 114, MIN: -135 }, spread: { favorite: "MIN", line: -2.5 }, ou: { line: 50.0, prediction: "Under" }, pointDiff: 5.66, winner: "MIN", projectedScore: { DET: 22.42, MIN: 28.08 } },
        { game: "PHI @ NYG", moneyline: { PHI: -166, NYG: 140 }, spread: { favorite: "PHI", line: -3.0 }, ou: { line: 43.0, prediction: "Under" }, pointDiff: 0.24, winner: "NYG", projectedScore: { PHI: 21.84, NYG: 22.09 } },
        { game: "LV @ LA", moneyline: { LV: 270, LA: -340 }, spread: { favorite: "LA", line: -7.0 }, ou: { line: 43.5, prediction: "Over" }, pointDiff: 2.69, winner: "LA", projectedScore: { LV: 21.42, LA: 24.11 } },
        { game: "CAR @ WAS", moneyline: { CAR: 300, WAS: -380 }, spread: { favorite: "WAS", line: -8.0 }, ou: { line: 51.5, prediction: "Under" }, pointDiff: 8.04, winner: "WAS", projectedScore: { CAR: 20.46, WAS: 28.49 } },
        { game: "KC @ SF", moneyline: { KC: 102, SF: -122 }, spread: { favorite: "SF", line: -1.5 }, ou: { line: 47.0, prediction: "Under" }, pointDiff: 2.94, winner: "SF", projectedScore: { KC: 25.22, SF: 28.16 } },
        { game: "NYJ @ PIT", moneyline: { NYJ: -122, PIT: 102 }, spread: { favorite: "NYJ", line: -1.5 }, ou: { line: 38.0, prediction: "Over" }, pointDiff: 3.05, winner: "PIT", projectedScore: { NYJ: 18.96, PIT: 22.01 } },
        { game: "BAL @ TB", moneyline: { BAL: -180, TB: 150 }, spread: { favorite: "BAL", line: -3.5 }, ou: { line: 49.5, prediction: "Under" }, pointDiff: 3.67, winner: "BAL", projectedScore: { BAL: 24.53, TB: 20.87 } },
        { game: "LAC @ ARI", moneyline: { LAC: -148, ARI: 124 }, spread: { favorite: "LAC", line: -3.0 }, ou: { line: 43.5, prediction: "Under" }, pointDiff: 0.81, winner: "LAC", projectedScore: { LAC: 23.20, ARI: 22.39 } },
      ];
  
  
    useEffect(() => {
      async function checkAuthAndPayment() {
        const session = await getUserDetails();
        setIsAuthenticated(!!session);
        // setIsAuthenticated(true);

  
        // if (session) {
        //   const stripeCustomerId = await getStripeCustomerId(session.id);
        //   if (stripeCustomerId) {
        //     const weeklyPaid = await checkWeeklyPayment(stripeCustomerId, 6);
        //     const seasonPaid = await checkSeasonPayment(stripeCustomerId, '2023');
        //     setHasPaid(weeklyPaid || seasonPaid);
        //   }
        // }
  
        setIsLoading(false);
      }
      checkAuthAndPayment();
    }, []);
  
    if (isLoading) {
      return <div className="flex min-h-screen w-full items-center justify-center bg-transparent">
        <p className="text-neutral-800 dark:text-neutral-200">Loading...</p>
      </div>;
    }
  
    if (!isAuthenticated) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-transparent">
          <Card className="w-full max-w-md bg-transparent border-none">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                Only authenticated users can see historical picks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push('/auth/sign-in')} 
                className="w-full"
              >
                Login
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  
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
              Week 7
            </h2>
          </Header>
          <div className="w-full max-w-7xl px-4 py-8">
            <Card className="dark:bg-transparent">
              <CardHeader>
                <CardTitle>MDL Predictions</CardTitle>
                <CardDescription>
                  Predictions are made by analyzing a diverse set of historical data. Add in your own best judgement to inform your own decisions.
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
                          <Badge variant={row.ou.prediction === "Over" ? "outline" : "secondary"}>
                            {row.ou.prediction}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.winner}</TableCell>
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