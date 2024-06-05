export default async () => {
    const state = {
        rates: {
            defaultBaseCurrency: 'USD',
            baseCurrency: null,
            ratesToBase: [],
        },
        converter: {
            value: null,
            from: null,
            to: null,
            result: null,
            status: 'init', // valid, invalid
            error: null,
        },
        currencies: [],
    }
    return state;
};
