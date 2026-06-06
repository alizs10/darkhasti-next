export interface PaginationData {
    per_page: number,
    has_more_pages: boolean,
    total: number,
    next_cursor: string | null,
    prev_cursor: string | null,
    type: 'cursor'
}
