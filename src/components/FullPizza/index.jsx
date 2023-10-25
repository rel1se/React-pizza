import {useParams} from "react-router"
import React from "react"
import axios from "axios";
import styles from './FullPizza.module.css'
import {addCartItem, selectCartItemByID} from "../../redux/slices/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {sizeTypes, typeNames} from "../PizzaBlock";
import {useNavigate} from "react-router-dom";

function FullPizza() {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = React.useState()
    const [activePizzaType, setActivePizzaType] = React.useState(0)
    const [activePizzaSize, setActivePizzaSize] = React.useState(0)
    const cartItem = useSelector(selectCartItemByID(params.id))


    React.useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://65212709a4199548356cdcf2.mockapi.io/pizzas/' + params.id)
                setPizza(data)
            } catch (e) {
                alert('Pizza fetch error')
                navigate("/")
            }
        }

        fetchPizza()
    }, [])
    const addedCount = cartItem ? cartItem.count : 0

    const onClickAdd = () => {
        const item = {
            ...pizza,
            type: typeNames[activePizzaType],
            size: sizeTypes[activePizzaSize]
        }
        dispatch(addCartItem(item))
    }
    if (!pizza) {
        return 'Loading...'
    }
    return (
        <div className="container">
            <div className={styles.pizzaInfo}>
                <img className={styles.pizzaImage} src={pizza.imageUrl} alt="Пицца"/>
                <div className={styles.pizzaDetails}>
                    <h1 className={styles.pizzaName}>Пицца {pizza.title}</h1>
                    <p className={styles.pizzaPrice}>от {pizza.price} ₽</p>
                    <ul className={styles.feature}>
                        <li>
                            <div className={styles.featureLeft}>Энерг. ценность</div>
                            <div className={styles.featureRight}>{pizza.info[0]} ккал</div>
                        </li>
                        <li>
                            <div className={styles.featureLeft}>Белки</div>
                            <div className={styles.featureRight}>{pizza.info[1]} г</div>
                        </li>
                        <li>
                            <div className={styles.featureLeft}>Жиры</div>
                            <div className={styles.featureRight}>{pizza.info[2]} г</div>
                        </li>
                        <li>
                            <div className={styles.featureLeft}>Углеводы</div>
                            <div className={styles.featureRight}>{pizza.info[3]} г</div>
                        </li>
                    </ul>
                    <div className="pizza-block__selector">
                        <ul>
                            {
                                pizza.types.map((typeId) => (
                                    <li key={typeId} onClick={() => setActivePizzaType(typeId)} className={activePizzaType === typeId ? "active" : ""}>{typeNames[typeId]}</li>
                                ))
                            }
                        </ul>
                        <ul>
                            {
                                pizza.sizes.map((size, index) => (
                                    <li key={index} onClick={() => setActivePizzaSize(index)} className={activePizzaSize === index ? "active" : ""}>{size} см.</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div onClick={onClickAdd} className="button button--outline button--add">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Добавить</span>
                            {addedCount > 0 && <i>{addedCount}</i>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullPizza;