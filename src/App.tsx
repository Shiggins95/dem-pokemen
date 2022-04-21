import React from 'react';
import './App.css';
import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './redux/reducers';
import { Provider } from 'react-redux';
import PokemonView from './views/pokemon-view';
declare const window: { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any };
const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middleware)),
);

function App() {
    return (
        <Provider store={store}>
            <PokemonView />
        </Provider>
    );
}

export default App;
