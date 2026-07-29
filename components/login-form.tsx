"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Lock, User, KeyRound, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "admin",
      password: "admin123",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signIn("credentials", {
      username: values.username,
      password: values.password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: "Invalid username or password. Please verify credentials.",
      });
    } else {
      toast({
        title: "Welcome Back!",
        description: "Accessing StockPro Enterprise Dashboard...",
      });
      router.push("/");
      router.refresh();
    }
  }

  const fillDemoCredentials = () => {
    form.setValue("username", "admin");
    form.setValue("password", "admin123");
  };

  return (
    <Card className="w-full max-w-md border border-slate-200/80 dark:border-slate-800 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 p-8 text-white text-center relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md mb-3 shadow-inner">
          <Lock className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-2xl font-black tracking-tight text-white">StockPro ERP</CardTitle>
        <CardDescription className="text-indigo-100 text-xs font-medium mt-1">
          Enterprise Stock & Inventory System
        </CardDescription>
      </div>

      <CardContent className="p-8">
        {/* Demo Credentials Quick Fill Banner */}
        <div className="mb-6 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-slate-900 dark:text-white block">Default Admin Login</span>
              <span className="text-slate-500 dark:text-slate-400">Username: <strong className="text-indigo-600 dark:text-indigo-400">admin</strong> | Pass: <strong className="text-indigo-600 dark:text-indigo-400">admin123</strong></span>
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={fillDemoCredentials}
            className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 h-7 px-2"
          >
            Auto Fill
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Username
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="Enter username"
                        className="pl-10 h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:border-indigo-500 rounded-xl text-sm"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 focus:border-indigo-500 rounded-xl text-sm"
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all mt-2"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
