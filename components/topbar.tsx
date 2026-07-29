"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Search, Bell, Plus, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Topbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="h-9 w-9 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all" />
        
        {/* Global Search Bar */}
        <div className="relative hidden md:flex items-center w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search products, orders, customers... (⌘K)"
            className="w-full h-9 pl-9 pr-4 text-xs bg-slate-100/80 dark:bg-slate-800/80 border border-transparent rounded-lg focus:outline-none focus:border-indigo-500 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Add Button */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 shadow-sm shadow-indigo-500/20 text-xs font-semibold rounded-lg">
              <Plus className="h-4 w-4" /> Quick Create
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem render={<Link href="/sales/new" />}>
              <Plus className="mr-2 h-4 w-4 text-indigo-600" /> Create Sales Invoice
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/purchases/new" />}>
              <Plus className="mr-2 h-4 w-4 text-emerald-600" /> Create Purchase Order
            </DropdownMenuItem>
            <DropdownMenuItem render={<Link href="/products/new" />}>
              <Plus className="mr-2 h-4 w-4 text-purple-600" /> Add New Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Icon */}
        <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white dark:ring-slate-900" />
        </button>

        <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" className="relative flex items-center gap-3 h-10 px-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <Avatar className="h-8 w-8 ring-2 ring-indigo-500/20">
                <AvatarImage src="/avatars/01.png" alt={session?.user?.name || "Admin"} />
                <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">
                  {session?.user?.name?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-left hidden sm:flex">
                <span className="text-xs font-semibold leading-none">{session?.user?.name || "Admin User"}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-indigo-500 inline" /> Administrator
                </span>
              </div>
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-56 p-1">
            <DropdownMenuLabel className="p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none">{session?.user?.name || "Administrator"}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{session?.user?.email || "admin@erp.com"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4 text-indigo-500" />
              <span>Account Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
