import { useEffect, useState } from "react";
import { X, Tag, Calendar } from "lucide-react";
import type { CardData, Priority, Status } from "../../types";
import { generateUUID } from "../../utils/common";

interface Props {
  card: CardData | null;
  mode: "create" | "edit";
  onClose: () => void;
  onSave: (card: CardData) => void;
}

const emptyCard = (): CardData => ({
  id: generateUUID(),
  title: "",
  description: "",
  priority: "medium",
  status: "todo",
  dueDate: "",
  tags: [],
  createdAt: new Date().toISOString().slice(0, 10),
});

export function CardModal({ card, mode, onClose, onSave }: Props) {
  const [form, setForm] = useState<CardData>(card ?? emptyCard());
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    setForm(card ?? emptyCard());
    setTagInput("");
  }, [card]);

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !form.tags.includes(t)) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }));
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl"
        style={{ background: "var(--popover)", borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 style={{ color: "var(--foreground)" }}>{mode === "create" ? "새 카드 추가" : "카드 편집"}</h2>
          <button
            className="p-1.5 rounded-lg transition-colors hover:bg-accent"
            style={{ color: "var(--muted-foreground)" }}
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
              제목 *
            </label>
            <input
              className="w-full px-3 py-2 rounded-lg border outline-none transition-colors focus:border-primary text-sm"
              style={{
                background: "var(--input-background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="카드 제목 입력..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
              설명
            </label>
            <textarea
              className="w-full px-3 py-2 rounded-lg border outline-none transition-colors focus:border-primary text-sm resize-none"
              style={{
                background: "var(--input-background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
              rows={3}
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="카드 설명 입력..."
            />
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                우선순위
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border outline-none text-sm cursor-pointer"
                style={{
                  background: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                value={form.priority}
                onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value as Priority }))}
              >
                <option value="high">🔴 높음</option>
                <option value="medium">🟡 보통</option>
                <option value="low">🟢 낮음</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
                상태
              </label>
              <select
                className="w-full px-3 py-2 rounded-lg border outline-none text-sm cursor-pointer"
                style={{
                  background: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Status }))}
              >
                <option value="todo">할일</option>
                <option value="inprogress">진행중</option>
                <option value="done">완료</option>
              </select>
            </div>
          </div>

          {/* Due date */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
              <Calendar className="inline w-3.5 h-3.5 mr-1" />
              마감일
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 rounded-lg border outline-none text-sm"
              style={{
                background: "var(--input-background)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
                colorScheme: "dark",
              }}
              value={form.dueDate}
              onChange={(e) => setForm((f) => ({ ...f, dueDate: e.target.value }))}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: "var(--muted-foreground)" }}>
              <Tag className="inline w-3.5 h-3.5 mr-1" />
              태그
            </label>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 px-3 py-2 rounded-lg border outline-none text-sm"
                style={{
                  background: "var(--input-background)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                }}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="태그 입력 후 Enter..."
              />
              <button
                type="button"
                className="px-3 py-2 rounded-lg text-sm transition-colors hover:opacity-80"
                style={{ background: "var(--accent)", color: "var(--foreground)" }}
                onClick={addTag}
              >
                추가
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {form.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs"
                    style={{ background: "var(--accent)" }}
                  >
                    <span style={{ color: "var(--foreground)" }}>{tag}</span>
                    <button
                      type="button"
                      className="hover:opacity-70 transition-opacity"
                      onClick={() => removeTag(tag)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-6">
            <button
              type="button"
              className="flex-1 px-4 py-2 rounded-lg text-sm transition-colors hover:bg-accent"
              style={{ color: "var(--muted-foreground)" }}
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-sm transition-colors hover:opacity-90"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontWeight: 600 }}
            >
              {mode === "create" ? "생성" : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
