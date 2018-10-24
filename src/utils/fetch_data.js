import axios from 'axios'
export const url = 'http://139.162.39.229'
const corsURL = "";
//Get categories
export const getCategories = (restaurant_id) => {
    return new Promise((resolve,rejects)=>{
        GetMethod(`/categories?q[restaurant_id_eq]=${restaurant_id}&all=true`)
        .then(r=>resolve(r)).catch(err=>rejects(err))
    })
}
export const getCategoryDetails = (id) => {
    return new Promise((resolve,rejects)=>{
        GetMethod(`/categories/${id}}`)
        .then(r=>resolve(r)).catch(err=>rejects(err))
    })
}

//restaurants
export const fetchRestaurants = (page,per_page) => {
    return new Promise((resolve,rejects)=>{
        if(page >= 1 && per_page >= 1){
            GetMethod(`/restaurants?per_page=${per_page}&page=${page}&all=true`)
            .then(r=>resolve(r)).catch(err=>rejects(err))
        }else{
            GetMethod(`/restaurants`)
            .then(r=>resolve(r)).catch(err=>rejects(err))
        }
    })
}
export const fetchRestaurantDetails = (id) => {
    return new Promise((resolve,rejects)=>{
        GetMethod(`/restaurants/${id}`)
        .then(r=>resolve(r)).catch(err=>rejects(err))
    })
}
//Get users

//Api custom
const GetMethod = (path) => {
    return new Promise((resolve,rejects)=>{
        axios.get(`${corsURL}${url}${path}`)
        .then(r=>{
            const data = r.data
            resolve(data)
        }).catch(err=>rejects(err))
    })
}
