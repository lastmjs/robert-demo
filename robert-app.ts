import {html, render} from 'lit-html/lib/lit-extended.js';
import {createStore} from 'redux';
import './robert-cats';

interface State {
    numCats: number;
}

interface Action {
    type: string;
    key?: string;
    value?: any;
}

const InitialState: State = {
    numCats: 0
};

const RootReducer = (state: State = InitialState, action: Action) => {
    if (action.type === 'SET_LOCAL_STATE') {
        return {
            ...state,
            [action.key]: action.value
        };
    }

    return state;
};
const Store = createStore(RootReducer);

class RobertApp extends HTMLElement {
    constructor() {
        super();

        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    increaseCats(e) {
        Store.dispatch({
            type: 'SET_LOCAL_STATE',
            key: 'numCats',
            value: Store.getState().numCats + 1
        });
    }

    render(state: State) {
        return html`
            <button onclick="${(e) => this.increaseCats(e)}">Increase cats</button>

            <robert-cats numCats="${state.numCats}"></robert-cats>
        `;
    }
}

window.customElements.define('robert-app', RobertApp);
