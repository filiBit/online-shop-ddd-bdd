export enum CurrencyEnum {
    USD = "USD",
}

const CurrencySymbolMap = new Map([[CurrencyEnum.USD, "$"]]);

export class Currency {
    constructor(private _currency: CurrencyEnum) {
        if (!CurrencySymbolMap.has(_currency)) {
            throw new Error(`Currency: unsupported currency`);
        }
    }

    get currency() {
        return this._currency;
    }

    get currencySymbol() {
        return CurrencySymbolMap.get(this._currency);
    }
}
