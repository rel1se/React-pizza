import {useParams} from "react-router"
import React from "react"
import axios from "axios";

function FullPizza() {
    const params = useParams()
    const [pizza, setPizza] = React.useState({})
    React.useEffect(() => {
        async function fetchPizza() {
            try{
                const {data}  = await axios.get('https://65212709a4199548356cdcf2.mockapi.io/pizzas/' + params.id)
                setPizza(data)
            }
            catch (e){
                console.error('Pizza fetch error', e)
            }
        }
        fetchPizza()
    }, [])
    if (!pizza){
        return 'Loading...'
    }
    return (
        <div className="container">
            <img src={pizza.imageUrl}/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} ₽</h4>
        </div>
    );
}

export default FullPizza;