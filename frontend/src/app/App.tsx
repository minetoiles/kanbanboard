import { useState, useMemo } from "react";
import { Plus, ArrowUpDown, CheckCircle2, Clock4, ListTodo, SortAsc, LogOut, User as UserIcon } from "lucide-react";
import { CardModal } from "./components/common/CardModal";
import { KanbanColumn } from "./components/kanban/KanbanColumn";
import { AuthPage } from "./components/common/AuthPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { CardData, Priority, Status, User, SortMode } from "./types";
import { STATUS_CONFIG, PRIORITY_CONFIG, PRIORITY_ORDER } from "./types";
import { STORAGE_KEYS, VALIDATION } from "./constants";

export default function App() {
  const [session, setSession] = useLocalStorage<User | null>(STORAGE_KEYS.SESSION, null);
  const [allCards, setAllCards] = useLocalStorage<CardData[]>(STORAGE_KEYS.CARDS, []);

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingCard, setEditingCard] = useState<CardData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("none");
  const [donePage, setDonePage] = useState(0);

  // Filter cards for current user only
  const cards = useMemo(
    () => allCards.filter((c) => (c as CardData & { userId?: string }).userId === session?.id),
    [allCards, session]
  );

  const cycleSortMode = () =>
    setSortMode((m) => (m === "none" ? "priority-desc" : m === "priority-desc" ? "priority-asc" : "none"));

  const sortLabel: Record<SortMode, string> = {
    none: "정렬 없음",
    "priority-desc": "우선순위 ↑",
    "priority-asc": "우선순위 ↓",
  };

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
   const doneTotalPages = Math.ceil(doneCards.length / VALIDATION.DONE_PAGE_SIZE);
   const donePageCards = doneCards.slice(donePage * VALIDATION.DONE_PAGE_SIZE, (donePage + 1) * VALIDATION.DONE_PAGE_SIZE);

  const handleSave = (card: CardData) => {
    const cardWithUser = { ...card, userId: session!.id };
    setAllCards((prev) => {
      const idx = prev.findIndex((c) => c.id === card.id);
      if (idx === -1) return [...prev, cardWithUser];
      const next = [...prev];
      next[idx] = cardWithUser;
      return next;
    });
    if (card.status === "done") setDonePage(0);
  };

  const handleDelete = (id: string) => {
    setAllCards((prev) => prev.filter((c) => c.id !== id));
  };

  const handleMove = (id: string, status: Status) => {
    setAllCards((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    if (status === "done") setDonePage(0);
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

  const stats = [
    { label: "할일", count: todoCards.length, icon: ListTodo, color: "#7c6af5", bg: "rgba(124,106,245,0.12)" },
    { label: "진행중", count: inprogressCards.length, icon: Clock4, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
    { label: "완료", count: doneCards.length, icon: CheckCircle2, color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(124,106,245,0.1) 0%, transparent 60%)",
        }}
      />

      {/* Top bar */}
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
          {/* Action row */}
          <div className="flex items-center gap-2">
            {/* User info */}
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
              onClick={cycleSortMode}
            >
              {sortMode === "none" ? <SortAsc className="w-4 h-4" /> : <ArrowUpDown className="w-4 h-4" />}
              {sortLabel[sortMode]}
            </button>

            <button
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-85"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
              onClick={openCreate}
            >
              <Plus className="w-4 h-4" />
              새 카드
            </button>

            <button
              className="p-2 rounded-lg border transition-colors hover:bg-destructive/20"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
              title="로그아웃"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-2">
            {stats.map(({ label, count, icon: Icon, color, bg }) => (
              <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: bg }}>
                <Icon className="w-3.5 h-3.5" style={{ color }} />
                <span className="text-xs" style={{ color, fontWeight: 600 }}>
                  {label} {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="relative p-6 grid gap-4" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        <KanbanColumn
          title="할일"
          status="todo"
          cards={todoCards}
          color="rgba(124,106,245,0.12)"
          dotColor="#7c6af5"
          onEdit={openEdit}
          onDelete={handleDelete}
          onMove={handleMove}
        />
        <KanbanColumn
          title="진행중"
          status="inprogress"
          cards={inprogressCards}
          color="rgba(245,158,11,0.12)"
          dotColor="#f59e0b"
          onEdit={openEdit}
          onDelete={handleDelete}
          onMove={handleMove}
        />
        <KanbanColumn
          title="완료"
          status="done"
          cards={donePageCards}
          color="rgba(34,197,94,0.12)"
          dotColor="#22c55e"
          onEdit={openEdit}
          onDelete={handleDelete}
          onMove={handleMove}
          page={donePage}
          totalPages={doneTotalPages}
          onPageChange={setDonePage}
        />
      </div>

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
