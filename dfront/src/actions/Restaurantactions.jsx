import axios from 'axios'
import { RESTAURANT_LIST_REQUEST,
    RESTAURANT_LIST_SUCCESS,
    RESTAURANT_LIST_FAIL,
    RESTAURANT_DETAIL_REQUEST,
    RESTAURANT_DETAIL_SUCCESS,
    RESTAURANT_DETAIL_FAIL } from '../constant/Restaurantconstant'
export const listRestaurants=(name)=>async(dispatch)=>{
    try{
        dispatch({type:RESTAURANT_LIST_REQUEST})
        const {data}=await axios.get('/api/restaurants/')
        const fildata=data.filter((i)=>{
            if (name=="")
            {
                return true
            }
            else{
            if(i.name.toLowerCase().includes(name)!==false)
            {
                return true
            }
            else
            {
                return false
            }
        }
        })
        dispatch({
            type:RESTAURANT_LIST_SUCCESS,
            payload:fildata
        })
    }catch(error){
        dispatch({
            type:RESTAURANT_LIST_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.response
        })
    }
}


export const listRestaurantsDetail=(id,name)=>async(dispatch)=>{
    try{
        dispatch({type:RESTAURANT_DETAIL_REQUEST})
        const {data}=await axios.get(`/api/restaurant/${id}`)
        const fildata=data.content.filter((i)=>{
            
            if (name=="")
            {
                return true
            }
            else{
            if(i.name.toLowerCase().indexOf(name)!=-1)
            {
                return true
            }
            else
            {
                return false
            }
        }
    

    })

        
        dispatch({
            type:RESTAURANT_DETAIL_SUCCESS,
            payload:{id: data.id,
            name: data.name,
            description: data.description,
            rating: data.rating,
            time: data.time,
            price: data.price,
            path: data.path,
            content:fildata}
        })
    }catch(error){
        dispatch({
            type:RESTAURANT_DETAIL_FAIL,
            payload:error.response && error.response.data.detail?error.response.data.detail:error.response
        })
    }
}