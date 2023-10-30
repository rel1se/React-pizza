import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";


export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
}
interface CartSliceState {
    totalPrice: number;
    items: CartItem[]
}
const initialState: CartSliceState = {
    totalPrice: 0,
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem(state, action: PayloadAction<CartItem>){
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
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
        minusItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id && obj.size === action.payload.size && obj.type === action.payload.type)
            if (findItem){
                findItem.count--
            }
            state.totalPrice = state.items.reduce((sum, obj) => (obj.price * obj.count) + sum, 0)
        },
        removeCartItem(state, action: PayloadAction<string>){
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

export const selectCartItems = (state: RootState) => state.cart
export const selectCartItemByID = (id: string) => (state: RootState) => state.cart.items.find((obj: CartItem) => obj.id === id)
export default cartSlice.reducer

