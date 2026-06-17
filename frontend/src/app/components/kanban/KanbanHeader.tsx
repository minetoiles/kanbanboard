import { ArrowUpDown, CheckCircle2, Clock4, ListTodo, LogOut, Plus, SortAsc, User as UserIcon } from "lucide-react";
import type { User, SortMode } from "../../types";
import type { LucideIcon } from "lucide-react";

interface HeaderStat {
  label: string;
  count: number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

interface Props {
  session: User;
  sortMode: SortMode;
  onSortToggle: () => void;
  onCreate: () => void;
  onLogout: () => void;
  todoCount: number;
  inprogressCount: number;
  doneCount: number;
}

const stats: Omit<HeaderStat, "count">[] = [
  { label: "할일", icon: ListTodo, color: "#7c6af5", bg: "rgba(124,106,245,0.12)" },
  { label: "진행중", icon: Clock4, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  { label: "완료", icon: CheckCircle2, color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
];

export function KanbanHeader({
  session,
  sortMode,
  onSortToggle,
  onCreate,
  onLogout,
  todoCount,
  inprogressCount,
  doneCount,
}: Props) {
  const counts = [todoCount, inprogressCount, doneCount];
  const sortLabel: Record<SortMode, string> = {
    none: "정렬 없음",
    "priority-desc": "우선순위 ↑",
    "priority-asc": "우선순위 ↓",
  };

  return (
    <div
      className="sticky top-0 z-30 px-6 py-4 border-b flex items-start justify-between gap-4 flex-wrap"
      style={{ background: "rgba(15,17,23,0.92)", backdropFilter: "blur(12px)", borderColor: "var(--border)" }}
    >
      <div>
        <h1 style={{ color: "var(--foreground)" }}>프로젝트 칸반</h1>
        <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
          태스크를 관리하고 진행 상황을 추적하세요
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg border"
            style={{ borderColor: "var(--border)", background: "var(--secondary)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ background: "rgba(124,106,245,0.3)" }}
            >
              <UserIcon className="w-3.5 h-3.5" style={{ color: "#a89af7" }} />
            </div>
            <span className="text-sm" style={{ color: "var(--foreground)" }}>
              {session.name || session.email}
            </span>
          </div>

          <button
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm transition-colors hover:bg-accent"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            onClick={onSortToggle}
          >
            {sortMode === "none" ? <SortAsc className="w-4 h-4" /> : <ArrowUpDown className="w-4 h-4" />}
            {sortLabel[sortMode]}
          </button>

          <button
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-85"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            onClick={onCreate}
          >
            <Plus className="w-4 h-4" />
            새 카드
          </button>

          <button
            className="p-2 rounded-lg border transition-colors hover:bg-destructive/20"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            title="로그아웃"
            onClick={onLogout}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          {stats.map(({ label, icon: Icon, color, bg }, index) => (
            <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: bg }}>
              <Icon className="w-3.5 h-3.5" style={{ color }} />
              <span className="text-xs" style={{ color, fontWeight: 600 }}>
                {label} {counts[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
