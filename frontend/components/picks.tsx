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
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-20">
        <Header>
        <h2 className="font-sans text-bold text-xl text-center md:text-4xl w-fit mx-auto font-bold tracking-tight text-neutral-800 dark:text-neutral-100">
          Week 6
        </h2>
      </Header>
      <div className="w-full max-w-5xl px-4 py-8">
        <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
            Manage your products and view their sales performance.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">
                    Price
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Total Sales
                </TableHead>
                <TableHead className="hidden md:table-cell">
                    Created at
                </TableHead>
                <TableHead>
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="hidden sm:table-cell">
                    <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    Laser Lemonade Machine
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Draft</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    $499.99
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    25
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    2023-07-12 10:42 AM
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
                <TableCell className="hidden sm:table-cell">
                    <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    Hypernova Headphones
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Active</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    $129.99
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    100
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    2023-10-18 03:21 PM
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
                <TableCell className="hidden sm:table-cell">
                    <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    AeroGlow Desk Lamp
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Active</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    $39.99
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    50
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    2023-11-29 08:15 AM
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
                <TableCell className="hidden sm:table-cell">
                    <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    TechTonic Energy Drink
                </TableCell>
                <TableCell>
                    <Badge variant="secondary">Draft</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    $2.99
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    0
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    2023-12-25 11:59 PM
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
                <TableCell className="hidden sm:table-cell">
                    <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    Gamer Gear Pro Controller
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Active</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    $59.99
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    75
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    2024-01-01 12:00 AM
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
                <TableCell className="hidden sm:table-cell">
                    <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src="/placeholder.svg"
                    width="64"
                    />
                </TableCell>
                <TableCell className="font-medium">
                    Luminous VR Headset
                </TableCell>
                <TableCell>
                    <Badge variant="outline">Active</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    $199.99
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    30
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    2024-02-14 02:14 PM
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
        <CardFooter>
            <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong>{" "}
            products
            </div>
        </CardFooter>
        </Card>
      </div>
    </div>
  )
}
