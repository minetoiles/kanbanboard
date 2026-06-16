# 📊 프로젝트 칸반 (Project Kanban)

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-8-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4)

> **Figma AI로 만든 칸반 보드 애플리케이션** ✨

개인 프로젝트의 태스크를 효율적으로 관리하세요. 할일, 진행중, 완료 상태로 자유롭게 카드를 이동하며 프로젝트를 추적합니다.

## 🎯 주요 기능

- ✅ **사용자 인증**: 회원가입 및 로그인
- 📋 **칸반 보드**: 할일 → 진행중 → 완료
- 📝 **카드 관리**: 생성, 편집, 삭제
- 🏷️ **태그 시스템**: 카드에 여러 태그 추가
- 📅 **마감일 지정**: 각 카드의 기한 설정
- 🎯 **우선순위 관리**: 높음, 보통, 낮음 (정렬 가능)
- 💾 **로컬 스토리지**: 브라우저에 자동 저장
- 📊 **통계 표시**: 각 상태별 카드 개수

## 🚀 빠른 시작

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd kanbanboard

# 의존성 설치
npm install
```

### 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 열기

### 프로덕션 빌드
```bash
npm run build
npm run preview
```

## 📁 프로젝트 구조

```
src/app/
├── App.tsx                    # 메인 컴포넌트
├── types.ts                   # ✨ 타입 정의 (중앙 관리)
├── constants.ts               # ✨ 전역 상수 (중앙 관리)
├── components/
│   ├── kanban/               # 칸반 컴포넌트
│   │   ├── KanbanCard.tsx
│   │   └── KanbanColumn.tsx
│   ├── common/               # 공용 컴포넌트
│   │   ├── AuthPage.tsx
│   │   └── CardModal.tsx
│   └── ui/                   # UI 유틸
├── hooks/
│   └── useLocalStorage.ts    # localStorage 훅
└── utils/
    └── common.ts             # ✨ 공용 함수 (중앙 관리)
```

## 📊 리팩토링 결과

| 항목 | Before | After | 개선도 |
|------|--------|-------|--------|
| UI 컴포넌트 파일 | 47개 | 2개 | **95.7% ↓** |
| 중복 코드 | 많음 | 최소화 | **↑** |
| 코드 찾기 | 어려움 | 쉬움 | **↑** |
| 유지보수성 | 낮음 | 높음 | **↑** |

### 상세 내용은 [REFACTORING.md](./REFACTORING.md) 참고

## 💡 사용 예시

### 1. 계정 생성 & 로그인
- 회원가입: 이름, 이메일, 비밀번호 입력
- 로그인: 이메일과 비밀번호로 접속
- 모든 데이터는 사용자별로 분리되어 저장됨

### 2. 카드 생성
```
클릭: [+ 새 카드] 버튼
입력: 제목, 설명, 우선순위, 마감일, 태그
결과: 할일 컬럼에 카드 생성
```

### 3. 카드 이동
```
클릭: 카드의 [이동] 버튼
상태: todo → inprogress → done
```

### 4. 정렬 기능
```
클릭: [정렬 없음] → [우선순위 ↑] → [우선순위 ↓]
정렬 순서: 높음(빨강) → 보통(노랑) → 낮음(녹색)
```

## 🛠 기술 스택

### Frontend
- **React 18**: 최신 React 기능 활용
- **TypeScript 5**: 타입 안전성 보장
- **Vite 8**: 초고속 번들러
- **Tailwind CSS 3**: 유틸리티 기반 스타일
- **Lucide React**: 현대적인 아이콘

### 상태 관리
- **React Hooks**: useState, useMemo, useEffect
- **Custom Hook**: useLocalStorage
- **LocalStorage API**: 브라우저 로컬 저장

## 📝 주요 기능 상세

### 🔐 인증 시스템
- 로그인/회원가입 탭 전환
- 비밀번호 최소 6자 검증
- 중복 이메일 방지
- 세션 유지 (localStorage)

### 📋 칸반 보드
- **3개 컬럼**: 할일, 진행중, 완료
- **동적 카운팅**: 각 컬럼의 카드 개수 표시
- **완료 탭 페이지네이션**: 완료된 항목 5개씩 표시
- **카드별 조작**: 편집, 삭제, 상태 변경

### 📊 카드 속성
- **제목**: 필수 입력
- **설명**: 선택 입력
- **우선순위**: 높음(빨강), 보통(노랑), 낮음(초록)
- **상태**: 자유로운 이동
- **마감일**: 날짜 선택
- **태그**: 여러 개 추가/제거 가능

## 💾 로컬 스토리지 구조

```javascript
localStorage {
  kb_session: {id, email, name},
  kb_cards: [{id, title, description, status, priority, ...}],
  kb_users: [{id, email, name, password}]
}
```

## 📚 문서

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 상세 구조 및 개발 가이드
- [REFACTORING.md](./REFACTORING.md) - 리팩토링 내용 및 개선사항

## 🚀 향후 계획

- [ ] 드래그 앤 드롭 기능
- [ ] 댓글 및 활동 로그
- [ ] 팀 협업 기능
- [ ] 실시간 동기화 (백엔드 연동)
- [ ] 필터링 고급 기능
- [ ] 다크/라이트 테마 전환
- [ ] 내보내기 (CSV, PDF)

## 👨‍💻 개발 정보

### 설치 및 실행
```bash
# 프로젝트 설정
npm install

# 개발 모드 실행
npm run dev

# 빌드
npm run build

# 프로덕션 미리보기
npm run preview

# 린트 검사
npm run lint
```

### 환경 요구사항
- Node.js 16+ (권장 18+)
- npm 7+ 또는 yarn 3+
- 최신 브라우저 (Chrome, Firefox, Safari, Edge)

## 📄 라이선스

MIT License - 자유롭게 사용하세요!

---

**즐거운 개발 되세요!** 🎉

질문이나 제안이 있으면 이슈를 열어주세요 👍
