# 📁 Kanban Board - 프로젝트 구조 가이드

## 프로젝트 레이아웃

```
kanbanboard/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # 메인 앱 컴포넌트
│   │   ├── types.ts                   # 타입 정의 모음 ⭐
│   │   ├── constants.ts               # 전역 상수 모음 ⭐
│   │   ├── components/
│   │   │   ├── kanban/                # 칸반 기능 컴포넌트
│   │   │   │   ├── KanbanCard.tsx     # 개별 카드 UI
│   │   │   │   └── KanbanColumn.tsx   # 컬럼 (할일/진행중/완료)
│   │   │   ├── common/                # 공용 컴포넌트
│   │   │   │   ├── AuthPage.tsx       # 로그인/회원가입
│   │   │   │   └── CardModal.tsx      # 카드 추가/편집 모달
│   │   │   ├── figma/                 # 피그마 이미지 컴포넌트
│   │   │   │   └── ImageWithFallback.tsx
│   │   │   └── ui/                    # UI 유틸
│   │   │       ├── utils.ts           # 스타일 클래스 유틸
│   │   │       └── use-mobile.ts      # 모바일 반응형 훅
│   │   ├── hooks/
│   │   │   └── useLocalStorage.ts     # localStorage 커스텀 훅
│   │   └── utils/
│   │       └── common.ts              # 공용 유틸리티 함수 ⭐
│   ├── styles/
│   │   ├── globals.css
│   │   ├── fonts.css
│   │   ├── theme.css
│   │   ├── index.css
│   │   └── tailwind.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── eslint.config.js
├── postcss.config.mjs
├── tailwind.config.ts
├── package.json
└── REFACTORING.md                     # 리팩토링 가이드 ⭐
```

## 핵심 파일 설명

### 📌 `types.ts` - 타입 안전성의 중심

```typescript
// 우선순위 및 상태 정의
export type Priority = "high" | "medium" | "low";
export type Status = "todo" | "inprogress" | "done";

// 카드 데이터 인터페이스
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

// 사용자 인터페이스
export interface User {
  id: string;
  email: string;
  name: string;
}

// 설정 맵
export const PRIORITY_CONFIG = { high: {...}, medium: {...}, low: {...} };
export const STATUS_CONFIG = { todo: {...}, inprogress: {...}, done: {...} };
export const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
```

### 📌 `constants.ts` - 매직 스트링 제거

```typescript
// 스토리지 키 관리
export const STORAGE_KEYS = {
  SESSION: "kb_session",
  CARDS: "kb_cards",
  USERS: "kb_users",
};

// 검증 규칙
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 6,
  DONE_PAGE_SIZE: 5,
};

// 색상 정의
export const COLORS = {
  PRIMARY: "#7c6af5",
  SUCCESS: "#22c55e",
  WARNING: "#f59e0b",
  DESTRUCTIVE: "#ef4444",
};
```

### 📌 `utils/common.ts` - 공용 함수

```typescript
export const generateUUID = () => crypto.randomUUID();

export const getFormattedDate = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ko-KR", {...});
};

export const getRelativeTime = (dateString: string) => {
  // "방금", "5분 전", "2시간 전" 형식으로 변환
  const diff = new Date().getTime() - new Date(dateString).getTime();
  // ...
};
```

## 컴포넌트별 책임

### `KanbanCard.tsx`
- ✅ 개별 카드 렌더링
- ✅ 카드 호버 효과
- ✅ 편집/삭제 버튼
- ✅ 우선순위 뱃지
- ✅ 태그 표시
- ✅ 마감일 표시

### `KanbanColumn.tsx`
- ✅ 컬럼 레이아웃
- ✅ 카드 목록 표시
- ✅ 완료 탭 페이지네이션
- ✅ 카드 개수 표시

### `AuthPage.tsx`
- ✅ 로그인 폼
- ✅ 회원가입 폼
- ✅ 유효성 검증
- ✅ localStorage에 사용자 저장

### `CardModal.tsx`
- ✅ 카드 생성 모달
- ✅ 카드 편집 모달
- ✅ 폼 검증
- ✅ 태그 관리

## 데이터 플로우

```
App.tsx (상태 관리)
  ├── useState (session, allCards, modalMode, etc.)
  ├── useLocalStorage (localStorage 동기화)
  └── useMemo (필터링 및 정렬)
      │
      ├─→ KanbanColumn (3개)
      │    └─→ KanbanCard (여러 개)
      │         ├─ onEdit → CardModal 열기
      │         ├─ onDelete → 카드 삭제
      │         └─ onMove → 상태 변경
      │
      ├─→ CardModal
      │    └─ onSave → allCards 업데이트
      │
      └─→ AuthPage
           └─ onAuth → session 설정
```

## 상태 관리 전략

### LocalStorage 구조
```json
{
  "kb_session": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "홍길동"
  },
  "kb_cards": [
    {
      "id": "card-uuid",
      "title": "카드 제목",
      "status": "todo",
      "priority": "high",
      "userId": "user-uuid",
      ...
    }
  ],
  "kb_users": [
    {
      "id": "user-uuid",
      "email": "user@example.com",
      "name": "홍길동",
      "password": "hashed_password"
    }
  ]
}
```

## 스타일 시스템

### CSS 변수 (theme.css)
```css
--primary: #7c6af5
--background: var(--background)
--card: var(--card)
--border: var(--border)
--foreground: var(--foreground)
--muted-foreground: var(--muted-foreground)
--input-background: var(--input-background)
--accent: var(--accent)
--destructive: var(--destructive)
```

### Tailwind 클래스 활용
- `rounded-xl`, `p-4` - 기본 간격
- `transition-all duration-200` - 애니메이션
- `hover:opacity-80` - 호버 효과
- `disabled:opacity-30` - 비활성 상태

## 개발 팁

### ✅ 새 기능 추가 시
1. 타입을 `types.ts`에 먼저 정의
2. 상수를 `constants.ts`에 추가
3. 컴포넌트 생성 (적절한 폴더에)
4. App.tsx에서 import 및 사용

### ✅ 스타일링
- 인라인 style prop 사용 (CSS 변수 활용)
- Tailwind 클래스 우선 사용
- 반복되는 스타일은 CSS 변수로 추출

### ✅ 성능 최적화
- useMemo로 불필요한 재계산 방지
- 대용량 리스트는 가상화 고려
- 이미지는 ImageWithFallback 사용

## 빌드 & 배포

```bash
# 개발
npm run dev      # http://localhost:5173

# 프로덕션 빌드
npm run build    # dist/ 폴더 생성

# 빌드 결과물 미리보기
npm run preview
```

---

**구조가 명확하면 유지보수가 쉬워집니다!** 🎯
