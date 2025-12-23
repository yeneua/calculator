import type { Repository } from '../interfaces/Repository';

/**
 * 로컬 스토리지 기반 저장소 구현
 *
 * @remarks
 * TDD 원칙에 따라 개발됨. 브라우저의 localStorage를 사용하여 데이터를 영구 저장합니다.
 * JSON 직렬화/역직렬화를 자동으로 처리하며, 에러 발생 시 안전하게 null을 반환합니다.
 *
 * @example
 * ```typescript
 * const repo = new LocalStorageRepository<User>('user-data');
 * repo.save({ name: 'User' });
 * const user = repo.load();
 * ```
 */
export class LocalStorageRepository<T> implements Repository<T> {
    private readonly key: string;

    /**
     * @param key - 로컬 스토리지 키
     */
    constructor(key: string) {
        this.key = key;
    }

    /**
     * 데이터 저장
     *
     * @param data - 저장할 데이터
     * @throws {Error} QuotaExceededError 등 스토리지 용량 부족 시 에러 발생 가능
     */
    save(data: T): void {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(this.key, serialized);
        } catch (error) {
            console.error(`Error saving to localStorage [${this.key}]:`, error);
            // 선택적: 여기서 에러를 다시 던질 수도 있고, 조용히 실패할 수도 있음
            // 요구사항에 따라 다르지만, 여기서는 콘솔 로그만 남김
        }
    }

    /**
     * 데이터 불러오기
     *
     * @returns 저장된 데이터 또는 null (데이터가 없거나 파싱 에러 시)
     */
    load(): T | null {
        try {
            const serialized = localStorage.getItem(this.key);
            if (serialized === null) {
                return null;
            }

            return JSON.parse(serialized) as T;
        } catch (error) {
            console.error(`Error loading from localStorage [${this.key}]:`, error);
            return null;
        }
    }

    /**
     * 데이터 삭제
     */
    clear(): void {
        try {
            localStorage.removeItem(this.key);
        } catch (error) {
            console.error(`Error clearing localStorage [${this.key}]:`, error);
        }
    }
}
