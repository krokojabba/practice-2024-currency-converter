import { loadCurrencies, loadRates } from './api-connector';

const getRatesToBase = async (baseCurrency) => {
    const rates = await loadRates();
    const rateToDefBase = rates.find((rate) => rate.code === baseCurrency).value ?? 1;
    // console.log(rateToDefBase)
    const ratesToBase = rates.map((rate) => ({
        code: rate.code,
        value: rateToDefBase / rate.value,
    }))
    return ratesToBase;
};

const convert = async (value, from, to) => {
    const ratesToBase = await getRatesToBase(to);
    const targetRate = ratesToBase.find((rate) => rate.code === from).value
    return targetRate * value;
};

const isValidConverterString = (converterString) => /^[0-9]*[.,]?[0-9]+ [A-Z]{3} IN [A-Z]{3}/.test(converterString);

const parseConverterString = (converterString, state) => {
    const result = {};
    const [rawValue, rawFrom, ,rawTo] = converterString.split(' ');
    result.value = parseInt(rawValue.replace(',', '.'), 10);
    if (state.currencies.find((currency) => currency.code === rawFrom)) {
        result.from = rawFrom;
    } else {
        throw new Error(`Unknown currency: '${rawFrom}'`);
    }
    if (state.currencies.find((currency) => currency.code === rawTo)) {
        result.to = rawTo;
    } else {
        throw new Error(`Unknown currency: '${rawTo}'`);
    }
    return result;
};

export default async (state) => {
    const converterForm = document.querySelector('#converter form');
    const ratesForm = document.querySelector('#rates form');

    const currencies = await loadCurrencies();
    state.rates.baseCurrency = (currencies
        .find((currency) => currency.code === state.rates.defaultBaseCurrency)
        .code) ?? currencies[0].code;
    state.currencies = currencies;
    state.rates.ratesToBase = await getRatesToBase(state.rates.baseCurrency);
    // console.log(ratesToBase);

    ratesForm.addEventListener('input', async () => {
        const newBaseCurrency = ratesForm.elements.baseCurrency.value;
        state.rates.baseCurrency = newBaseCurrency;
        state.rates.ratesToBase = await getRatesToBase(state.rates.baseCurrency);
    });

    converterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const rawConverterString = converterForm.elements.converterString.value.toUpperCase();
        if (!isValidConverterString(rawConverterString)) {
            state.converter.error = 'Invalid format';
            state.converter.status = 'invalid';
            return;
        }
        try {
            state.converter = { ...state.converter, ...parseConverterString(rawConverterString, state) };
            state.converter.result = await convert(state.converter.value, state.converter.from, state.converter.to);
            state.converter.status = 'valid';
        } catch (e) {
            state.converter.error = e.message;
            state.converter.status = 'invalid';
            return;
        }
    });
};