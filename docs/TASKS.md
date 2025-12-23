# 구현 작업 목록 (TASKS)
# Engineering Calculator Implementation Tasks

**기준 문서**: [PRD](./prd.md) | [Tech Spec](./tech-spec.md)  
**개발 규칙**: [TDD](./rules/tdd.md) | [SOLID](./rules/solid.md)  
**마지막 업데이트**: 2025-12-23

---

## 📋 작업 개요

이 문서는 PRD의 기능 요구사항(FR-1 ~ FR-28)을 기반으로 실제 구현 작업을 정의합니다.

**진행 상황**: 
- ✅ 완료: 0개
- 🔄 진행중: 0개  
- ⏳ 대기중: 33개

---

## 🎯 Phase 1: 프로젝트 초기화

### TASK-001: 개발 환경 설정
**우선순위**: P0  
**예상 시간**: 2-3시간  
**의존성**: 없음

**작업 내용**:
- [ ] Vite 프로젝트 초기화 (`npm create vite@latest . -- --template react-ts`)
- [ ] 의존성 설치
  - [ ] `zustand` (상태 관리)
  - [ ] `mathjs` (계산 엔진)
  - [ ] `@tanstack/react-virtual` (가상 스크롤)
  - [ ] `react-router-dom` (라우팅)
- [ ] 개발 도구 설정
  - [ ] ESLint 설정
  - [ ] Prettier 설정
  - [ ] Husky + lint-staged (pre-commit hooks)
- [ ] Vitest 테스트 환경 설정
  - [ ] `vitest` 설치
  - [ ] `@testing-library/react` 설치
  - [ ] `@testing-library/jest-dom` 설치
  - [ ] `vitest.config.ts` 작성

**인수 조건**:
- `npm run dev` 실행 시 개발 서버 정상 동작
- `npm run test` 실행 시 테스트 러너 정상 동작
- `npm run lint` 실행 시 린터 정상 동작

**관련 FR**: 없음

---

### TASK-002: Tailwind CSS 설정
**우선순위**: P0  
**예상 시간**: 2시간  
**의존성**: TASK-001

