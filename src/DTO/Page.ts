export interface Pagination {
    offset: number;
    limit: number;
    totalCount: number;
}

export interface Page<T> {
    data: Array<T>;
    pagination: Pagination;
}
