export type PizzaItem = {
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
export interface PizzaSliceState {
    items: PizzaItem[];
    status: Status;
}