import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import UserReducer from '../Reducers/reducer_user';
import WalletsReducer from '../Reducers/reducer_wallet';
import BuyReducer from '../Reducers/reducer_buy';

const rootReducer = combineReducers({
    routerReducer,
    user: UserReducer,
    wallets: WalletsReducer,
    buy: BuyReducer,
});

export default rootReducer;
