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
    const [hasPaid, setHasPaid] = useState(false);
    const router = useRouter();
  
    useEffect(() => {
      async function checkAuthAndPayment() {
        const session = await getUserDetails();
        setIsAuthenticated(!!session);
  
        if (session) {
          const stripeCustomerId = await getStripeCustomerId(session.id);
          if (stripeCustomerId) {
            const weeklyPaid = await checkWeeklyPayment(stripeCustomerId, 6);
            const seasonPaid = await checkSeasonPayment(stripeCustomerId, '2023');
            setHasPaid(weeklyPaid || seasonPaid);
          }
        }
  
        setIsLoading(false);
      }
      checkAuthAndPayment();
    }, []);
  
    if (isLoading) {
      return <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
        <p className="text-neutral-800 dark:text-neutral-200">Loading...</p>
      </div>;
    }
  
    if (!isAuthenticated) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
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
  
    if (!hasPaid) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
          <Card className="w-full max-w-md bg-transparent border-none">
            <CardHeader>
              <CardTitle>Payment Required</CardTitle>
              <CardDescription>
                You need to purchase either a weekly or season pass to view this week's picks.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => router.push('/pricing')} 
                className="w-full"
              >
                View Pricing
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
        <Header>
        <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          Week 6
        </h2>
      </Header>
      <div className="w-full max-w-5xl px-4 py-8">
        <Card x-chunk="dashboard-05-chunk-0" className="dark:bg-transparent">
        <CardHeader>
            <CardTitle>MDL Predictions</CardTitle>
            <CardDescription>
            Predictions are made by analyzing a diverse set of historical data. Add in your own best judgement to inform your own decisions.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Game</TableHead>
                <TableHead>O/U</TableHead>
                <TableHead className="hidden md:table-cell">
                    Point Difference
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Winner
                </TableHead>
                <TableHead>
                    <span className="hidden md:table-cell">Notes</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">
                    SF @ SEA
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Over</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    4
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    SF
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    JAX @ CHI
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Over</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    3
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    CHI
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    WAS @ BAL
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    6
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    BAL
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    ARI @ GB
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    6
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    GB
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    HOU @ NE
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    3.5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    HOU
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    TB @ NO
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Over</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    3
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    TB
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    CLE @ PHI
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    6.5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    PHI
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    IND @ TEN
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    1.5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    IND
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    LAC @ DEN
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    1.5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    LAC
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    PIT @ LV
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Over</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    4.5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    LV
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    ATL @ CAR
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    3.5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    ATL
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    DET @ DAL
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    0
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    DET
                </TableCell>
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    CIN @ NYG
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Under</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    CIN
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
                <TableRow>
                
                <TableCell className="font-medium">
                    BUF @ NYJ
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Over</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    3.5
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    BUF
                </TableCell>
                
                <TableCell>
                    <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                        >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </CardContent>
        {/* <CardFooter>
            <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
            products
            </div>
        </CardFooter> */}
        </Card>
      </div>
    </div>
  )
}
