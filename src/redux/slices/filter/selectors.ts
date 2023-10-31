import {RootState} from "../../store";

export const selectFilter = (state: RootState) => state.filter
export const sortFilterValue = (state: RootState) => state.filter.sort