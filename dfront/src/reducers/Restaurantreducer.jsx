 import { RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_DETAIL_REQUEST,
    RESTAURANT_DETAIL_SUCCESS,
    RESTAURANT_DETAIL_FAIL } from '../constant/Restaurantconstant'
 export const restaurantListReducer=(state={restaurants:[]},action)=>{
    switch(action.type){
        case RESTAURANT_LIST_REQUEST:
            return{loading:true,restaurants:[]}
        case RESTAURANT_LIST_SUCCESS:
            return{loading:false,restaurants:action.payload}
        case RESTAURANT_LIST_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}

export const restaurantDetailReducer=(state={restaurant:[]},action)=>{
    switch(action.type){
        case RESTAURANT_DETAIL_REQUEST:
            return{loading:true,...state}
        case RESTAURANT_DETAIL_SUCCESS:
            return{loading:false,restaurant:action.payload}
        case RESTAURANT_DETAIL_FAIL:
            return{loading:false,error:action.payload}
        default:
            return state
    }
}