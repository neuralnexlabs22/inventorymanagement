import { Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">Manage system users and access roles.</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <Users className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">User Management</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto">
          User management module is currently being configured for the new local environment. 
          The Admin user is active by default.
        </p>
      </div>
    </div>
  );
}
