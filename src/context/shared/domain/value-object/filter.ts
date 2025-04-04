export class Filter {
    private _fieldName: string;
    private _value: string;
    private _operator: "exact" | "contains";

    constructor(fieldName: string, value: string) {
        if (!fieldName || typeof fieldName !== "string") {
            throw new Error(`Filter: Invalid fieldName`);
        }

        if (!value || typeof value !== "string") {
            throw new Error("Filter: Invalid value");
        }

        this._fieldName = fieldName;
        this._value = value;
        this._operator = fieldName === "category" ? "exact" : "contains";
    }

    isStatisfy(target: Record<string, unknown>): boolean {
        const value = target?.[this._fieldName];

        if (!value || typeof value !== "string") return false;

        return this._operator === "exact"
            ? value === this._value
            : value.toLowerCase().includes(this._value.toLowerCase());
    }

    get fieldName() {
        return this._fieldName;
    }

    get value() {
        return this._value;
    }

    toQueryString(): string {
        return `${this._fieldName}=${encodeURIComponent(this.value)}`;
    }
}
