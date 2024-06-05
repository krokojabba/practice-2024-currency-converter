import onChange from 'on-change';

const renderCurrenciesDropDown = (state, currenciesDropDown) => {
    state.currencies.forEach((currency) => {
        const option = document.createElement('option');
        option.setAttribute('value', currency.code);
        option.textContent = currency.name;
        if (currency.code === state.rates.baseCurrency) option.selected = true;
        currenciesDropDown.append(option);
    });
};

const renderRatesList = (state, rateList) => {
    rateList.innerHTML = '';
    state.rates.ratesToBase.forEach((rate) => {
        const element = document.createElement('li');
        element.classList.add('list-group-item');
        element.textContent = `1 ${rate.code} = ${rate.value} ${state.rates.baseCurrency}`;
        rateList.append(element);
    });
};

const renderConverterForm = (state, converterForm) => {
    const existFeedback = converterForm.querySelector('#feedback');
    if (existFeedback) existFeedback.remove();
    const converterResult = converterForm.querySelector('#converterResult');
    converterResult.textContent = '';
    switch (state.converter.status) {
        case 'valid': {
            const converterString = converterForm.querySelector('#inputConverterString');
            converterString.classList.remove('is-invalid');
            converterString.classList.add('is-valid');
            converterResult.textContent = `= ${state.converter.result} ${state.converter.to}`;
            break;
        }
        case 'invalid': {
            const invalidMessage = document.createElement('div');
            invalidMessage.textContent = state.converter.error;
            invalidMessage.classList.add('invalid-feedback');
            invalidMessage.id = 'feedback';
            const converterString = converterForm.querySelector('#inputConverterString');
            converterString.after(invalidMessage);
            converterString.classList.add('is-invalid');
            break;
        }
        default:
            break;
    }
};


export default (initState) => {
    const currenciesDropDown = document.querySelector('#rates select');
    const rateList = document.querySelector('#rates ul');
    const converterForm = document.querySelector('#converter form');

    const state = onChange(initState, (path, current, previous) => {
        console.log(`${path}: '${previous}' => '${current}'`);
        switch (path) {
            case 'currencies': {
                renderCurrenciesDropDown(state, currenciesDropDown);
                break;
            }
            case 'rates.baseCurrency': {
                break;
            }
            case 'rates.ratesToBase': {
                renderRatesList(state, rateList);
                break;
            }
            case 'converter.status': 
            case 'converter.result': {
                renderConverterForm(state, converterForm);
                break;
            }
            default:
                break;
        }
    }
    );
    return state;
};
