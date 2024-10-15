'use client'
import React from 'react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { User } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

type UserProps = {
  id: string;
  name?: string;
  email?: string;
  customerId?: string;
}

export function HeaderAccountDropdown({ user }: { user: UserProps }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
      <Button className="bg-transparent p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md">
          <User className="h-5 w-5 text-black dark:text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 px-0 py-1 bg-neutral-800 border-[#4BFFBA]" align="end">
        <div className="flex items-center gap-2 p-2">
          <div className="flex flex-col text-left text-sm">
            {user.name ? <h2 className="font-medium">@{user.name}</h2> : null}
            {user.email && <h1>{user.email}</h1>}
          </div>
        </div>
        <Separator />
        <div className="py-1">
          {/* <DropdownMenuItem>
            <Link href="/profile" className="flex w-full items-center justify-between gap-2">
              <span>Profile</span>
            </Link>
          </DropdownMenuItem> */}
          <DropdownMenuItem>
            <Link href="/pricing" className="flex w-full items-center justify-between gap-2">
              <span>Pricing</span>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Link href="/billing" className="flex w-full items-center justify-between gap-2">
              <span>Billing</span>
            </Link>
          </DropdownMenuItem> */}
        </div>
        <Separator />
        <div className="py-1">
          <DropdownMenuItem>
            <form className="block" action="/auth/sign-out" method="post">
              <button type="submit">Sign out</button>
            </form>
          </DropdownMenuItem>
        </div>
        <Separator />
        <div className="py-2 flex justify-center space-x-4">
          <Link 
            href="/terms-and-privacy" 
            className="text-xs dark:text-zinc-600 text-gray-600 hover:underline"
          >
            Terms
          </Link>
          <Link 
            href="/terms-and-privacy" 
            className="text-xs dark:text-zinc-600 text-gray-600 hover:underline"
          >
            Privacy
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}