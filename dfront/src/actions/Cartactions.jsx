import axios from "axios";
import { CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD } from '../constant/Cartconstant'
export const addtocart=(rid,mid,qty)=>async(dispatch,getState)=>{
const {data}=await axios.get(`/api/restaurant/${rid}`)
const fildata=data.content.filter((i)=>{
    if(i.id==mid)
    {
        return true
    }
    else
    {
        return false
    }
    
})

dispatch({
    type:CART_ADD_ITEM,
    payload:{
        restaurantname:data.name,
        restaurantid:fildata[0].restaurant,
        id:fildata[0].id,
        name:fildata[0].name,
        image:fildata[0].img,
        price:fildata[0].price,
        quantity:parseInt(qty)
}
},[dispatch])
localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}
export const removefromcart=(id)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    })
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress=(data)=>(dispatch )=>{
    dispatch({
        type:CART_SAVE_SHIPPING_ADDRESS,
        payload:data,
    })
    localStorage.setItem("shippingAddress",JSON.stringify(data))
}
export const savePaymentMethod=(data)=>(dispatch )=>{
    dispatch({
        type:CART_SAVE_PAYMENT_METHOD,
        payload:data,
    })
    localStorage.setItem("paymentMethod",JSON.stringify(data))
}
