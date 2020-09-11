import React from 'react';
import SvgSprite from './svgSprite';
import List from './list';

function ExternalLinks({ links = {}, blockClassName = '' }) {
  const linksOrdered = Object.assign(
    {},
    {
      YOUTUBE: links.YOUTUBE,
      SPOTIFY: links.SPOTIFY,
      APPLE: links.APPLE,
      DEEZER: links.DEEZER,
    }
  );
  return (
    <nav className='links__wrap'>
      <List baseClassName={blockClassName}>
        {linksOrdered &&
          typeof linksOrdered === 'object' &&
          Object.keys(linksOrdered).map((platform, index) => {
            let link = linksOrdered[platform];
            return (
              <a
                href={link}
                target='blank'
                rel='noopener noreferrer'
                className={`${blockClassName}__link ${blockClassName}__link--${
                  link !== 'null' ? 'active' : 'disabled'
                }`}
                key={index}
              >
                <SvgSprite
                  classes={`${blockClassName}__icon ${blockClassName}__icon--${platform.toLowerCase()}`}
                  alt={platform}
                  name={platform}
                />
              </a>
            );
          })}
      </List>
    </nav>
  );
}

export default ExternalLinks;
