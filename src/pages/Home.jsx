import React from "react";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import {Skeleton} from "../components/PizzaBlock/Skeleton";
import Index from "../components/PizzaBlock";


const Home = () => {
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        fetch("https://65212709a4199548356cdcf2.mockapi.io/pizzas").then((res) => {
            return res.json()
        }).then((json) => {
            setItems(json)
            setIsLoading(false)
        })
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="container">
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ?
                        [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                        :
                        items.map((obj) => (
                            <Index key={obj.id}{...obj} />
                        ))
                }
            </div>
        </div>
    )
}

export default Home
