import { User } from "lucide-react";

export const dynamic = "force-dynamic";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile</h2>
        <p className="text-muted-foreground">Manage your personal account settings.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <User className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Admin Profile</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          You are currently signed in as the System Admin. Profile editing capabilities will be available in the next release.
        </p>
      </div>
    </div>
  );
}
