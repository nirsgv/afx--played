import React, { useMemo } from 'react';
import Item from './item';

function Items({ tracksFiltered, setPlayerItem }) {
  return (
    <>
      {tracksFiltered.map((item, index) => {
        return (
          <Item key={item.ID} trackData={item} setPlayerItem={setPlayerItem} />
        );
      })}
    </>
  );
}

export default Items;
