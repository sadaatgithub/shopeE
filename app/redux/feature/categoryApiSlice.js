import { enableExpoCliLogging } from "expo/build/logs/Logs";
import { apiSlice } from "../services/apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
    tagTypes:['category'],
    endpoints:(builder)=>({
        getCategories:builder.query({
            query:() => 'products/categories'
        }),
        getProductsByCategory:builder.query({
            query:(args)=> {
                console.log(args)
                const {type,id} = args 
                return{
                    url:args
                }
                // if(type==='category'){
                //     return {
                //         url:`products/?${type}=${id}`
                //     } 
                // } else return{
                //     url:'products/'
                // }
            }
            
        })
    }),
    overrideExisting:true
})

export const { useGetCategoriesQuery,useGetProductsByCategoryQuery}  = categoryApiSlice;