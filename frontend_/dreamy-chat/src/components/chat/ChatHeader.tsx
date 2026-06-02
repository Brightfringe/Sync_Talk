import { LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ConnectionStatusPill } from "./ConnectionStatus";
import type { ConnectionStatus } from "@/lib/chat/types";

interface Props {
  status: ConnectionStatus;
  onLeave: () => void;
}

export function ChatHeader({ status, onLeave }: Props) {
  return (
    <header className="glass flex items-center justify-between gap-3 px-4 py-3 md:hidden">
      <Logo size="sm" />
      <div className="flex items-center gap-2">
        <ConnectionStatusPill status={status} />
        <button
          onClick={onLeave}
          aria-label="Leave chat"
          className="grid h-9 w-9 place-items-center rounded-xl text-muted-foreground transition hover:bg-white/60 hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}