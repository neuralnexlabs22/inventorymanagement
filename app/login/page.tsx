import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-slate-950 px-4 py-12 overflow-hidden">
      {/* Dynamic Background Mesh Gradients */}
      <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <LoginForm />
        <p className="mt-8 text-center text-xs text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} StockPro ERP Systems. All rights reserved.
        </p>
      </div>
    </div>
  );
}
