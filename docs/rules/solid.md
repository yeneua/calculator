# SOLID Principles Rule

## Overview
All code in this project MUST follow SOLID principles to ensure maintainability, scalability, and testability.

## The SOLID Principles

### 1. Single Responsibility Principle (SRP)
**"A class should have one, and only one, reason to change."**

Each module, class, or function should have responsibility over a single part of the functionality.

#### ✅ Good Example
```typescript
// src/lib/calculator/engine.ts
// Responsibility: Evaluate mathematical expressions
export class CalculatorEngine {
  evaluate(expression: string): number {
    return this.parser.parse(expression);
  }
}

// src/lib/calculator/formatter.ts
// Responsibility: Format numbers for display
export class NumberFormatter {
  format(value: number, options: FormatOptions): string {
    return this.applyFormatting(value, options);
  }
}

// src/lib/storage/historyStorage.ts
// Responsibility: Persist calculation history
export class HistoryStorage {
  save(entry: HistoryEntry): void {
    this.storage.setItem(this.key, JSON.stringify(entry));
  }
}
```

#### ❌ Bad Example
```typescript
// This class has too many responsibilities!
export class Calculator {
  evaluate(expression: string): number { /* ... */ }
  formatNumber(value: number): string { /* ... */ }
  saveToHistory(entry: HistoryEntry): void { /* ... */ }
  loadFromHistory(): HistoryEntry[] { /* ... */ }
  convertUnit(value: number, from: string, to: string): number { /* ... */ }
}
```

---

### 2. Open/Closed Principle (OCP)
**"Software entities should be open for extension, but closed for modification."**

You should be able to add new functionality without changing existing code.

#### ✅ Good Example
```typescript
// src/lib/calculator/operations/Operation.ts
export interface Operation {
  execute(a: number, b: number): number;
}

// src/lib/calculator/operations/AddOperation.ts
export class AddOperation implements Operation {
  execute(a: number, b: number): number {
    return a + b;
  }
}

// src/lib/calculator/operations/MultiplyOperation.ts
export class MultiplyOperation implements Operation {
  execute(a: number, b: number): number {
    return a * b;
  }
}

// src/lib/calculator/engine.ts
export class CalculatorEngine {
  constructor(private operations: Map<string, Operation>) {}
  
  calculate(a: number, operator: string, b: number): number {
    const operation = this.operations.get(operator);
    if (!operation) throw new Error('Unknown operator');
    return operation.execute(a, b);
  }
}

// Adding new operation doesn't require modifying existing code
export class PowerOperation implements Operation {
  execute(a: number, b: number): number {
    return Math.pow(a, b);
  }
}
```

#### ❌ Bad Example
```typescript
// Adding new operations requires modifying this function
export function calculate(a: number, operator: string, b: number): number {
  switch (operator) {
    case '+': return a + b;
    case '-': return a - b;
    case '*': return a * b;
    case '/': return a / b;
    // Need to modify this function to add new operators!
    default: throw new Error('Unknown operator');
  }
}
```

---

### 3. Liskov Substitution Principle (LSP)
**"Objects of a superclass should be replaceable with objects of a subclass without breaking the application."**

Derived classes must be substitutable for their base classes.

#### ✅ Good Example
```typescript
// src/lib/storage/Storage.ts
export interface Storage<T> {
  get(key: string): T | null;
  set(key: string, value: T): void;
  remove(key: string): void;
}

// src/lib/storage/LocalStorage.ts
export class LocalStorage<T> implements Storage<T> {
  get(key: string): T | null {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  
  set(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

// src/lib/storage/MemoryStorage.ts
export class MemoryStorage<T> implements Storage<T> {
  private store = new Map<string, T>();
  
  get(key: string): T | null {
    return this.store.get(key) ?? null;
  }
  
  set(key: string, value: T): void {
    this.store.set(key, value);
  }
  
  remove(key: string): void {
    this.store.delete(key);
  }
}

// Both implementations can be used interchangeably
function saveHistory(storage: Storage<HistoryEntry>, entry: HistoryEntry) {
  storage.set('history', entry);
}
```

#### ❌ Bad Example
```typescript
// This violates LSP - subclass changes behavior unexpectedly
export class ReadOnlyStorage<T> implements Storage<T> {
  get(key: string): T | null { /* ... */ }
  
  set(key: string, value: T): void {
    throw new Error('Cannot write to read-only storage!');
  }
  
  remove(key: string): void {
    throw new Error('Cannot remove from read-only storage!');
  }
}
```

---

### 4. Interface Segregation Principle (ISP)
**"Clients should not be forced to depend on interfaces they do not use."**

Many specific interfaces are better than one general-purpose interface.

#### ✅ Good Example
```typescript
// src/lib/calculator/interfaces.ts
export interface Evaluator {
  evaluate(expression: string): number;
}

export interface Formatter {
  format(value: number): string;
}

export interface Validator {
  validate(expression: string): boolean;
}

// src/lib/calculator/engine.ts
export class CalculatorEngine implements Evaluator, Validator {
  evaluate(expression: string): number { /* ... */ }
  validate(expression: string): boolean { /* ... */ }
  // Doesn't need to implement Formatter
}

// src/lib/calculator/formatter.ts
export class NumberFormatter implements Formatter {
  format(value: number): string { /* ... */ }
  // Only implements what it needs
}
```

