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
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
            if (findItem){
                findItem.count++
            }
            else{
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum, obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        minusItem(state, action) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.type === action.payload.type && obj.size === action.payload.size)
            if (findItem){
                findItem.count--
            }
            state.totalPrice = state.totalPrice - action.payload.price
        },
        removeCartItem(state, action){
            state.items = state.items.filter((obj) => obj.id !== action.payload && obj.type !== action.payload.type && obj.size !== action.payload.size)
        },
        clearCart(state){
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const {addCartItem, removeCartItem, minusItem, clearCart} = cartSlice.actions
export default cartSlice.reducer

