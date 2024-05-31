/* import axios from "axios";
import _, { defaultTo } from 'lodash'; */

/* import config from "./apiConfig";

const loadCurrencies = async (config) => {
    const { data } = await axios.get(config.api.endPoints.currencies, {
        baseURL: config.api.origin,
        params: {
            app_id: config.api.appId,
        },
    });
    return Object.entries(data).map(([code, name]) => ({ id: _.uniqueId(), code, name }));
}; */

export default async () => {
    const state = {
        rates: {
            defaultBaseCurrency: 'USD',
            baseCurrency: null,
            ratesToBase: [], // currencyId, rate
        },
        converter: {
            value: null,
            from: null,
            to: null,
            result: null,
            status: 'init', // valid, invalid
            error: null,
        },
        currencies: /* await loadCurrencies(config) */[],
        uiState: {
            currentTab: 'converter', // rates
        },
    }
    return state;
};
