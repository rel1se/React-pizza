import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, action){
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem){
                findItem.count++
            }
            else{
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id)
            if (findItem){
                findItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
        },
        removeCartItem(state, action){
            state.items = state.items.filter((obj) => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
        },
        clearCart(state){
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const {addCartItem, removeCartItem, minusItem, clearCart} = cartSlice.actions
export default cartSlice.reducer

