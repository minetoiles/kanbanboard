import { KanbanColumn } from "./KanbanColumn";
import type { CardData, Status, SortMode } from "../../types";

interface Props {
  todoCards: CardData[];
  inprogressCards: CardData[];
  doneCards: CardData[];
  onEdit: (card: CardData) => void;
  onDelete: (id: string) => void;
  onMove: (id: string, status: Status) => void;
  isLoading: boolean;
}

export function KanbanBoard({
  todoCards,
  inprogressCards,
  doneCards,
  onEdit,
  onDelete,
  onMove,
  isLoading,
}: Props) {
  return (
    <div
      className="relative p-6 grid gap-4 flex-1 min-h-0"
      style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gridTemplateRows: "1fr" }}
    >
      <KanbanColumn
        title="할일"
        status="todo"
        cards={todoCards}
        color="rgba(124,106,245,0.12)"
        dotColor="#7c6af5"
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        isLoading={isLoading}
      />
      <KanbanColumn
        title="진행중"
        status="inprogress"
        cards={inprogressCards}
        color="rgba(245,158,11,0.12)"
        dotColor="#f59e0b"
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        isLoading={isLoading}
      />
      <KanbanColumn
        title="완료"
        status="done"
        cards={doneCards}
        color="rgba(34,197,94,0.12)"
        dotColor="#22c55e"
        onEdit={onEdit}
        onDelete={onDelete}
        onMove={onMove}
        isLoading={isLoading}
      />
    </div>
  );
}
