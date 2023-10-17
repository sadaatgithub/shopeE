import { apiSlice } from "../services/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => {
        console.log(args)

        return {
          url: args,
        };
      },
    //   async onQueryStarted({},{dispatch,queryFulfilled}) {
    //     try {
    //         const {data:updatedProduct} = await queryFulfilled
    //         console.log(updatedProduct)
    //         dispatch(productApiSlice.util.updateQueryData('Products',undefined,(draft) =>{
    //             draft.push(updatedProduct)
    //         }))
    //     } catch (error) {
    //         console.log(error)
            
    //     }
    //   },
      
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery, useGetProductByIdQuery,useLazyGetProductsQuery } = productApiSlice;
