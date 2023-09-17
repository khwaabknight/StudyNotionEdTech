import {createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const initialState = {
    cart: localStorage.getItem("cart") 
        ? JSON.parse(localStorage.getItem("cart")) 
        : [],
    total: localStorage.getItem("total") 
        ? JSON.parse(localStorage.getItem("total")) 
        : 0,
    totalItems: localStorage.getItem("totalItems") 
        ? JSON.parse(localStorage.getItem("totalItems")) 
        : 0,
};

const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        addToCart: (state,action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            // If course already exists in the cart, do not modify the quantity
            if(index>=0) {
                toast.error("Course already exists in cart")
                return;
            }
            // If the course is not in the cart, add it to the cart
            state.cart.push(course)
            // Update the total quantity and price
            state.totalItems++
            state.total += course.price
            // update To local storage about cart details
            localStorage.setItem("cart",JSON.stringify(state.cart))
            localStorage.setItem("total",JSON.stringify(state.total))
            localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            // show suuccess toast
            toast.success("Course added to cart")

        },
        removeFromCart: (state,action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            // if course is found in the cart, then remove it
            if(index >= 0)  {
                state.totalItems--
                state.total -= state.cart[index].price
                state.cart.splice(index,1)
                // update to local storage
                localStorage.setItem("cart",JSON.stringify(state.cart))
                localStorage.setItem("total",JSON.stringify(state.total))
                localStorage.setItem("totalItems",JSON.stringify(state.totalItems))
            }
        },
        resetCart: (state) => {
            state.cart = []
            state.total = 0
            state.totalItems = 0

            // Update to local storage
            localStorage.removeItem("cart")
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems")
        }
    },
});

export const {addToCart,removeFromCart,resetCart} = cartSlice.actions;
export default cartSlice.reducer;