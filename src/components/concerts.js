import React, { useEffect, useState } from 'react';
import List from '../components/list';
import { Link } from 'react-router-dom';
import SvgSprite from './svgSprite';
import PropTypes from 'prop-types';

function ConcertLink({ concertId }) {
  const [concertData, setConcertData] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    mfasync(concertId);
  }, [concertId]);

  const mfasync = async (concertId) => {
    await setLoader(true);
    await fetch(window.location.origin + '/api/show/' + concertId)
      .then((response) => response.json())
      .then((data) => {
        setConcertData(data[0]);
      });
    setLoader(false);
  };
  return (
    <Link
      to={`/concert/${concertId && encodeURIComponent(concertId)}`}
      key={concertId}
      className={'concerts__link'}
    >
      <span className={'concerts__text'}>
        {concertData && concertData.SHOW_TITLE}
      </span>
      <SvgSprite classes={'concerts__icon'} name={'LONG_ARROW_RIGHT'} />
    </Link>
  );
}

function Concerts({ concertIds }) {
  console.log(concertIds);
  {
    return concertIds.filter((item) => !!item).length ? (
      <List baseClassName='concerts'>
        {concertIds.map((concertId, index, items) => (
          <ConcertLink concertId={concertId} key={concertId} />
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
