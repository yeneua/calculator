# Project Development Rules

This directory contains the core development principles and guidelines for the Engineering Calculator project.

## Rules

### 1. [Test-Driven Development (TDD)](./tdd.md)
All core logic (non-UI components) must be implemented using TDD methodology.

**Key Points**:
- 🔴 Write failing test first
- 🟢 Write minimal code to pass
- 🔵 Refactor while keeping tests green
- 90% minimum coverage for core logic
- Tests serve as living documentation

**Applies to**:
- Calculator engine (`src/lib/calculator/`)
- Unit converter (`src/lib/converter/`)
- Storage layer (`src/lib/storage/`)
- Business logic in hooks

**Exempt**:
- React components
- UI-specific code
- Pages

---

### 2. [SOLID Principles](./solid.md)
All code must follow SOLID principles for maintainability and scalability.

**The Five Principles**:
1. **Single Responsibility**: One class, one responsibility
2. **Open/Closed**: Open for extension, closed for modification
3. **Liskov Substitution**: Subclasses must be substitutable
4. **Interface Segregation**: Many specific interfaces > one general interface
5. **Dependency Inversion**: Depend on abstractions, not concretions

**Benefits**:
- ✅ Better testability
- ✅ Easier maintenance
- ✅ Flexible architecture
- ✅ Reusable components

---

## Enforcement

These rules are enforced through:

1. **Code Reviews**
   - PRs must demonstrate TDD approach (tests committed before implementation)
   - Code must follow SOLID principles
   - Reviewers will reject non-compliant code

2. **CI/CD Pipeline**
   - GitHub Actions runs tests on every push
   - Coverage threshold enforced (90% for core logic)
   - Build fails if tests fail

3. **Pre-commit Hooks**
   - Tests must pass before commit
   - Linter must pass
   - Type checking must pass

---

## Quick Reference

### TDD Workflow
```bash
# 1. Write test
# 2. Run test (should fail)
npm run test

# 3. Write minimal code
# 4. Run test (should pass)
npm run test

# 5. Refactor
# 6. Run test (should still pass)
npm run test
```

### SOLID Checklist
- [ ] Each class has single responsibility
- [ ] New features added via extension, not modification
- [ ] Subclasses can replace base classes
- [ ] Interfaces are focused and specific
- [ ] Code depends on abstractions

---

## Examples

See the individual rule documents for detailed examples:
- [TDD Examples](./tdd.md#example-complete-tdd-workflow)
- [SOLID Examples](./solid.md#practical-application-in-this-project)

---

**Remember**: These rules exist to make our code better. Follow them consistently! 🚀
