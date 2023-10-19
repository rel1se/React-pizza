import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: 'loading' // success | loading | error
}

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async ({currentPage, category, sortBy, order, search}) => {
        const {data} = await axios.get(
            `https://65212709a4199548356cdcf2.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
        )
        return data
    }
)

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action){
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending]: (state, action) => {
            state.status = 'loading'
            state.items = []
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.status = 'success'
            state.items = action.payload
        },
        [fetchPizzas.rejected]: (state, action) => {
            state.status = 'error'
            state.items = []
        }
    }
})

export const {setItems} = pizzasSlice.actions
export default pizzasSlice.reducer

