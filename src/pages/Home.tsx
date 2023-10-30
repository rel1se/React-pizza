import React from "react";
import qs from 'qs'

import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'

import Categories from "../components/Categories";
import SortPopup, {sortList} from "../components/SortPopup";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import {setCategoryId, setCurrentPage, setFilters, initialState, selectFilter, Sort} from "../redux/slices/filterSlice";
import {fetchPizzas, SearchPizzaParams, selectPizzaData} from "../redux/slices/pizzasSlice";
import PizzaBlock from "../components/PizzaBlock";
import {useAppDispatch} from "../redux/store";


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const {items,status} = useSelector(selectPizzaData)
    const {categoryId, currentPage, sort, searchValue} = useSelector(selectFilter)

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id))
    }
    const onChangePage = (value: number) => {
        dispatch(setCurrentPage(value))
    }
    const getPizzas = async () => {

        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `search=${searchValue}` : '';

        try {
            dispatch(fetchPizzas({
                currentPage: String(currentPage),
                category,
                sortBy,
                order,
                search
            }))
        }catch (e) {
            alert("Fetch error")
        }
    }
    // React.useEffect(() => {
    //     if (isMounted.current) {
    //         const queryString = qs.stringify({
    //             sortProperty: sort.sortProperty,
    //             categoryId: categoryId > 0,
    //             currentPage,
    //         })
    //
    //         navigate(`?${queryString}`)
    //     }
    //     isMounted.current = true
    //     if (!window.location.search){
    //         dispatch(fetchPizzas({} as SearchPizzaParams))
    //     }
    // }, [categoryId, sort.sortProperty, currentPage]);

    // React.useEffect(() => {
    //     if (window.location.search) {
    //         const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams
    //         const sort = sortList.find((obj) => obj.sortProperty === params.sortBy)
    //         if (initialState.categoryId === Number(params.category)  && initialState.sort.sortProperty === params.sortBy
    //             && initialState.currentPage === Number(params.currentPage)) {
    //             getPizzas();
    //         }
    //         dispatch(
    //             setFilters({
    //                 searchValue: params.search,
    //                 categoryId: Number(params.category),
    //                 currentPage: Number(params.currentPage),
    //                 sort: sort || sortList[0],
    //             }),
    //         );
    //         isSearch.current = true
    //     }
    // }, []);
    React.useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas()
        }
        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
    const pizzas = items.map((obj: any) => (<PizzaBlock key={obj.id} {...obj} />))
    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(id: number) => onClickCategory(id)}/>
                <SortPopup/>
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
