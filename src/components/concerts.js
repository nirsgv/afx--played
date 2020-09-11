import React from 'react';
import List from '../components/list';
import { Link } from 'react-router-dom';
import SvgSprite from './svgSprite';
import PropTypes from 'prop-types';

function Concerts({ venues }) {
  console.log(venues);
  {
    return venues.filter((item) => !!item).length ? (
      <List baseClassName='concerts'>
        {venues.map((item, index, items) => (
          <Link
            to={`/concert/${item && encodeURIComponent(item)}`}
            key={index}
            className={'concerts__link'}
          >
            <span className={'concerts__text'}>{item && item.SHOW_TITLE}</span>
            <SvgSprite classes={'concerts__icon'} name={'LONG_ARROW_RIGHT'} />
          </Link>
        ))}
      </List>
    ) : (
      <h3 className={'expanded-item__none'}>None specified.</h3>
    );
  }
}

Concerts.propTypes = {
  venues: PropTypes.arrayOf(PropTypes.string),
};

export default Concerts;
