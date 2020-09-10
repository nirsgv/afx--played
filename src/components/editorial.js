import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import QuickSlide from './quickSlide';
import Items from './items';
import { editorialData } from '../data/editorial.js';
import PropTypes from 'prop-types';
import ReactGa from 'react-ga';
import BackButton from './backButton';

function Editorial({ ...restProps }) {
  const { name, setPlayerItem, setSpaPageName, history } = restProps;
  const [entranceClassName, setEntranceClassName] = useState(
    'faded-in-from-bottom'
  );

  useEffect(() => {
    setSpaPageName(name);
    ReactGa.event({
      category: 'clicked',
      action: 'simulated a Editorial click',
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Editorial</title>
        <meta name='description' content='This is the editorial page' />
      </Helmet>

      <BackButton history={history} className={'back-btn'} />
      <div
        className={`animate-content ${entranceClassName}`}
        onAnimationEnd={() => setEntranceClassName('')}
      >
        {editorialData.map((list, index) => {
          return (
            <QuickSlide title={list.TITLE} key={index}>
              <Items trxIds={list.ITEMS} setPlayerItem={setPlayerItem} />
            </QuickSlide>
          );
        })}
      </div>
    </>
  );
}

Editorial.propTypes = {
  name: PropTypes.string,
  setPlayerItem: PropTypes.func,
  setSpaPageName: PropTypes.func,
};

export default Editorial;
