import type { Repository } from '../interfaces/Repository';

/**
 * 인메모리 저장소 구현 (테스트용)
 *
 * @remarks
 * 브라우저 저장소를 사용할 수 없는 환경이나 빠른 단위 테스트를 위해 사용됩니다.
 */
export class MemoryRepository<T> implements Repository<T> {
    private data: T | null = null;

    save(data: T): void {
        this.data = data;
    }

    load(): T | null {
        return this.data;
    }

    clear(): void {
        this.data = null;
    }
}
