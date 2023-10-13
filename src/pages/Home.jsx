import React from "react";
import {useDispatch, useSelector} from "react-redux";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {setCategoryId} from "../redux/slices/filterSlice";


const Home = () => {
    const dispatch = useDispatch()
    const {categoryId, sort} = useSelector(state => state.filter)

    const {searchValue} = React.useContext(SearchContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [currentPage, setCurrentPage] = React.useState(1)
    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    React.useEffect(() => {
        setIsLoading(true)

        const order = sort.sortProperty.includes('-') ? "asc" : "desc"
        const sortBy = sort.sortProperty.replace('-', '')
        const category = categoryId > 0 ? `category=${categoryId}` : ''
        const search = searchValue ? `search=${searchValue}` : ''

            fetch(`https://65212709a4199548356cdcf2.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}
        `).then((res) => {
                return res.json()
            }).then((json) => {
                setItems(json)
                setIsLoading(false)
            })
            window.scrollTo(0, 0)
    }, [categoryId, sort.sortProperty, searchValue, currentPage])
    const skeleton =  [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map((obj) => (<Index key={obj.id}{...obj} />))
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => onClickCategory(id)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? skeleton : pizzas
                }
            </div>
            <Pagination onChangePage={(i) => setCurrentPage(i)}/>
        </div>
    )
}

export default Home
