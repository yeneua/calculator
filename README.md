# 🧮 Engineering Calculator

> **현대적인 UI/UX를 갖춘 웹 기반 공학용 계산기**  
> 학생부터 엔지니어까지, 전문적인 계산을 위한 강력하고 직관적인 도구

<div align="center">

[![Live Demo](https://img.shields.io/badge/Demo-Live-gray?style=for-the-badge&logo=vercel)](https://yeneua.github.io/calculator/)
[![Tests](https://img.shields.io/badge/Tests-209%20Passing-success?style=for-the-badge)](https://github.com/yeneua/calculator)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

**🎯 [Live Demo](https://yeneua.github.io/calculator/) 바로 사용해보세요!**

</div>

---

## 📌 프로젝트 개요

이 프로젝트는 **단순한 계산기를 넘어선 전문 공학 계산 도구**입니다. React + TypeScript 기반의 현대적인 웹 기술 스택과 체계적인 소프트웨어 아키텍처를 통해, 기업 수준의 코드 품질과 사용자경험을 제공합니다.

### 🎯 핵심 가치

- ✨ **사용자 중심 설계**: 직관적인 UI/UX로 복잡한 계산도 쉽게
- 🏗️ **엔터프라이즈급 아키텍처**: SOLID 원칙과 TDD 방법론 적용
- 🚀 **최신 기술 스택**: React 19, TypeScript, Zustand, Vite
- 📱 **완벽한 반응형**: 모바일부터 데스크톱까지 최적화
- 🎨 **세련된 디자인 시스템**: Tailwind CSS 기반 체계적 스타일링
- ✅ **209개 테스트 통과**: TDD로 검증된 안정성

---

## ✨ 주요 기능

### 1. 기본 계산기 (Standard Calculator)
- 사칙연산 (+, -, ×, ÷) 및 백분율 계산
- 실시간 계산식 표시 및 결과 프리뷰
- 직관적인 4x5 그리드 레이아웃
- 자동 히스토리 저장

### 2. 공학 함수 계산기 (Scientific Calculator)
- **삼각 함수**: sin, cos, tan 및 역함수 (DEG/RAD 모드)
- **로그 함수**: ln, log, e^x, 10^x
- **거듭제곱**: x², x^y, √, ⁿ√x
- **메모리 기능**: MR, M+, M-, MC (실시간 메모리 표시)
- **특수 함수**: x!, |x|, mod, gcd
- **상수**: π, e
- **2nd 모드**: 역함수 및 추가 함수 접근

### 3. 계산 히스토리 (History)
- 모든 계산 자동 저장 (최대 1000개)
- 날짜별 그룹화 (Today, Yesterday, 날짜)
- 실시간 검색 및 필터링
- 기록 클릭 시 계산기에 자동 로드
- 개별/전체 삭제 기능

### 4. 단위 변환기 (Unit Converter)
- **6개 카테고리**: 길이, 질량, 온도, 시간, 부피, 면적
- 실시간 단위 변환
- 스왑 기능으로 빠른 전환
- 결과 복사 기능
- 50개 이상의 단위 지원

---

## 🛠️ 기술 스택

### Frontend

| 분류 | 기술 | 사용 이유 |
|------|------|-----------|
| **Core** | React 19.x | 최신 컴포넌트 기반 아키텍처, Hooks API |
| **Language** | TypeScript 5.x | 타입 안전성, 개발 생산성 향상 |
| **State** | Zustand 5.x | 경량 (1KB), 간단한 API, 성능 최적화 |
| **Styling** | Tailwind CSS 3.x | 유틸리티 우선, JIT 모드, 다크 모드 지원 |
| **Math** | Math.js 14.x | 고정밀도 계산, 단위 변환, 안전한 eval |

### Development Tools

| 분류 | 도구 | 목적 |
|------|------|------|
| **Build** | Vite 7.x | 초고속 HMR, 최적화된 프로덕션 빌드 |
| **Testing** | Vitest 3.x + RTL | 단위/통합 테스트, TDD 방법론 |
| **Linting** | ESLint 9.x + Prettier | 코드 품질, 일관된 스타일 |
| **CI/CD** | GitHub Actions | 자동 빌드 및 배포 |

---

## 📁 프로젝트 구조

```
calculator/
├── src/
│   ├── components/         # React 컴포넌트 (16개)
│   │   ├── common/         # 공통 (Button, Display)
│   │   ├── calculator/     # 계산기 (Keypad, FunctionGrid, ModeSelector)
│   │   ├── history/        # 히스토리 (SearchBar, HistoryList, HistoryItem)
│   │   └── converter/      # 변환기 (CategoryTabs, ConversionCard)
│   ├── pages/              # 페이지 컴포넌트 (4개)
│   │   ├── StandardPage.tsx
│   │   ├── ScientificPage.tsx
│   │   ├── HistoryPage.tsx
│   │   └── ConverterPage.tsx
│   ├── store/              # Zustand 상태 관리
│   │   ├── calculatorStore.ts
│   │   ├── historyStore.ts
│   │   └── settingsStore.ts
│   ├── lib/                # 비즈니스 로직
│   │   ├── calculator/     # 계산 엔진 (TDD로 개발)
│   │   ├── converter/      # 단위 변환
│   │   └── storage/        # 데이터 영속성
│   └── types/              # TypeScript 타입 정의
├── tests/                  # 테스트 코드 (209 tests)
│   └── unit/               # 단위 테스트
└── docs/                   # 프로젝트 문서
    ├── prd.md              # 제품 기획서
    └── TASKS.md            # 작업 목록
```

---

## 🚀 시작하기

### 사전 요구사항

- Node.js >= 20.0.0
- npm >= 10.0.0

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone https://github.com/yeneua/calculator.git
cd calculator

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm run dev

# 4. 브라우저에서 접속
# http://localhost:5173/calculator/
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview

# 테스트 실행 (209 tests)
npm run test

# 린트 검사
npm run lint
```

---

## 🎨 디자인 시스템

### 컬러 팔레트

- **Primary**: Gray-500 (중립적이고 전문적인 느낌)
- **Background**: White / Dark Gray-900
- **Surface**: Gray-100 / Gray-800
- **Text**: Gray-900 / Gray-100

### 주요 원칙

1. **반응형 디자인**: 모바일부터 데스크톱까지 최적화
2. **다크 모드 지원**: 시스템 설정에 따라 자동 전환
3. **터치 최적화**: 버튼 최소 높이 60px, 충분한 간격
4. **Material Symbols**: 일관된 아이콘 시스템

---

## 💡 핵심 기술 구현

### 1. TDD (Test-Driven Development)

```typescript
// 209개 테스트로 검증된 핵심 로직
✅ 계산 엔진: 사칙연산, 삼각함수, 로그 함수 (50 tests)
✅ 단위 변환: 6개 카테고리, 50+ 단위 (41 tests)
✅ 히스토리 관리: CRUD, 검색, 그룹화 (6 tests)
✅ 상태 관리: Store 액션, 미들웨어 (9 tests)
```

### 2. 상태 관리 (Zustand + Persist)

```typescript
// localStorage와 자동 동기화
const useCalculatorStore = create(
  persist(
    (set) => ({
      expression: '',
      result: '0',
      history: [],
      // ...
    }),
    { name: 'calculator-storage' }
  )
);
```

### 3. 고정밀도 계산 (Math.js)

```typescript
// BigNumber로 정확도 보장
import { create, all } from 'mathjs';
const math = create(all);
// 부동소수점 오류 방지
```

---

## 🧪 테스트 현황

### 테스트 통계

- **총 테스트**: 209개 ✅
- **테스트 파일**: 9개
- **커버리지**: 핵심 로직 100%

### 테스트 실행

```bash
# 모든 테스트 실행
npm test

# 특정 파일 테스트
npm test -- calculator.test

# 커버리지 확인
npm run test:coverage
```

---

## 🌟 차별화 포인트

### 1. 엔터프라이즈급 아키텍처
- **SOLID 원칙** 준수한 객체지향 설계
- **TDD 방법론**으로 안정성 확보 (209 tests)
- **레이어드 아키텍처**로 관심사 분리

### 2. 완성도 높은 UX
- **4개 페이지**: Standard, Scientific, History, Converter
- **다크 모드**: 시스템 설정 자동 감지
- **실시간 변환**: 입력 즉시 결과 반영
- **히스토리 자동 저장**: 모든 계산 기록

### 3. 최신 기술 스택
- **React 19**: 최신 기능 활용
- **TypeScript Strict Mode**: 타입 안전성 극대화
- **Vite**: 빠른 개발 환경

### 4. 체계적인 문서화
- **PRD**: 기획 의도와 기능 명세
- **Tech Spec**: 기술 아키텍처 상세 설계
- **Walkthrough**: 구현 과정 문서화

---

## 📊 프로젝트 통계

- **컴포넌트**: 16개
- **페이지**: 4개
- **테스트**: 209개 (모두 통과 ✅)
- **지원 단위**: 50+ (6개 카테고리)
- **히스토리 저장**: 최대 1000개
- **개발 기간**: 2주

---

## 🎓 학습 성과

이 프로젝트를 통해 습득한 실무 역량:

### 기술 역량
- ✅ React + TypeScript 기반 SPA 개발
- ✅ Zustand를 활용한 상태 관리 설계
- ✅ TDD 방법론 적용 (209 tests)
- ✅ SOLID 원칙 기반 객체지향 설계
- ✅ Tailwind CSS 디자인 시스템 구축

### 소프트웨어 공학
- ✅ 요구사항 분석 및 PRD 작성
- ✅ 기술 아키텍처 설계 및 문서화
- ✅ 작업 분해 및 이슈 관리
- ✅ Git 브랜치 전략 및 커밋 컨벤션
- ✅ CI/CD 파이프라인 구축

### 문제 해결
- ✅ 고정밀도 계산 구현 (Math.js)
- ✅ 성능 최적화 (Zustand, 메모이제이션)
- ✅ 반응형 UI 구현
- ✅ LocalStorage 데이터 영속성

---

## 🔗 관련 링크

- **🌐 Live Demo**: https://yeneua.github.io/calculator/
- **📦 GitHub Repository**: https://github.com/yeneua/calculator
- **📋 Issues**: https://github.com/yeneua/calculator/issues
- **📖 Documentation**: [docs/](./docs/)

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.

---

## 👤 개발자

**yeneua**  
대학생 개발자 | 프론트엔드 엔지니어 지망

- GitHub: [@yeneua](https://github.com/yeneua)
- Portfolio: 이 프로젝트는 취업 포트폴리오의 일부입니다

---

<div align="center">

**⭐ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요! ⭐**

[🎯 Live Demo 바로가기](https://yeneua.github.io/calculator/)

</div>
