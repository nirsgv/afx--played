import React, { useMemo } from 'react';
import Item from './item';

function Items({ trxIds, setPlayerItem }) {
  return (
    <>
      {trxIds.map((item, index) => {
        return (
          <Item key={item.ID} trackID={item.ID} setPlayerItem={setPlayerItem} />
        );
      })}
    </>
  );
}

export default Items;
