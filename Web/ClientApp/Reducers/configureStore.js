import reducers from './index';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunk from "redux-thunk";
export const browserHistory = createHistory();

const middlewares = [thunk, routerMiddleware(browserHistory)];
const storeEnhancers = [];

if(module.hot) {
    // const DevTools = {};// require("../containers/DevTools").default;

    // If the user has the "Redux DevTools" browser extension installed, use that.
    // Otherwise, hook up the in-page DevTools UI component.
    //const debugEnhancer = window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument();

    if(window.devToolsExtension){
        storeEnhancers.push(window.devToolsExtension());
    }

}


const middlewareEnhancer = applyMiddleware(...middlewares);
storeEnhancers.unshift(middlewareEnhancer);

const store = createStore(
  reducers,
  compose(...storeEnhancers)
)

 // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
 if(module.hot) {
     module.hot.accept("./index", () =>
         store.replaceReducer(require("./index").default)
     );
 }

export default store;
