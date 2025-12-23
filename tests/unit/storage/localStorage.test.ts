import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { LocalStorageRepository } from '@/lib/storage/implementations/LocalStorageRepository';

/**
 * 로컬 스토리지 저장소 테스트
 * TDD: RED 단계 - 먼저 테스트 작성
 *
 * 관련 FR: FR-11 (히스토리 저장)
 */

describe('LocalStorageRepository', () => {
    // LocalStorage Mock
    const localStorageMock = (() => {
        let store: Record<string, string> = {};
        return {
            getItem: vi.fn((key: string) => store[key] || null),
            setItem: vi.fn((key: string, value: string) => {
                store[key] = value.toString();
            }),
            removeItem: vi.fn((key: string) => {
                delete store[key];
            }),
            clear: vi.fn(() => {
                store = {};
            }),
        };
    })();

    beforeEach(() => {
        // 전역 localStorage를 mock으로 대체
        vi.stubGlobal('localStorage', localStorageMock);
        // console.error 억제
        vi.spyOn(console, 'error').mockImplementation(() => { });
        localStorageMock.clear();
        vi.clearAllMocks();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        // unstubGlobal 대신 restoreAllMocks로 충분함 (stubGlobal은 mock을 설정하는 것이므로)
        // 하지만 명시적으로 제거하려면:
        vi.stubGlobal('localStorage', undefined);
    });

    it('should save data to localStorage', () => {
        const repo = new LocalStorageRepository<string>('test-key');
        repo.save('test-value');

        expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('test-value'));
    });

    it('should load data from localStorage', () => {
        const repo = new LocalStorageRepository<string>('test-key');
        localStorageMock.setItem('test-key', JSON.stringify('loaded-value'));

        const data = repo.load();
        expect(data).toBe('loaded-value');
    });

    it('should return null if no data exists', () => {
        const repo = new LocalStorageRepository<string>('non-existent');
        const data = repo.load();
        expect(data).toBeNull();
    });

    it('should clear data from localStorage', () => {
        const repo = new LocalStorageRepository<string>('test-key');
        localStorageMock.setItem('test-key', JSON.stringify('value'));

        repo.clear();
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
        expect(repo.load()).toBeNull();
    });

    it('should handle complex objects', () => {
        interface TestData {
            id: number;
            name: string;
            active: boolean;
        }

        const repo = new LocalStorageRepository<TestData>('complex-key');
        const testData: TestData = { id: 1, name: 'Test', active: true };

        repo.save(testData);
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
            'complex-key',
            JSON.stringify(testData)
        );

        const loaded = repo.load();
        expect(loaded).toEqual(testData);
    });

    it('should handle JSON parse errors gracefully', () => {
        const repo = new LocalStorageRepository<string>('error-key');
        // 유효하지 않은 JSON 수동 설정
        localStorageMock.getItem.mockReturnValueOnce('invalid-json');

        const data = repo.load();
        expect(data).toBeNull();
        expect(console.error).toHaveBeenCalled();
    });

    it('should support default value if load fails or is empty', () => {
        const repo = new LocalStorageRepository<string>('empty-key');
        const data = repo.load() ?? 'default';
        expect(data).toBe('default');
    });
});
