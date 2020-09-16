import React from 'react';
import SvgSprite from '../components/svgSprite';

function Splash({ name = 'APHEX' }) {
  return (
    <>
      <section className='splash' data-test='splash-root'>
        <SvgSprite classes={'splash-icon animate-opacity '} name={name} />
      </section>
    </>
  );
}

export default Splash;
