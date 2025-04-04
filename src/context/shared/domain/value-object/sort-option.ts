export type SortOrder = "asc" | "desc";

export const SortOrderSet = new Set<SortOrder>(["asc", "desc"]);

export class SortOption {
    private _fieldName: string;
    private _order: SortOrder;

    constructor(fieldName: string, order: SortOrder) {
        if (!fieldName || typeof fieldName !== "string") {
            throw new Error("Sort: Invalid fieldName");
        }

        if (!order || !SortOrderSet.has(order)) {
            throw new Error("Sort: Invalid order");
        }

        this._fieldName = fieldName;
        this._order = order;
    }

    get fieldName() {
        return this._fieldName;
    }

    get order() {
        return this._order;
    }

    toQueryString(): string {
        return `sort=${this._fieldName},${this._order}`;
    }
}
