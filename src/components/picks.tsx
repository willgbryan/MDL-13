"use client"
import React from "react";
import Image from "next/image"
import Link from "next/link"
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

export const description = ""
export default function Picks() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-20 bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900">
        <Header>
        <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          Week 6
        </h2>
      </Header>
      <div className="w-full max-w-5xl px-4 py-8">
        <Card x-chunk="dashboard-05-chunk-0" className="dark:bg-neutral-900 border shadow-lg">
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
