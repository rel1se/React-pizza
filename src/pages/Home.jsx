import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";
import Pagination from "../components/Pagination";


const Home = ({searchValue}) => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0)
    const [currentPage, setCurrentPage] = React.useState(1)
    const [sortType, setSortType] = React.useState({
        name: "популярности",
        sortProperty: "rating"
    })
    React.useEffect(() => {
        setIsLoading(true)

        const order = sortType.sortProperty.includes('-') ? "asc" : "desc"
        const sortBy = sortType.sortProperty.replace('-', '')
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
    }, [categoryId, sortType, searchValue, currentPage])
    const skeleton =  [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map((obj) => (<Index key={obj.id}{...obj} />))
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
                <Sort value={sortType} onChangeSort={(sortProperty) => setSortType(sortProperty)}/>
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
