import React from 'react';
import PropTypes from 'prop-types';


function List({baseClassName,children, ...rest}) {
    return (
        <section className={`${baseClassName}__wrap`}>
            <ul className={`${baseClassName}__list`}>
                {Array.isArray(children) && children.map((item, index) => item ? <li className={`${baseClassName}__item`} key={index} {...rest}>{item}</li> : null)}
            </ul>
        </section>
    )
}

List.defaultProps = {
    baseClassName: 'list',
};

List.propTypes = {
    baseClassName: PropTypes.string,
    children: PropTypes.node,
};


export default List;