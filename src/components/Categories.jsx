import React from 'react'

function Categories() {
    const [category, setCategory] = React.useState(0)
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (<div className="categories">
        <ul>
            {
                categories.map((value, index) => (
                    <li key={index} onClick={() => setCategory(index)} className={category === index ? "active" : ""}>{value}</li>
                ))
            }
        </ul>
    </div>)
}

export default Categories