# Test-Driven Development (TDD) Rule

## Overview
All core logic (non-UI components) in this project MUST be implemented using Test-Driven Development methodology.

## What is Core Logic?
Core logic includes:
- **Calculator Engine** (`src/lib/calculator/`)
  - Expression parsing
  - Mathematical calculations
  - Number formatting
  - Error handling
- **Unit Converter** (`src/lib/converter/`)
  - Unit conversion algorithms
  - Conversion formulas
- **Storage Layer** (`src/lib/storage/`)
  - Data persistence logic
  - Migration logic
- **Business Logic** (`src/hooks/` - logic only, not UI)
  - State transformations
  - Data validation
  - Business rules

## What is NOT Core Logic?
UI components are exempt from TDD:
- React components (`src/components/`)
- Pages (`src/pages/`)
- UI-specific hooks (e.g., `useTheme`, `useKeyboard`)

## TDD Process

### Red-Green-Refactor Cycle

1. **🔴 RED - Write a Failing Test**
   ```typescript
   // tests/unit/calculator/engine.test.ts
   import { describe, it, expect } from 'vitest';
   import { evaluateExpression } from '@/lib/calculator/engine';

   describe('Calculator Engine', () => {
     it('should add two numbers', () => {
       expect(evaluateExpression('2 + 3')).toBe(5);
     });
   });
   ```
   - Run test: `npm run test`
   - Verify it fails ❌

2. **🟢 GREEN - Write Minimal Code to Pass**
   ```typescript
   // src/lib/calculator/engine.ts
   export const evaluateExpression = (expression: string): number => {
     // Minimal implementation to pass the test
     const [a, op, b] = expression.split(' ');
     if (op === '+') {
       return Number(a) + Number(b);
     }
     return 0;
   };
   ```
   - Run test: `npm run test`
   - Verify it passes ✅

3. **🔵 REFACTOR - Improve Code Quality**
   ```typescript
   // src/lib/calculator/engine.ts
   import { evaluate } from 'mathjs';

   export const evaluateExpression = (expression: string): number => {
     try {
       return evaluate(expression);
     } catch (error) {
       throw new Error('Invalid expression');
     }
   };
   ```
   - Run test: `npm run test`
   - Verify it still passes ✅
   - Code is now cleaner and more maintainable

## Test Coverage Requirements

### Minimum Coverage
- **Core Logic**: 90% coverage minimum
- **Critical Paths**: 100% coverage (calculations, conversions)

### Coverage Check
```bash
npm run test:coverage
```

### Coverage Thresholds
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 90,
      functions: 90,
      branches: 85,
      statements: 90,
      include: ['src/lib/**/*.ts'],
      exclude: [
        'src/components/**',
        'src/pages/**',
        '**/*.test.ts',
        '**/*.spec.ts',
      ],
    },
  },
});
```

## Test Structure

### Organize by Feature
```
tests/
├── unit/
│   ├── calculator/
│   │   ├── engine.test.ts
│   │   ├── parser.test.ts
│   │   └── formatter.test.ts
│   ├── converter/
│   │   ├── units.test.ts
│   │   └── converter.test.ts
│   └── storage/
│       ├── localStorage.test.ts
│       └── migration.test.ts
└── integration/
    ├── calculator-flow.test.ts
    └── history-storage.test.ts
```

## Benefits of TDD

✅ **Better Design**: Forces you to think about API before implementation  
✅ **Fewer Bugs**: Catches issues early in development  
✅ **Refactoring Confidence**: Tests ensure changes don't break functionality  
✅ **Documentation**: Tests serve as living documentation  
✅ **Faster Debugging**: Failing tests pinpoint exact issue  

## Example: Complete TDD Workflow

### Step 1: Write Test First
```typescript
// tests/unit/converter/converter.test.ts
describe('Unit Converter', () => {
  it('should convert meters to feet', () => {
    const result = convert(100, 'meters', 'feet');
    expect(result).toBeCloseTo(328.084);
  });
});
```

### Step 2: Implement Minimal Code
```typescript
// src/lib/converter/converter.ts
export const convert = (
  value: number,
  from: string,
  to: string
): number => {
  if (from === 'meters' && to === 'feet') {
    return value * 3.28084;
  }
  return value;
};
```

### Step 3: Refactor
```typescript
// src/lib/converter/converter.ts
import { unit } from 'mathjs';

export const convert = (
  value: number,
  from: string,
  to: string
): number => {
  return unit(value, from).to(to).toNumber();
};
```

## Enforcement

This rule is enforced through:
1. **Code Reviews**: PRs without tests for core logic will be rejected
2. **CI/CD**: GitHub Actions fails if coverage drops below threshold
3. **Pre-commit Hooks**: Tests must pass before commit

---

**Remember**: Write the test first, make it pass, then refactor. Always. 🔴🟢🔵
