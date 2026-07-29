"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  Layers,
  Activity,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  Users,
  Settings,
  User,
  LogOut,
  ClipboardList
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNav = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/" },
];

const inventoryNav = [
  { title: "Products", icon: Package, href: "/products" },
  { title: "Categories", icon: Layers, href: "/categories" },
];

const stockNav = [
  { title: "Inward Stock", icon: ArrowDownToLine, href: "/inward-stock" },
  { title: "Outward Stock", icon: ArrowUpFromLine, href: "/outward-stock" },
  { title: "Stock Ledger", icon: Activity, href: "/stock-ledger" },
  { title: "Inventory", icon: ClipboardList, href: "/inventory" },
];

const systemNav = [
  { title: "Reports", icon: FileText, href: "/reports" },
  { title: "Users", icon: Users, href: "/users" },
  { title: "Settings", icon: Settings, href: "/settings" },
];

const profileNav = [
  { title: "Profile", icon: User, href: "/profile" },
  { title: "Logout", icon: LogOut, href: "/api/auth/signout" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon" className="border-r border-slate-800 bg-slate-900 text-slate-100">
      <SidebarHeader className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 font-bold text-lg">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-white leading-none">StockManager</span>
            <span className="text-[10px] text-indigo-400 font-semibold tracking-wider uppercase mt-1">Inventory System</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3 custom-scrollbar">
        {/* Main Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            Overview
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center w-full gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Catalog Section */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            Catalog
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {inventoryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center w-full gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Stock Management Section */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            Stock Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {stockNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center w-full gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Section */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center w-full gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Profile Section */}
        <SidebarGroup className="mt-2">
          <SidebarGroupLabel className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {profileNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={<Link href={item.href} />}
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      pathname === item.href
                        ? "bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/30"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center w-full gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

      </SidebarContent>
    </Sidebar>
  );
}
