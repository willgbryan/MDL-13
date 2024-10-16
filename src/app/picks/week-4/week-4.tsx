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
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
  
    useEffect(() => {
      async function checkAuthAndPayment() {
        const session = await getUserDetails();
        setIsAuthenticated(!!session);
  
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
  
    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-transparent">
          <Header>
            <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
              Week 4
            </h2>
          </Header>
          <div className="w-full max-w-5xl px-4 py-8">
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
                      <TableHead className="w-1/4">Game</TableHead>
                      <TableHead className="w-1/4">O/U</TableHead>
                      <TableHead className="w-1/4">Point Diff</TableHead>
                      <TableHead className="w-1/4">Winner</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { game: "SF @ SEA", ou: "Over", pointDiff: 4, winner: "SF" },
                      { game: "JAX @ CHI", ou: "Over", pointDiff: 3, winner: "CHI" },
                      { game: "WAS @ BAL", ou: "Under", pointDiff: 6, winner: "BAL" },
                      { game: "ARI @ GB", ou: "Under", pointDiff: 6, winner: "GB" },
                      { game: "HOU @ NE", ou: "Under", pointDiff: 3.5, winner: "HOU" },
                      { game: "TB @ NO", ou: "Over", pointDiff: 3, winner: "TB" },
                      { game: "CLE @ PHI", ou: "Under", pointDiff: 6.5, winner: "PHI" },
                      { game: "IND @ TEN", ou: "Under", pointDiff: 1.5, winner: "IND" },
                      { game: "LAC @ DEN", ou: "Under", pointDiff: 1.5, winner: "LAC" },
                      { game: "PIT @ LV", ou: "Over", pointDiff: 4.5, winner: "LV" },
                      { game: "ATL @ CAR", ou: "Under", pointDiff: 3.5, winner: "ATL" },
                      { game: "DET @ DAL", ou: "Under", pointDiff: 0, winner: "DET" },
                      { game: "CIN @ NYG", ou: "Under", pointDiff: 5, winner: "CIN" },
                      { game: "BUF @ NYJ", ou: "Over", pointDiff: 3.5, winner: "BUF" },
                    ].map((row, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{row.game}</TableCell>
                        <TableCell>
                          <Badge variant={row.ou === "Over" ? "outline" : "secondary"}>
                            {row.ou}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.pointDiff}</TableCell>
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