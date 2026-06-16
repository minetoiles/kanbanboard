/**
 * 칸반 보드 타입 정의
 */

export type Priority = "high" | "medium" | "low";
export type Status = "todo" | "inprogress" | "done";

export interface CardData {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate?: string;
  tags: string[];
  createdAt: string;
  userId?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export type SortMode = "none" | "priority-desc" | "priority-asc";

export const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  high: { label: "높음", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  medium: { label: "보통", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  low: { label: "낮음", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
};

export const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string }> = {
  todo: { label: "할일", color: "#7c6af5", bg: "rgba(124,106,245,0.12)" },
  inprogress: { label: "진행중", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  done: { label: "완료", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
};

export const PRIORITY_ORDER: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};
