import { Settings } from "lucide-react";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your application preferences.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Settings className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">System Settings</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          System-wide settings (e.g., currency format, timezones, and notifications) will appear here.
        </p>
      </div>
    </div>
  );
}
