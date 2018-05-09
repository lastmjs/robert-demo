import {html, render} from 'lit-html/lib/lit-extended.js';
import {createStore} from 'redux';

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

class RobertCats extends HTMLElement {
    // static get observedAttributes() {
    //     return ['num-cats'];
    // }
    //
    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (name === 'num-cats') {
    //         this.numCats = newValue;
    //     }
    // }

    get numCats(): number {
        return Store.getState().numCats;
    }

    set numCats(val: number) {
        Store.dispatch({
            type: 'SET_LOCAL_STATE',
            key: 'numCats',
            value: val
        });
    }

    constructor() {
        super();

        Store.subscribe(() => render(this.render(Store.getState()), this));
        Store.dispatch({
            type: 'DEFAULT_ACTION'
        });
    }

    render(state: State) {
        return html`
            <div>
                Robert has ${state.numCats} cats!
            </div>
        `;
    }
}

window.customElements.define('robert-cats', RobertCats);
