import { useEffect, useMemo, useState } from "react";
import { CardModal } from "./components/common/CardModal";
import { KanbanBoard } from "./components/kanban/KanbanBoard";
import { KanbanHeader } from "./components/kanban/KanbanHeader";
import { AuthPage } from "./components/common/AuthPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { CardData, Status, User, SortMode } from "./types";
import { PRIORITY_ORDER } from "./types";
import { STORAGE_KEYS } from "./constants";

export default function App() {
  const [session, setSession] = useLocalStorage<User | null>(STORAGE_KEYS.SESSION, null);
  const [allCards, setAllCards] = useLocalStorage<CardData[]>(STORAGE_KEYS.CARDS, []);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("none");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  // Filter cards for current user only
  const cards = useMemo(
    () => allCards.filter((c) => (c as CardData & { userId?: string }).userId === session?.id),
    [allCards, session]
  );

  const cycleSortMode = () =>
    setSortMode((m) => (m === "none" ? "priority-desc" : m === "priority-desc" ? "priority-asc" : "none"));

  const sortCards = (list: CardData[]) => {
    if (sortMode === "none") return list;
    return [...list].sort((a, b) => {
      const diff = PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
      return sortMode === "priority-desc" ? diff : -diff;
    });
  };

  const todoCards = useMemo(() => sortCards(cards.filter((c) => c.status === "todo")), [cards, sortMode]);
  const inprogressCards = useMemo(() => sortCards(cards.filter((c) => c.status === "inprogress")), [cards, sortMode]);
  const doneCards = useMemo(() => sortCards(cards.filter((c) => c.status === "done")), [cards, sortMode]);

  const handleSave = (card: CardData) => {
    const cardWithUser = { ...card, userId: session!.id };
    setAllCards((prev) => {
      const idx = prev.findIndex((c) => c.id === card.id);
      if (idx === -1) return [...prev, cardWithUser];
      const next = [...prev];
      next[idx] = cardWithUser;
      return next;
    });
  };

  const handleDelete = (id: string) => {
    setAllCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleMove = (id: string, status: Status) => {
    setAllCards((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
  };

  const openCreate = () => {
    setEditingCard(null);
    setModalMode("create");
    setModalOpen(true);
  };

  const openEdit = (card: CardData) => {
    setEditingCard(card);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleLogout = () => {
    setSession(null);
  };

  if (!session) {
    return <AuthPage onAuth={(user) => setSession(user)} />;
  }

  return (
    <div className="h-screen flex flex-col" style={{ background: "var(--background)" }}>
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(124,106,245,0.1) 0%, transparent 60%)",
        }}
      />

      <KanbanHeader
        session={session}
        sortMode={sortMode}
        onSortToggle={cycleSortMode}
        onCreate={openCreate}
        onLogout={handleLogout}
        todoCount={todoCards.length}
        inprogressCount={inprogressCards.length}
        doneCount={doneCards.length}
      />

      <KanbanBoard
        todoCards={todoCards}
        inprogressCards={inprogressCards}
        doneCards={doneCards}
        onEdit={openEdit}
        onDelete={handleDelete}
        onMove={handleMove}
        isLoading={isLoading}
      />

      {modalOpen && (
        <CardModal
          card={editingCard}
          mode={modalMode}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
