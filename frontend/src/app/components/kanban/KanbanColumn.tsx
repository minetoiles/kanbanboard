import { KanbanCard } from "./KanbanCard";
import type { CardData, Status } from "../../types";

interface Props {
  title: string;
  status: Status;
  cards: CardData[];
  color: string;
  dotColor: string;
  onEdit: (card: CardData) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
  isLoading?: boolean;
}

export function KanbanColumn({
  title,
  status,
  cards,
  color,
  dotColor,
  onEdit,
  onDelete,
  onMove,
  isLoading = false,
}: Props) {
  return (
    <div
      className="flex flex-col rounded-2xl border min-w-0 overflow-hidden"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        height: "100%",
      }}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-4 py-3.5 border-b" style={{ borderColor: "var(--border)" }}>
        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: dotColor }} />
        <span className="text-sm" style={{ color: "var(--foreground)", fontWeight: 600 }}>
          {title}
        </span>
        <span
          className="ml-auto px-2 py-0.5 rounded-full text-xs"
          style={{ background: color, color: dotColor, fontWeight: 700 }}
        >
          {cards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-y-auto scrollbar-hide" style={{ minHeight: 0 }}>
        {isLoading ? (
          <>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="rounded-xl border p-4 animate-pulse"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "var(--border)",
                }}
              >
                <div className="h-4 w-24 mb-3 rounded-full bg-slate-700/30" />
                <div className="h-3 w-full mb-2 rounded-full bg-slate-700/20" />
                <div className="h-3 w-5/6 mb-3 rounded-full bg-slate-700/20" />
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-8 w-8 rounded-full bg-slate-700/30" />
                  <div className="h-3 w-20 rounded-full bg-slate-700/20" />
                </div>
              </div>
            ))}
          </>
        ) : cards.length === 0 ? (
          <div
            className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed text-sm"
            style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
          >
            카드가 없습니다
          </div>
        ) : (
          cards.map((card) => (
            <KanbanCard key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} onMove={onMove} />
          ))
        )}
      </div>

    </div>
  );
}
