import React from "react";
import qs from 'qs'

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'

import Categories from "../components/Categories";
import Sort, {sortList} from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {SearchContext} from "../App";
import {setCategoryId, setCurrentPage, setFilters, initialState, selectFilter} from "../redux/slices/filterSlice";
import {fetchPizzas, selectPizzaData} from "../redux/slices/pizzasSlice";
import PizzaBlock from "../components/PizzaBlock";


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const {items,status} = useSelector(selectPizzaData)
    const {categoryId, currentPage, sort, searchValue} = useSelector(selectFilter)

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }
    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        try {
            dispatch(fetchPizzas({currentPage, category, sortBy, order,  search}))
        }catch (e) {
            console.error("Fetch error", e)
        }
    }
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage]);

    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            if (initialState.categoryId === Number(params.categoryId) && initialState.sort.sortProperty === params.sortProperty
                && initialState.currentPage === Number(params.currentPage)) {
                getPizzas();
            }
            const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty)
            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true
        }
    }, []);
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map((obj) => (<PizzaBlock key={obj.id}{...obj} />))
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id) => onClickCategory(id)}/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status === 'error' ?
                    <div className="content__error-info">
                        <h2>
                            Ошибка при загрузке пицц <span>😕</span>
                        </h2>
                        <p>
                            Попробуйте снова
                            <br />
                            Видимо на сайте технические проблемы
                        </p>
                        <img src="https://sun9-25.userapi.com/impf/c857224/v857224169/404be/2FOgPOr3Ivk.jpg?size=604x604&quality=96&sign=68b6f31f7357e61b3f069ac18d82d59e&type=album"/>
                    </div> :
                    <div className="content__items">
                        {
                            status === 'loading' ? skeleton : pizzas
                        }
                    </div>
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </div>
    )
}

export default Home
