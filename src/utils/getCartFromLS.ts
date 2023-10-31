import {calcTotalPrice} from "./calcTotalPrice";
import {CartItem} from "../redux/slices/cart/types";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const cartItems = data ? JSON.parse(data) : []
    const totalPrice = calcTotalPrice(cartItems)
    return {
        items: cartItems as CartItem[],
        totalPrice,
    }
}