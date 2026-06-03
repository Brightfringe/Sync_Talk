import { LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ConnectionStatusPill } from "./ConnectionStatus";
import type { ConnectionStatus } from "@/lib/chat/types";

interface Props {
  username: string;
  status: ConnectionStatus;
  onLeave: () => void;
  onlineUsers: string[];
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Sidebar({ username, status, onLeave, onlineUsers }: Props) {
  return (
    <aside className="glass hidden h-full w-[280px] shrink-0 flex-col gap-6 rounded-r-3xl p-6 md:flex">
      <div>
        <Logo size="md" />
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Status
        </p>
        <ConnectionStatusPill status={status} />
      </div>

      {/* Online Users List */}
      <div className="space-y-2 flex-1 overflow-hidden">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Online — {onlineUsers.length}
        </p>
        <div className="space-y-1 overflow-y-auto max-h-[300px]">
          {onlineUsers.length === 0 ? (
            <p className="text-[12px] text-muted-foreground px-1">No one else here yet</p>
          ) : (
            onlineUsers.map((user) => (
              <div
                key={user}
                className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/20 transition"
              >
                <div className="relative">
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-gradient-primary text-xs font-semibold text-white shadow-soft">
                    {initials(user)}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user}
                    {user === username && (
                      <span className="ml-1 text-[10px] text-muted-foreground">(you)</span>
                    )}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-auto space-y-3">
        <div className="glass-strong flex items-center gap-3 rounded-2xl p-3 shadow-soft">
          <div className="relative">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-primary text-sm font-semibold text-white shadow-soft">
              {initials(username)}
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white ${status === "connected" ? "bg-emerald-400" : "bg-muted-foreground/50"}`}
              aria-label={status === "connected" ? "Online" : "Offline"}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">{username}</p>
            <p className="truncate text-[11px] text-muted-foreground">You</p>
          </div>
          <button
            onClick={onLeave}
            aria-label="Leave chat"
            className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground transition hover:bg-white/60 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        <p className="px-1 text-center text-[10px] text-muted-foreground/80">
          SyncTalk · v1.0
        </p>
      </div>
    </aside>
  );
}