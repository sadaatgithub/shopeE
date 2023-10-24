import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    variant : []
}

export const variantSlice = createSlice({
    name:"variant",
    initialState,
    reducers:{
        setVariantAttributes:(state,action) =>{
            state.variant = action.payload
        },
        reset:(state) =>{
            state.variant = []
            // console.log("dispatch")
        }
    }
})

export const {setVariantAttributes,reset} = variantSlice.actions
export default variantSlice.reducer