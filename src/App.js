import './scss/app.scss'
import pizzas from './assets/pizzas.json'

import React from 'react'

import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Sort from "./components/Sort";
import Categories from "./components/Categories";


function App() {
  return (
      <div className="wrapper">
        <Header/>
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories/>
              <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {
                pizzas.map((obj) => (
                    <PizzaBlock {...obj} />
                ))
              }
            </div>
          </div>
        </div>
      </div>
  );
}

export default App;