#### ❌ Bad Example
```typescript
// Fat interface - forces implementations to implement unused methods
export interface Calculator {
  evaluate(expression: string): number;
  format(value: number): string;
  validate(expression: string): boolean;
  saveToHistory(entry: HistoryEntry): void;
  loadFromHistory(): HistoryEntry[];
  convertUnit(value: number, from: string, to: string): number;
}

// This class doesn't need all these methods!
export class SimpleCalculator implements Calculator {
  evaluate(expression: string): number { /* ... */ }
  
  // Forced to implement methods it doesn't need
  format(value: number): string { throw new Error('Not implemented'); }
  validate(expression: string): boolean { throw new Error('Not implemented'); }
  saveToHistory(entry: HistoryEntry): void { throw new Error('Not implemented'); }
  loadFromHistory(): HistoryEntry[] { throw new Error('Not implemented'); }
  convertUnit(value: number, from: string, to: string): number { throw new Error('Not implemented'); }
}
```

---

### 5. Dependency Inversion Principle (DIP)
**"Depend on abstractions, not concretions."**

High-level modules should not depend on low-level modules. Both should depend on abstractions.

#### ✅ Good Example
```typescript
// src/lib/calculator/interfaces.ts
export interface MathEngine {
  evaluate(expression: string): number;
}

export interface HistoryRepository {
  save(entry: HistoryEntry): void;
  getAll(): HistoryEntry[];
}

// src/lib/calculator/CalculatorService.ts
export class CalculatorService {
  constructor(
    private mathEngine: MathEngine,
    private historyRepo: HistoryRepository
  ) {}
  
  calculate(expression: string): number {
    const result = this.mathEngine.evaluate(expression);
    this.historyRepo.save({
      expression,
      result,
      timestamp: Date.now(),
    });
    return result;
  }
}

// src/lib/calculator/MathJsEngine.ts
export class MathJsEngine implements MathEngine {
  evaluate(expression: string): number {
    return evaluate(expression);
  }
}

// src/lib/storage/LocalHistoryRepository.ts
export class LocalHistoryRepository implements HistoryRepository {
  save(entry: HistoryEntry): void {
    localStorage.setItem('history', JSON.stringify(entry));
  }
  
  getAll(): HistoryEntry[] {
    const data = localStorage.getItem('history');
    return data ? JSON.parse(data) : [];
  }
}

// Dependency injection
const calculator = new CalculatorService(
  new MathJsEngine(),
  new LocalHistoryRepository()
);
```

#### ❌ Bad Example
```typescript
// Tightly coupled to concrete implementations
export class CalculatorService {
  private mathEngine = new MathJsEngine(); // Direct dependency!
  private storage = new LocalHistoryRepository(); // Direct dependency!
  
  calculate(expression: string): number {
    const result = this.mathEngine.evaluate(expression);
    this.storage.save({
      expression,
      result,
      timestamp: Date.now(),
    });
    return result;
  }
}
```

---

## Practical Application in This Project

### File Organization
```
src/lib/
├── calculator/
│   ├── interfaces/
│   │   ├── Evaluator.ts
│   │   ├── Formatter.ts
│   │   └── Validator.ts
│   ├── implementations/
│   │   ├── MathJsEvaluator.ts
│   │   ├── NumberFormatter.ts
│   │   └── ExpressionValidator.ts
│   └── CalculatorService.ts
├── converter/
│   ├── interfaces/
│   │   └── UnitConverter.ts
│   └── implementations/
│       └── MathJsConverter.ts
└── storage/
    ├── interfaces/
    │   └── Repository.ts
    └── implementations/
        ├── LocalStorageRepository.ts
        └── MemoryRepository.ts
```

### Dependency Injection Pattern
```typescript
// src/lib/di/container.ts
export class Container {
  private services = new Map<string, any>();
  
  register<T>(key: string, instance: T): void {
    this.services.set(key, instance);
  }
  
  resolve<T>(key: string): T {
    return this.services.get(key);
  }
}

// src/lib/di/setup.ts
export function setupContainer(): Container {
  const container = new Container();
  
  // Register implementations
  container.register('mathEngine', new MathJsEngine());
  container.register('historyRepo', new LocalHistoryRepository());
  container.register('calculator', new CalculatorService(
    container.resolve('mathEngine'),
    container.resolve('historyRepo')
  ));
  
  return container;
}
```

### Using in React Components
```typescript
// src/hooks/useCalculator.ts
import { useCalculatorStore } from '@/store/calculatorStore';
import { container } from '@/lib/di/setup';

export const useCalculator = () => {
  const calculator = container.resolve<CalculatorService>('calculator');
  
  const calculate = (expression: string) => {
    try {
      const result = calculator.calculate(expression);
      useCalculatorStore.setState({ result });
    } catch (error) {
      useCalculatorStore.setState({ error: 'Invalid expression' });
    }
  };
  
  return { calculate };
};
```

---

## Benefits of SOLID

✅ **Maintainability**: Easy to understand and modify  
✅ **Testability**: Each component can be tested in isolation  
✅ **Flexibility**: Easy to swap implementations  
✅ **Scalability**: Easy to add new features  
✅ **Reusability**: Components can be reused in different contexts  

---

## Code Review Checklist

When reviewing code, check for:

- [ ] **SRP**: Does each class/function have a single responsibility?
- [ ] **OCP**: Can new features be added without modifying existing code?
- [ ] **LSP**: Can subclasses replace base classes without issues?
- [ ] **ISP**: Are interfaces focused and specific?
- [ ] **DIP**: Does the code depend on abstractions, not concrete implementations?

---

## Enforcement

This rule is enforced through:
1. **Code Reviews**: PRs violating SOLID principles will be rejected
2. **Architecture Reviews**: Major features reviewed for SOLID compliance
3. **Refactoring**: Existing code continuously improved to follow SOLID

---

**Remember**: SOLID principles lead to better software design. Apply them consistently! 🏗️
