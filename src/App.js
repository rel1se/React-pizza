import './scss/app.scss'

import React from 'react'
import {Route, Routes} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

export const SearchContext = React.createContext({})


function App() {
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path="/" element={
                        <Home/>
                    }>
                    </Route>
                    <Route path="/cart" element={
                        <Cart/>
                    }>
                    </Route>
                    <Route path="*" element={
                        <NotFound></NotFound>
                    }>
                    </Route>
                </Routes>
            </div>
        </div>
    );
}

export default App;
