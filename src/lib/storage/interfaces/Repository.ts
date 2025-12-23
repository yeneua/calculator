/**
 * 데이터 저장소 인터페이스
 * SOLID 원칙: Interface Segregation - 필요한 메서드만 정의
 * Generic Type T: 저장할 데이터의 타입
 */
export interface Repository<T> {
    /**
     * 데이터 저장
     * @param data - 저장할 데이터
     */
    save(data: T): void;

    /**
     * 데이터 불러오기
     * @returns 저장된 데이터 또는 null
     */
    load(): T | null;

    /**
     * 데이터 삭제
     */
    clear(): void;
}
