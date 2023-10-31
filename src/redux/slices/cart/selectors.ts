import {CartItem} from "./types";
import {RootState} from "../../store";


export const selectCartItems = (state: RootState) => state.cart
export const selectCartItemByID = (id: string) => (state: RootState) => state.cart.items.find((obj: CartItem) => obj.id === id)