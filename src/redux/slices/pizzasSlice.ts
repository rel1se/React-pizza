import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../store";


type PizzaItem = {
    imageUrl: string;
    price: number;
    title: string;
    types: number[];
    sizes: number[];
    info: number[];
}
export type SearchPizzaParams = {
    currentPage: string;
    category: string;
    sortBy: string;
    order: string;
    search: string;
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'

}
interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}
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
export const selectPizzaData = (state: RootState) => state.pizza

export default pizzasSlice.reducer

