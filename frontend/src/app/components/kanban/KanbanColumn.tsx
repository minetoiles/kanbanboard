import { KanbanCard } from "./KanbanCard";
import type { CardData, Status } from "../../types";
import { VALIDATION } from "../../constants";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DONE_PAGE_SIZE = VALIDATION.DONE_PAGE_SIZE;

interface Props {
  title: string;
  status: Status;
  cards: CardData[];
  color: string;
  dotColor: string;
  onEdit: (card: CardData) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export { DONE_PAGE_SIZE };

export function KanbanColumn({
  title,
  status,
  cards,
  color,
  dotColor,
  onEdit,
  onDelete,
  onMove,
  page,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div
      className="flex flex-col rounded-2xl border min-w-0"
      style={{
        background: "var(--card)",
        borderColor: "var(--border)",
        minHeight: "calc(100vh - 200px)",
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
      <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-y-auto">
        {cards.length === 0 ? (
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

      {/* Pagination for done column */}
      {status === "done" && totalPages !== undefined && totalPages > 1 && page !== undefined && onPageChange && (
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          <button
            className="p-1.5 rounded-lg transition-colors disabled:opacity-30 hover:bg-accent"
            style={{ color: "var(--muted-foreground)" }}
            disabled={page === 0}
            onClick={() => onPageChange(page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
            {page + 1} / {totalPages}
          </span>
          <button
            className="p-1.5 rounded-lg transition-colors disabled:opacity-30 hover:bg-accent"
            style={{ color: "var(--muted-foreground)" }}
            disabled={page === totalPages - 1}
            onClick={() => onPageChange(page + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
