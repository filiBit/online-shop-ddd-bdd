import { Filter } from "../value-object/filter";

export class FilterSet {
    private _filters: Map<string, Filter>;

    constructor(filters: Filter[] = []) {
        this._filters = new Map(filters.map((f) => {
            if (f instanceof Filter === false) {
                throw new Error("FilterSet: invalid `filters`");
            }

            return [f.fieldName, f];
        }));
    }

    setFilter(filter: Filter) {
        this._filters.set(filter.fieldName, filter);
    }

    removeFilter(key: string) {
        this._filters.delete(key);
    }

    getFilter(fieldName: string): Filter | undefined {
        return this._filters.get(fieldName);
    }

    isFilterExist(filter: Filter): boolean {
        return this._filters.get(filter.fieldName)?.value === filter.value;
    }

    get filters(): Filter[] {
        return Array.from(this._filters.values());
    }

    get isEmpty(): boolean {
        return this._filters.size === 0;
    }

    toQueryString(): string {
        return this.filters.map((f) => f.toQueryString()).join("&");
    }
}
