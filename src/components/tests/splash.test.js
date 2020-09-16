import { atLeastOneIsFalse } from '../../containers/splash';
import Splash from '../../containers/splash';
import React from 'react';
import { shallow, mount } from 'enzyme';

test('Splash component renders', () => {
  const wrapper = shallow(<Splash />);
});
