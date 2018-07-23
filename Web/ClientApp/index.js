import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from "./Components/App";
import reducers from './Reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import store, { browserHistory } from './Reducers/configureStore';

//const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
<AppContainer>
		<Provider store={store}>
			<ConnectedRouter history={browserHistory}>
				<App />
			</ConnectedRouter>
    </Provider>
</AppContainer>
    , document.querySelector('#app-root'));

if (module.hot) {
    module.hot.accept();
}


