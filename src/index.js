import  './styles.scss';
import  'bootstrap';

import init from './init';
import view from './view';
import app from './app';

const initState = await init();
const state = view(initState);
app(state);
console.log(initState);
