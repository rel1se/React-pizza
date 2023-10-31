import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {PizzaItem, PizzaSliceState, SearchPizzaParams, Status} from "./types";

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}
export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
    'pizza/fetchPizzasStatus',
    async (params) => {
        const {sortBy, currentPage, category, order, search} = params
        const {data} = await axios.get<PizzaItem[]>(
            `https://65212709a4199548356cdcf2.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
        )
        return data
    }
)

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>){
            state.items = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.status = Status.SUCCESS;
                state.items = action.payload
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERROR;
                state.items = []
            })
    }
})


export const {setItems} = pizzasSlice.actions

export default pizzasSlice.reducer