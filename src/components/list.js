import React from 'react';


function List({baseClassName,children}) {
    return (
        <section className={`${baseClassName}__wrap`}>
            <ul className={`${baseClassName}__list`}>
                {Array.isArray(children) && children.map((item, index) => <li className={`${baseClassName}__item`} key={index}>{item}</li>)}
            </ul>
        </section>
    )
}

export default List;