/**
 * 애플리케이션 전역 상수
 */

export const STORAGE_KEYS = {
  SESSION: "kb_session",
  CARDS: "kb_cards",
  USERS: "kb_users",
} as const;

export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  DONE_PAGE_SIZE: 5,
} as const;

export const COLORS = {
  PRIMARY: "#7c6af5",
  SUCCESS: "#22c55e",
  WARNING: "#f59e0b",
  DESTRUCTIVE: "#ef4444",
  ACCENT: "rgba(124,106,245,0.12)",
} as const;

export const MODAL_DELAY = 400; // 로그인/회원가입 시뮬레이션 딜레이
