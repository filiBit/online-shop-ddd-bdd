const DEFAULT_PAGE_INDEX = 0;
const DEFAULT_SIZE = 12;

export class Pagination {
    private _index: number;
    private _size: number;

    constructor(
        index: number = DEFAULT_PAGE_INDEX,
        size: number = DEFAULT_SIZE,
    ) {
        if (typeof index !== "number" || Number.isNaN(index) || index < 0) {
            index = DEFAULT_PAGE_INDEX;
        }

        if (
            !size || typeof size !== "number" || Number.isNaN(index) || size < 1
        ) {
            size = DEFAULT_SIZE;
        }

        this._index = index;
        this._size = size;
    }

    get index() {
        return this._index;
    }

    get size() {
        return this._size;
    }

    toQueryString() {
        return `page=${this._index + 1}&page_size=${this._size}`;
    }
}
