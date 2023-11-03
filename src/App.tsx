import './scss/app.scss'

import {Route, Routes} from "react-router";

import Home from "./pages/Home";
import MainLayout from "./Layouts/MainLayout";
import React, {Suspense} from "react";
import {FullPizzaSkeleton} from "./components/FullPizza/FullPizzaSkeleton";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "./components/FullPizza"))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound"))
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout/>}>
                <Route path="" element={<Home/>}/>
                <Route path="cart" element={
                    <Suspense fallback={<div>Загрузка корзины...</div>}>
                        <Cart/>
                    </Suspense>
                }/>
                <Route path="pizza/:id" element={
                    <Suspense fallback={<div><FullPizzaSkeleton/></div>}>
                        <FullPizza/>
                    </Suspense>
                }/>
                <Route path="*" element={
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <NotFound/>
                    </Suspense>
                }/>
            </Route>
        </Routes>
    );
}

export default App;
