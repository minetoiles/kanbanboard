import { useState } from "react";
import { Clock, Flag, Pencil, Trash2, ArrowRight, CheckCircle2 } from "lucide-react";
import type { CardData, Status, Priority } from "../../types";
import { PRIORITY_CONFIG } from "../../types";

interface Props {
  card: CardData;
  onEdit: (card: CardData) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
}

export function KanbanCard({ card, onEdit, onDelete, onMove }: Props) {
  const [hovered, setHovered] = useState(false);
  const p = PRIORITY_CONFIG[card.priority];

  return (
    <div
      className="rounded-xl border p-4 cursor-pointer transition-all duration-200 group"
      style={{
        background: "var(--card)",
        borderColor: hovered ? "rgba(124,106,245,0.4)" : "var(--border)",
        boxShadow: hovered ? "0 4px 20px rgba(124,106,245,0.1)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onEdit(card)}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className="px-2 py-0.5 rounded-full text-xs"
          style={{ color: p.color, background: p.bg, fontWeight: 600 }}
        >
          <Flag className="inline w-3 h-3 mr-1" style={{ verticalAlign: "middle" }} />
          {p.label}
        </span>
        {/* stop propagation on action buttons */}
        <div
          className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="p-1 rounded hover:bg-accent transition-colors"
            style={{ color: "var(--muted-foreground)" }}
            onClick={() => onEdit(card)}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1 rounded hover:bg-destructive/20 transition-colors"
            style={{ color: "var(--destructive)" }}
            onClick={() => onDelete(card.id)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <h4 className="mb-1" style={{ color: "var(--foreground)", fontSize: "0.875rem", fontWeight: 500 }}>
        {card.title}
      </h4>
      {card.description && (
        <p className="text-xs mb-3 line-clamp-2" style={{ color: "var(--muted-foreground)" }}>
          {card.description}
        </p>
      )}

      {card.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {card.tags.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 rounded text-xs"
              style={{ background: "var(--accent)", color: "var(--muted-foreground)" }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
        {card.dueDate && (
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
            <Clock className="w-3 h-3" />
            {new Date(card.dueDate).toLocaleDateString("ko-KR")}
          </div>
        )}
        {card.status !== "done" && (
          <button
            className="ml-auto px-2 py-1 rounded text-xs transition-colors hover:opacity-80"
            style={{ background: "rgba(124,106,245,0.1)", color: "var(--primary)" }}
            onClick={() => {
              const nextStatus = card.status === "todo" ? "inprogress" : "done";
              onMove(card.id, nextStatus);
            }}
            title="다음 단계로 이동"
          >
            <ArrowRight className="inline w-3 h-3 mr-1" style={{ verticalAlign: "middle" }} />
            이동
          </button>
        )}
      </div>
    </div>
  );
}
