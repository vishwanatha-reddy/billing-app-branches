import {createStore, combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import userInfoReducer from '../reducers/userInfo/userInfoReducer'
import customersReducer from '../reducers/customers/customersReducer'
import productsReducer from '../reducers/products/productsReducer'
import lineItemsReducer from '../reducers/products/lineItemsReducer'
import billsReducer from '../reducers/bills/billsReducer'

const configureStore=()=>{
    const store=createStore(combineReducers({
        userInfo:userInfoReducer,
        customers:customersReducer,
        products:productsReducer,
        cartItems:lineItemsReducer,
        bills:billsReducer
    }),applyMiddleware(thunk))
    return store
}

export default configureStore