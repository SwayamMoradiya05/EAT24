import {legacy_createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { restaurantListReducer,restaurantDetailReducer } from './reducers/Restaurantreducer'
import { cartReducer } from './reducers/Cartreducers'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userUpdateProfileReducer} from'./reducers/Userreducers'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer } from './reducers/Orderreducers'
const reducer=combineReducers({
    restaurantList:restaurantListReducer,
    restaurantDetail:restaurantDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,
})
const cartItemsFromStorage=localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]

const userInfoFromStorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):null

const shippingAddressFromStorage=localStorage.getItem("shippingAddress")?JSON.parse(localStorage.getItem("shippingAddress")):{}

const initialState={cart:
    {cartItems:cartItemsFromStorage,
shippingAddress:shippingAddressFromStorage},
userLogin:{userInfo:userInfoFromStorage}}


const middleware=[thunk]


const store=legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store