**작업 내용**:
- [ ] Tailwind CSS 설치 및 설정
- [ ] `tailwind.config.ts` 작성
  - [ ] 커스텀 컬러 정의 (primary: #4B5EFC 등)
  - [ ] 폰트 패밀리 설정 (Space Grotesk, Noto Sans)
  - [ ] Border radius 커스텀
  - [ ] 다크 모드 설정 (`darkMode: 'class'`)
- [ ] `src/index.css` 작성
  - [ ] Tailwind directives
  - [ ] CSS 변수 정의
  - [ ] 글로벌 스타일
- [ ] 커스텀 플러그인 작성
  - [ ] `.calc-btn` 유틸리티
  - [ ] `.no-scrollbar` 유틸리티

**인수 조건**:
- Tailwind 클래스가 정상 적용됨
- 다크 모드 토글 시 색상 변경 확인
- 커스텀 컬러 사용 가능

**관련 FR**: FR-23 (다크 모드)

---

### TASK-003: 프로젝트 구조 생성
**우선순위**: P0  
**예상 시간**: 1시간  
**의존성**: TASK-001

**작업 내용**:
- [ ] 디렉토리 구조 생성
  ```
  src/
  ├── components/
  │   ├── common/
  │   ├── calculator/
  │   ├── history/
  │   └── converter/
  ├── hooks/
  ├── lib/
  │   ├── calculator/
  │   ├── converter/
  │   └── storage/
  ├── store/
  ├── types/
  ├── utils/
  └── pages/
  tests/
  ├── unit/
  └── integration/
  ```
- [ ] TypeScript 경로 별칭 설정 (`@/` → `src/`)
- [ ] Vite 설정 파일 작성 (`vite.config.ts`)
  - [ ] Base path 설정 (`/calculator/`)
  - [ ] 경로 별칭 설정

**인수 조건**:
- 모든 디렉토리 생성 완료
- `@/` 경로 별칭 정상 동작

**관련 FR**: 없음

---

## 🧮 Phase 2: 계산 엔진 (TDD)

> **중요**: 모든 코어 로직은 TDD로 구현. 테스트 먼저 작성!

### TASK-004: 기본 계산 엔진 인터페이스 정의
**우선순위**: P0  
**예상 시간**: 1시간  
**의존성**: TASK-003  
**브랜치**: `feature/calculator-interfaces`

**작업 내용**:
- [ ] `src/lib/calculator/interfaces/Evaluator.ts` 작성
  ```typescript
  export interface Evaluator {
    evaluate(expression: string): number;
  }
  ```
- [ ] `src/lib/calculator/interfaces/Formatter.ts` 작성
- [ ] `src/lib/calculator/interfaces/Validator.ts` 작성
- [ ] `src/types/calculator.ts` 작성 (공통 타입)

**인수 조건**:
- 모든 인터페이스 파일 생성
- TypeScript 컴파일 에러 없음

**관련 FR**: FR-1, FR-2, FR-3

---

### TASK-005: 기본 사칙연산 구현 (TDD)
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-004  
**브랜치**: `feature/basic-calculator-engine`

**작업 내용** (TDD 순서):

**🔴 RED - 테스트 작성**:
- [ ] `tests/unit/calculator/engine.test.ts` 생성
- [ ] 덧셈 테스트 작성
  ```typescript
  it('should add two numbers', () => {
    expect(evaluateExpression('2 + 3')).toBe(5);
  });
  ```
- [ ] 뺄셈, 곱셈, 나눗셈 테스트 작성
- [ ] 소수점 계산 테스트
- [ ] 연산 우선순위 테스트 (`2 + 3 * 4 = 14`)
- [ ] 괄호 테스트 (`(2 + 3) * 4 = 20`)
- [ ] 0으로 나누기 테스트
- [ ] 테스트 실행 → 실패 확인 ❌

**🟢 GREEN - 최소 구현**:
- [ ] `src/lib/calculator/implementations/MathJsEvaluator.ts` 작성
- [ ] Math.js `evaluate` 함수 통합
- [ ] 에러 처리 추가
- [ ] 테스트 실행 → 통과 확인 ✅

**🔵 REFACTOR - 리팩토링**:
- [ ] 코드 정리 및 최적화
- [ ] JSDoc 주석 추가
- [ ] 테스트 재실행 → 통과 확인 ✅

**인수 조건**:
- 모든 테스트 통과
- 테스트 커버리지 > 90%
- `1,234 + 56 = 1,290` 정확도 검증

**관련 FR**: FR-1, FR-2, FR-3, FR-10

---

### TASK-006: 공학 함수 계산 구현 (TDD)
**우선순위**: P0  
**예상 시간**: 6-8시간  
**의존성**: TASK-005  
**브랜치**: `feature/scientific-functions`

**작업 내용** (TDD 순서):

**🔴 RED - 테스트 작성**:
- [ ] `tests/unit/calculator/scientific.test.ts` 생성
- [ ] 삼각함수 테스트 (DEG 모드)
  ```typescript
  it('should calculate sin(30) in DEG mode', () => {
    expect(evaluateExpression('sin(30)', 'DEG')).toBeCloseTo(0.5);
  });
  ```
- [ ] 삼각함수 테스트 (RAD 모드)
- [ ] 역삼각함수 테스트
- [ ] 로그 함수 테스트 (`ln`, `log`)
- [ ] 거듭제곱 테스트 (`x²`, `xʸ`, `√`)
- [ ] 팩토리얼 테스트
- [ ] 상수 테스트 (`π`, `e`)
- [ ] 테스트 실행 → 실패 확인 ❌

**🟢 GREEN - 구현**:
- [ ] `src/lib/calculator/ScientificEvaluator.ts` 작성
- [ ] 각도 변환 로직 (DEG → RAD)
- [ ] Math.js 함수 매핑
- [ ] 2nd 함수 매핑 구현
- [ ] 테스트 실행 → 통과 확인 ✅

**🔵 REFACTOR**:
- [ ] 함수 매핑 최적화
- [ ] 에러 메시지 개선
- [ ] 테스트 재실행 ✅

**인수 조건**:
- `sin(30) = 0.5` (DEG 모드)
- `sin(π/6) = 0.5` (RAD 모드)
- `log(100) = 2`
- `5^2 = 25`
- 모든 테스트 통과

**관련 FR**: FR-4, FR-5, FR-6, FR-7

---

### TASK-007: 숫자 포매터 구현 (TDD)
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-004  
**브랜치**: `feature/number-formatter`

**작업 내용** (TDD 순서):

**🔴 RED - 테스트 작성**:
- [ ] `tests/unit/calculator/formatter.test.ts` 생성
- [ ] 천 단위 구분자 테스트
  ```typescript
  it('should format number with thousands separator', () => {
    expect(formatNumber(1234567)).toBe('1,234,567');
  });
  ```
- [ ] 소수점 자릿수 테스트
- [ ] 후행 0 제거 테스트
- [ ] 과학적 표기법 테스트
- [ ] 매우 큰/작은 숫자 테스트

**🟢 GREEN - 구현**:
- [ ] `src/lib/calculator/implementations/NumberFormatter.ts` 작성
- [ ] 포매팅 로직 구현

**🔵 REFACTOR**:
- [ ] 성능 최적화
- [ ] 엣지 케이스 처리

**인수 조건**:
- `1234567 → "1,234,567"`
- `3.14159 → "3.14"` (소수점 2자리)
- `5.0 → "5"` (후행 0 제거)

**관련 FR**: FR-3

---

### TASK-008: 수식 검증기 구현 (TDD)
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-004  
**브랜치**: `feature/expression-validator`

**작업 내용** (TDD 순서):

**🔴 RED - 테스트 작성**:
- [ ] `tests/unit/calculator/validator.test.ts` 생성
- [ ] 유효한 수식 테스트
- [ ] 괄호 매칭 테스트
- [ ] 연속 연산자 검증 (`2 + + 3` → 에러)
- [ ] 위험한 패턴 검증 (XSS 방지)

**🟢 GREEN - 구현**:
- [ ] `src/lib/calculator/implementations/ExpressionValidator.ts` 작성
- [ ] 검증 로직 구현

**인수 조건**:
- 유효한 수식 통과
- 잘못된 수식 거부
- XSS 패턴 차단

**관련 FR**: FR-10

---

## 🔄 Phase 3: 단위 변환기 (TDD)

### TASK-009: 단위 변환 엔진 구현 (TDD)
**우선순위**: P0  
**예상 시간**: 5-6시간  
**의존성**: TASK-003  
**브랜치**: `feature/unit-converter`

**작업 내용** (TDD 순서):

**🔴 RED - 테스트 작성**:
- [ ] `tests/unit/converter/converter.test.ts` 생성
- [ ] 길이 변환 테스트
  ```typescript
  it('should convert meters to feet', () => {
    expect(convert(100, 'meters', 'feet')).toBeCloseTo(328.084);
  });
  ```
- [ ] 질량 변환 테스트
- [ ] 온도 변환 테스트 (특수 공식)
- [ ] 시간 변환 테스트
- [ ] 부피 변환 테스트

**🟢 GREEN - 구현**:
- [ ] `src/lib/converter/interfaces/UnitConverter.ts` 작성
- [ ] `src/lib/converter/implementations/MathJsConverter.ts` 작성
- [ ] `src/lib/converter/units.ts` (단위 정의)

**🔵 REFACTOR**:
- [ ] 단위 정의 최적화
- [ ] 변환 정확도 개선

**인수 조건**:
- `100m = 328.084ft`
- `1kg = 2.20462lb`
- `0°C = 32°F`
- 모든 카테고리 테스트 통과

**관련 FR**: FR-18, FR-19, FR-20

---

## 💾 Phase 4: 저장소 계층 (TDD)

### TASK-010: 로컬 스토리지 추상화 (TDD)
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-003  
**브랜치**: `feature/storage-layer`

**작업 내용** (TDD 순서):

**🔴 RED - 테스트 작성**:
- [ ] `tests/unit/storage/localStorage.test.ts` 생성
- [ ] 데이터 저장 테스트
- [ ] 데이터 불러오기 테스트
- [ ] 데이터 삭제 테스트
- [ ] JSON 직렬화 테스트
- [ ] 에러 처리 테스트

**🟢 GREEN - 구현**:
- [ ] `src/lib/storage/interfaces/Repository.ts` 작성
- [ ] `src/lib/storage/implementations/LocalStorageRepository.ts` 작성
- [ ] `src/lib/storage/implementations/MemoryRepository.ts` (테스트용)

**인수 조건**:
- localStorage mock 테스트 통과
- 에러 처리 정상 동작

**관련 FR**: FR-11

---

### TASK-011: 히스토리 관리자 구현 (TDD)
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-010  
**브랜치**: `feature/history-manager`

**작업 내용** (TDD 순서):

**🔴 RED - 테스트 작성**:
- [ ] `tests/unit/storage/historyManager.test.ts` 생성
- [ ] 히스토리 추가 테스트
- [ ] 날짜별 그룹화 테스트
- [ ] 검색 기능 테스트
- [ ] 최대 개수 제한 테스트 (1000개)
- [ ] 정렬 테스트 (최신순)

**🟢 GREEN - 구현**:
- [ ] `src/lib/storage/HistoryManager.ts` 작성
- [ ] 날짜 그룹화 로직
- [ ] 검색 알고리즘

**인수 조건**:
- 히스토리 자동 저장
- 날짜별 그룹화 (Today, Yesterday, 날짜)
- 검색 기능 동작
- 1000개 제한 적용

**관련 FR**: FR-11, FR-12, FR-13, FR-14

---

## 🗂️ Phase 5: 상태 관리 (Zustand)

### TASK-012: Calculator Store 구현
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-005, TASK-006  
**브랜치**: `feature/calculator-store`

**작업 내용**:
- [ ] `src/store/calculatorStore.ts` 작성
- [ ] 상태 정의
  - [ ] `expression`: string
  - [ ] `result`: number | string
  - [ ] `memory`: number
  - [ ] `angleMode`: 'DEG' | 'RAD'
  - [ ] `secondMode`: boolean
  - [ ] `error`: string | null
- [ ] 액션 정의
  - [ ] `appendValue(value: string)`
  - [ ] `calculate()`
  - [ ] `clear()`
  - [ ] `backspace()`
  - [ ] `toggleAngleMode()`
  - [ ] `toggleSecondMode()`
  - [ ] 메모리 함수 (MR, M+, M-, MC)
- [ ] Persist 미들웨어 설정

**인수 조건**:
- Store 정상 동작
- localStorage 동기화
- 메모리 기능 동작

**관련 FR**: FR-1~FR-10

---

### TASK-013: History Store 구현
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-011  
**브랜치**: `feature/history-store`

**작업 내용**:
- [ ] `src/store/historyStore.ts` 작성
- [ ] 상태 정의
  - [ ] `entries`: HistoryEntry[]
  - [ ] `searchQuery`: string
- [ ] 액션 정의
  - [ ] `addEntry(entry)`
  - [ ] `removeEntry(id)`
  - [ ] `clearAll()`
  - [ ] `setSearchQuery(query)`
  - [ ] `getFilteredEntries()`

**인수 조건**:
- 히스토리 CRUD 동작
- 검색 필터링 동작

**관련 FR**: FR-11~FR-15

---

### TASK-014: Settings Store 구현
**우선순위**: P1  
**예상 시간**: 2-3시간  
**의존성**: TASK-003  
**브랜치**: `feature/settings-store`

**작업 내용**:
- [ ] `src/store/settingsStore.ts` 작성
- [ ] 상태 정의
  - [ ] `theme`: 'light' | 'dark'
  - [ ] `decimalPlaces`: number
  - [ ] `thousandsSeparator`: boolean
- [ ] 액션 정의
  - [ ] `setTheme(theme)`
  - [ ] `setDecimalPlaces(places)`
  - [ ] `toggleThousandsSeparator()`

**인수 조건**:
- 설정 저장/불러오기 동작
- 테마 변경 시 DOM 클래스 업데이트

**관련 FR**: FR-23, FR-24

---

## 🎨 Phase 6: UI 컴포넌트

> **중요**: UI 컴포넌트는 TDD 제외. **자동화 테스트 작성하지 않음**. 수동 테스트만 수행.

### TASK-015: Button 컴포넌트
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-002  
**브랜치**: `feature/ui-button`

**작업 내용**:
- [ ] `src/components/common/Button/Button.tsx` 작성
- [ ] Props 정의
  - [ ] `variant`: 'number' | 'operator' | 'function' | 'special'
  - [ ] `value`: string
  - [ ] `onClick`: (value: string) => void
  - [ ] `icon`: string (Material Symbol)
- [ ] 스타일링
  - [ ] Variant별 색상
  - [ ] 호버/액티브 애니메이션
  - [ ] 아이콘 지원

**테스트 방법**:
- ✅ 브라우저에서 수동 테스트
- ✅ 각 variant 시각적 확인
- ✅ 클릭 동작 확인
- ❌ 자동화 테스트 작성하지 않음

**인수 조건**:
- 모든 variant 정상 렌더링
- 클릭 이벤트 동작
- 애니메이션 적용 (active:scale-95)

**관련 FR**: FR-25

---

### TASK-016: Display 컴포넌트
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-007  
**브랜치**: `feature/ui-display`

**작업 내용**:
- [ ] `src/components/common/Display/Display.tsx` 작성
- [ ] Props 정의
  - [ ] `expression`: string
  - [ ] `result`: string | number
  - [ ] `error`: string
- [ ] 레이아웃
  - [ ] 수식 표시 (상단, 작은 폰트)
  - [ ] 결과 표시 (하단, 큰 폰트)
  - [ ] 에러 표시
- [ ] 숫자 포매팅 적용

**인수 조건**:
- 수식/결과 정상 표시
- 오버플로우 처리
- 에러 메시지 표시

**관련 FR**: FR-1

---

### TASK-017: Keypad 컴포넌트
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-015  
**브랜치**: `feature/keypad-component`

**작업 내용**:
- [ ] `src/components/calculator/Keypad/Keypad.tsx` 작성
- [ ] 버튼 레이아웃 구성 (4x4 그리드)
- [ ] 버튼 클릭 이벤트 핸들러
- [ ] Props 인터페이스 정의
  - [ ] `onButtonClick: (value: string) => void`
  - [ ] `disabled: boolean`

**인수 조건**:
- 모든 버튼 정상 렌더링
- 클릭 이벤트 전달
- 반응형 그리드 레이아웃

**관련 FR**: FR-1~FR-3

---

### TASK-018: Standard Calculator 페이지
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-017, TASK-016, TASK-012  
**브랜치**: `feature/standard-calculator`

**작업 내용**:
- [ ] `src/pages/StandardPage.tsx` 작성
- [ ] 레이아웃 구성
  - [ ] Header (모드 표시)
  - [ ] Display 컴포넌트 통합
  - [ ] Keypad 컴포넌트 통합
- [ ] Store 연동
- [ ] 계산 로직 연결

**인수 조건**:
- 기본 계산 동작
- 실시간 결과 표시
- 히스토리 자동 저장

**관련 FR**: FR-1~FR-3

---

### TASK-019: FunctionGrid 컴포넌트
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-015  
**브랜치**: `feature/function-grid`

**작업 내용**:
- [ ] `src/components/calculator/FunctionGrid/FunctionGrid.tsx` 작성
- [ ] `src/components/calculator/ModeSelector/ModeSelector.tsx` 작성
- [ ] 공학 함수 버튼 그리드 (4x4)
- [ ] DEG/RAD 토글 컴포넌트
- [ ] 2nd 버튼 컴포넌트
- [ ] 함수 버튼 매핑
  - [ ] 삼각함수 (sin, cos, tan)
  - [ ] 로그 함수 (ln, log)
  - [ ] 거듭제곱 (x², xʸ, √)

**인수 조건**:
- 모든 함수 버튼 렌더링
- DEG/RAD 토글 동작
- 2nd 함수 전환 동작

**관련 FR**: FR-4~FR-9

---

### TASK-020: Scientific Calculator 페이지
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-019, TASK-016, TASK-012  
**브랜치**: `feature/scientific-calculator`

**작업 내용**:
- [ ] `src/pages/ScientificPage.tsx` 작성
- [ ] 레이아웃 구성
  - [ ] Header (뒤로가기)
  - [ ] Function Input
  - [ ] FunctionGrid 컴포넌트 통합
  - [ ] ModeSelector 컴포넌트 통합
  - [ ] Return 버튼
- [ ] Store 연동
- [ ] 공학 계산 로직 연결

**인수 조건**:
- 모든 공학 함수 동작
- DEG/RAD 전환 동작
- 2nd 함수 토글 동작
- 메모리 기능 동작

**관련 FR**: FR-4~FR-9

---

### TASK-021: HistoryList 컴포넌트 (가상 스크롤)
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-013  
**브랜치**: `feature/history-list`

**작업 내용**:
- [ ] `src/components/history/HistoryList/HistoryList.tsx` 작성
- [ ] `src/components/history/HistoryItem/HistoryItem.tsx` 작성
- [ ] `src/components/history/SearchBar/SearchBar.tsx` 작성
- [ ] 가상 스크롤 적용 (@tanstack/react-virtual)
- [ ] 날짜별 그룹화 로직
- [ ] 검색 필터링 기능

**인수 조건**:
- 가상 스크롤 동작
- 날짜별 그룹화 표시
- 검색 기능 동작
- 1000개 이상 항목 성능 테스트

**관련 FR**: FR-11~FR-15

---

### TASK-022: History 페이지
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-021  
**브랜치**: `feature/history-page`

**작업 내용**:
- [ ] `src/pages/HistoryPage.tsx` 작성
- [ ] 레이아웃 구성
  - [ ] Header (Clear 버튼)
  - [ ] SearchBar 컴포넌트 통합
  - [ ] HistoryList 컴포넌트 통합
  - [ ] FAB (계산기 이동)
  - [ ] BottomNav
- [ ] Store 연동
- [ ] 항목 클릭 시 계산식 로드
- [ ] Clear All 기능

**인수 조건**:
- 날짜별 그룹화 표시
- 검색 동작
- 항목 클릭 시 계산식 로드
- Clear All 동작
- 가상 스크롤 동작

**관련 FR**: FR-11~FR-15

---

### TASK-023: ConversionCard 컴포넌트
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-009  
**브랜치**: `feature/conversion-card`

**작업 내용**:
- [ ] `src/components/converter/ConversionCard/ConversionCard.tsx` 작성
- [ ] `src/components/converter/CategoryTabs/CategoryTabs.tsx` 작성
- [ ] Input/Result 카드 UI
- [ ] 단위 드롭다운 컴포넌트
- [ ] 스왈 버튼 컴포넌트
- [ ] 실시간 변환 로직
- [ ] 복사 기능

**인수 조건**:
- Input/Result 카드 렌더링
- 단위 선택 동작
- 스왈 기능 동작
- 실시간 변환 표시

**관련 FR**: FR-18~FR-21

---

### TASK-024: Unit Converter 페이지
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-023  
**브랜치**: `feature/converter-page`

**작업 내용**:
- [ ] `src/pages/ConverterPage.tsx` 작성
- [ ] `src/components/converter/UnitConverter/UnitConverter.tsx` 작성
- [ ] 레이아웃 구성
  - [ ] Header
  - [ ] CategoryTabs 컴포넌트 통합 (가로 스크롤)
  - [ ] ConversionCard 컴포넌트 통합
  - [ ] Keypad
- [ ] Store 연동
- [ ] 카테고리 전환 로직

**인수 조건**:
- 5개 카테고리 전환 동작
- 실시간 변환 동작
- 스왈 기능 동작
- 복사 기능 동작

**관련 FR**: FR-18~FR-21

---

### TASK-025: Navigation & Layout
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-018, TASK-020, TASK-022, TASK-024  
**브랜치**: `feature/navigation`

**작업 내용**:
- [ ] `src/App.tsx` 작성
- [ ] `src/components/layout/Header/Header.tsx` 작성
- [ ] `src/components/layout/BottomNav/BottomNav.tsx` 작성
- [ ] `src/components/layout/FAB/FAB.tsx` 작성
- [ ] React Router 설정
  - [ ] `/` → StandardPage
  - [ ] `/scientific` → ScientificPage
  - [ ] `/history` → HistoryPage
  - [ ] `/converter` → ConverterPage
- [ ] 코드 분할 (lazy loading)

**인수 조건**:
- 모든 라우트 동작
- 네비게이션 전환 동작
- Lazy loading 적용

**관련 FR**: 없음

---

## 🔗 Phase 7: 커스텀 훅

### TASK-026: 코어 커스텀 훅 구현
**우선순위**: P0  
**예상 시간**: 8-10시간  
**의존성**: TASK-012, TASK-013, TASK-009  
**브랜치**: `feature/core-hooks`

**작업 내용**:
- [ ] `src/hooks/useCalculator.ts` 작성
  - [ ] Store 연동
  - [ ] 버튼 클릭 핸들러 구현
  - [ ] 에러 처리
- [ ] `src/hooks/useHistory.ts` 작성
  - [ ] CRUD 작업 구현
  - [ ] 검색 로직
  - [ ] 날짜 그룹화 로직
- [ ] `src/hooks/useConverter.ts` 작성
  - [ ] 변환 로직 구현
  - [ ] 카테고리 관리
  - [ ] 최근 사용 단위 저장

**인수 조건**:
- useCalculator: Store 연동 및 계산 로직 동작
- useHistory: 히스토리 관리 및 검색 필터링 동작
- useConverter: 단위 변환 및 카테고리 전환 동작

**관련 FR**: FR-1~FR-21

---

### TASK-027: 유틸리티 훅 구현
**우선순위**: P1  
**예상 시간**: 4-5시간  
**의존성**: TASK-026, TASK-014  
**브랜치**: `feature/utility-hooks`

**작업 내용**:
- [ ] `src/hooks/useKeyboard.ts` 작성
  - [ ] 키보드 이벤트 리스너
  - [ ] 키 매핑 (숫자, 연산자, Enter, Escape 등)
  - [ ] 단축키 지원
- [ ] `src/hooks/useTheme.ts` 작성
  - [ ] 테마 토글 구현
  - [ ] 시스템 설정 감지
  - [ ] DOM 클래스 업데이트

**인수 조건**:
- useKeyboard: 키보드 입력 동작, Enter → 계산, Escape → 초기화
- useTheme: 다크/라이트 모드 전환, 시스템 설정 반영

**관련 FR**: FR-23, FR-24, FR-26

---

## ✅ Phase 8: 테스트 & 품질

### TASK-028: 통합 테스트 작성 (코어 로직만)
**우선순위**: P0  
**예상 시간**: 4-5시간  
**의존성**: TASK-012, TASK-013  
**브랜치**: `test/integration`

**작업 내용**:
- [ ] `tests/integration/calculator-flow.test.ts` 작성
  - [ ] 계산 엔진 + 히스토리 저장 통합
  - [ ] 공학 함수 + 각도 모드 전환
  - [ ] 메모리 기능 통합
- [ ] `tests/integration/converter-flow.test.ts` 작성
  - [ ] 단위 변환 엔진 + 저장소 통합
- [ ] `tests/integration/history-flow.test.ts` 작성
  - [ ] 히스토리 관리 + 검색 기능

**인수 조건**:
- 모든 통합 테스트 통과
- 코어 로직 간 상호작용 검증
- **UI 컴포넌트는 테스트하지 않음**

**관련 FR**: FR-1~FR-21

---

### TASK-029: 접근성 개선
**우선순위**: P1  
**예상 시간**: 4-6시간  
**의존성**: TASK-025  
**브랜치**: `feat/accessibility`

**작업 내용**:
- [ ] ARIA 속성 추가 (수동 확인)
  - [ ] `aria-label` 추가
  - [ ] `role` 속성 추가
  - [ ] `aria-pressed` 추가
- [ ] 키보드 네비게이션 개선
  - [ ] Tab 순서 최적화
  - [ ] Focus 스타일 추가
- [ ] 스크린 리더 테스트 (수동)
- [ ] 색상 대비 검증 (4.5:1)

**테스트 방법**:
- ✅ 수동 테스트 (브라우저에서 직접 확인)
- ✅ 스크린 리더 테스트 (NVDA/JAWS)
- ✅ Lighthouse 접근성 점수 확인
- ❌ 자동화 테스트 없음

**인수 조건**:
- WCAG 2.1 AA 준수
- 키보드만으로 모든 기능 사용 가능
- 스크린 리더 호환
- Lighthouse 접근성 점수 > 90

**관련 FR**: FR-26

---

### TASK-030: 성능 최적화
**우선순위**: P1  
**예상 시간**: 4-6시간  
**의존성**: TASK-025  
**브랜치**: `feat/performance`

**작업 내용**:
- [ ] React.memo 적용 (Button, HistoryItem 등)
- [ ] useMemo/useCallback 최적화
- [ ] 코드 분할 확인
- [ ] 번들 크기 분석
- [ ] Lighthouse 점수 측정
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90

**인수 조건**:
- 버튼 클릭 응답 < 100ms
- 계산 속도 < 500ms
- 번들 크기 < 500KB (gzipped)
- Lighthouse 점수 > 90

**관련 FR**: 비기능 요구사항

---

## 🚀 Phase 9: 배포 & 마무리

### TASK-031: 프로덕션 빌드 설정
**우선순위**: P0  
**예상 시간**: 3-4시간  
**의존성**: TASK-030  
**브랜치**: `feat/production-build`

**작업 내용**:
- [ ] 환경 변수 설정
  - [ ] `.env.production` 작성
  - [ ] `VITE_APP_NAME` 설정
  - [ ] `VITE_ENABLE_ANALYTICS` 설정
- [ ] 프로덕션 빌드 테스트
  - [ ] `npm run build` 실행
  - [ ] `npm run preview` 실행
  - [ ] 빌드 결과 확인
- [ ] 에러 추적 설정 (선택사항)
  - [ ] Sentry 설정

**인수 조건**:
- 프로덕션 빌드 성공
- Preview 정상 동작
- 번들 크기 확인

**관련 FR**: 없음

---

### TASK-032: GitHub Pages 배포
**우선순위**: P0  
**예상 시간**: 2-3시간  
**의존성**: TASK-031  
**브랜치**: `feat/github-pages`

**작업 내용**:
- [ ] GitHub Pages 설정 확인
  - [ ] Settings → Pages → Source: GitHub Actions
- [ ] 배포 테스트
  - [ ] `git push origin main`
  - [ ] GitHub Actions 워크플로우 확인
  - [ ] 배포 성공 확인
- [ ] 배포된 사이트 테스트
  - [ ] 모든 기능 동작 확인
  - [ ] 라우팅 동작 확인
  - [ ] 404 페이지 동작 확인

**인수 조건**:
- GitHub Pages 배포 성공
- `https://<username>.github.io/calculator/` 접속 가능
- 모든 기능 정상 동작

**관련 FR**: 없음

---

### TASK-033: 문서화
**우선순위**: P1  
**예상 시간**: 4-6시간  
**의존성**: TASK-032  
**브랜치**: `docs/final`

**작업 내용**:
- [ ] JSDoc 주석 추가
  - [ ] 모든 public 함수/클래스
  - [ ] 복잡한 로직 설명
- [ ] README 업데이트
  - [ ] 스크린샷 추가
  - [ ] 사용법 설명
  - [ ] 배포 링크 업데이트
- [ ] CHANGELOG 작성
  - [ ] 버전 1.0.0 릴리스 노트
- [ ] 사용자 가이드 작성 (선택사항)

**인수 조건**:
- 모든 코드 문서화 완료
- README 업데이트 완료
- CHANGELOG 작성 완료

**관련 FR**: 없음

---

## 📊 진행 상황 추적

### 우선순위별 작업 수
- **P0 (필수)**: 27개
- **P1 (중요)**: 6개
- **P2 (선택)**: 0개

### Phase별 작업 수
- Phase 1 (초기화): 3개
- Phase 2 (계산 엔진): 5개
- Phase 3 (단위 변환): 1개
- Phase 4 (저장소): 2개
- Phase 5 (상태 관리): 3개
- Phase 6 (UI): 11개 (분리됨: 컴포넌트 + 페이지)
- Phase 7 (훅): 2개 (통합됨)
- Phase 8 (테스트): 3개
- Phase 9 (배포): 3개

### 예상 총 소요 시간
- **최소**: 125시간 (16일, 하루 8시간 기준)
- **최대**: 165시간 (21일, 하루 8시간 기준)

### 주요 변경 사항
- ✅ **큰 UI 페이지 분리**: Standard, Scientific, History, Converter 페이지를 컴포넌트 + 페이지로 분리 (8-10시간 → 4-5시간 x 2)
- ✅ **커스텀 훅 통합**: useCalculator/useHistory/useConverter를 하나로 통합 (3-4시간 x 3 → 8-10시간)
- ✅ **유틸리티 훅 통합**: useKeyboard/useTheme를 하나로 통합 (2-3시간 x 2 → 4-5시간)

---

## 🔄 작업 진행 방법

### 1. 작업 선택
```bash
# 우선순위 P0 작업부터 순서대로 진행
# Phase 순서대로 진행 권장
```

### 2. 브랜치 생성
```bash
git checkout -b feature/calculator-engine-basic
```

### 3. TDD 사이클 (코어 로직만)
```bash
# 1. 테스트 작성 (Red)
# 2. 최소 구현 (Green)
# 3. 리팩토링 (Refactor)
# 4. 커밋
git commit -m "feat: implement basic calculator engine with tests"
```

### 4. PR 생성 & 리뷰
```bash
git push origin feature/calculator-engine-basic
# GitHub에서 PR 생성
```

### 5. 머지 & 배포
```bash
# PR 승인 후 main으로 머지
# GitHub Actions 자동 배포
```

---

## 📝 커밋 메시지 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
test: 테스트 추가/수정
refactor: 리팩토링
docs: 문서 수정
style: 코드 포매팅
chore: 빌드/설정 변경
```

---

**다음 작업**: TASK-001 (개발 환경 설정)부터 시작하세요! 🚀
