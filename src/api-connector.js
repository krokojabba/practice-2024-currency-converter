import axios from "axios";
import _ from 'lodash';

import config from "./apiConfig";

const loadCurrencies = async () => {
    const { data } = await axios.get(config.endPoints.currencies, {
        baseURL: config.origin,
        params: {
            app_id: config.appId,
        },
    });
    return Object.entries(data).map(([code, name]) => ({ id: _.uniqueId(), code, name }));
};

const loadRates = async () => {
    const { data } = await axios.get(config.endPoints.rates, {
        baseURL: config.origin,
        params: {
            app_id: config.appId,
        },
    });
    return Object.entries(data.rates).map(([code, value]) => ({ code, value }));
};

export { loadCurrencies, loadRates };