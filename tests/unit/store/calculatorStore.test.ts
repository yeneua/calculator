import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useCalculatorStore } from '@/store/calculatorStore';

/**
 * Calculator Store 테스트
 * TDD: RED 단계 - 먼저 테스트 작성
 *
 * 관련 FR: FR-1 ~ FR-10
 */

describe('CalculatorStore', () => {
    // 각 테스트 전에 스토어 초기화
    beforeEach(() => {
        const store = useCalculatorStore.getState();
        store.clear();
    });

    it('should initialize with default values', () => {
        const state = useCalculatorStore.getState();
        expect(state.expression).toBe('');
        expect(state.result).toBe('0');
        expect(state.error).toBeNull();
        expect(state.angleMode).toBe('DEG');
    });

    it('should append number', () => {
        const store = useCalculatorStore.getState();
        act(() => store.appendValue('1'));
        act(() => store.appendValue('2'));

        const state = useCalculatorStore.getState();
        expect(state.expression).toBe('12');
    });

    it('should append operator', () => {
        const store = useCalculatorStore.getState();
        act(() => store.appendValue('1'));
        act(() => store.appendValue('+'));
        act(() => store.appendValue('2'));

        const state = useCalculatorStore.getState();
        expect(state.expression).toBe('1+2');
    });

    it('should calculate result', () => {
        const store = useCalculatorStore.getState();
        act(() => store.appendValue('2'));
        act(() => store.appendValue('+'));
        act(() => store.appendValue('3'));
        act(() => store.calculate());

        const state = useCalculatorStore.getState();
        expect(state.result).toBe('5');
        // 계산 후 expression은 유지되거나 초기화될 수 있음 (정책에 따라 다름)
        // 여기서는 Google 계산기처럼 결과가 새로운 expression이 되는지, 아니면 expression은 남는지 확인 필요
        // PRD에 따르면 "입력된 수식과 결과값을 동시에 확인" 이므로 expression은 남아야 함. 
        // 하지만 다음 입력 시 리셋되는지 여부는 UX 결정 사항.
        // 일단 계산 후 결과값이 expression으로 덮어써지지 않고 result 필드에 저장되는 것으로 가정.
    });

    it('should handle clear', () => {
        const store = useCalculatorStore.getState();
        act(() => store.appendValue('1'));
        act(() => store.clear());

        const state = useCalculatorStore.getState();
        expect(state.expression).toBe('');
        expect(state.result).toBe('0');
    });

    it('should handle backspace', () => {
        const store = useCalculatorStore.getState();
        act(() => store.appendValue('1'));
        act(() => store.appendValue('2'));
        act(() => store.backspace());

        const state = useCalculatorStore.getState();
        expect(state.expression).toBe('1');
    });

    it('should toggle angle mode', () => {
        const store = useCalculatorStore.getState();
        expect(store.angleMode).toBe('DEG');

        act(() => store.toggleAngleMode());
        expect(useCalculatorStore.getState().angleMode).toBe('RAD');

        act(() => store.toggleAngleMode());
        expect(useCalculatorStore.getState().angleMode).toBe('DEG');
    });

    it('should handle memory operations', () => {
        const store = useCalculatorStore.getState();

        // M+ (현재 결과 0이므로 0 저장)
        act(() => store.memoryAdd());
        expect(useCalculatorStore.getState().memory).toBe(0);

        // 계산 결과 10 만들기
        act(() => store.appendValue('5'));
        act(() => store.appendValue('*'));
        act(() => store.appendValue('2'));
        act(() => store.calculate());

        // M+ (10 더하기)
        act(() => store.memoryAdd());
        expect(useCalculatorStore.getState().memory).toBe(10);

        // M- (5 빼기)
        // 계산 결과 5 만들기
        act(() => store.clear());
        act(() => store.appendValue('5'));
        act(() => store.calculate());

        act(() => store.memorySub());
        expect(useCalculatorStore.getState().memory).toBe(5);

        // MR
        act(() => store.clear());
        act(() => store.memoryRecall());
        expect(useCalculatorStore.getState().expression).toBe('5');

        // MC
        act(() => store.memoryClear());
        expect(useCalculatorStore.getState().memory).toBe(0);
    });

    it('should handle error', () => {
        const store = useCalculatorStore.getState();
        act(() => store.appendValue('5'));
        act(() => store.appendValue('/'));
        act(() => store.appendValue('0')); // 0으로 나누기
        act(() => store.calculate());

        const state = useCalculatorStore.getState();
        expect(state.error).not.toBeNull();
    });
});
