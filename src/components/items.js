import React, { useMemo } from 'react';
import Item from './item';

function Items({ trxIds, setPlayerItem }) {
  return (
    <>
      {trxIds.map((item, index) => {
        return (
          <Item
            key={`${trxIds[index]}-${index}`}
            trackID={item.ID ? item.ID : trxIds[index]}
            setPlayerItem={setPlayerItem}
          />
        );
      })}
    </>
  );
}

export default Items;
