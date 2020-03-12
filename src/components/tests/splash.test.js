import {
    atLeastOneIsFalse,
} from '../splash';
import Splash from '../splash';
import React from 'react';
import { shallow, mount } from 'enzyme';

test('evaluate comparitors - functions used for filtering, correctly', () => {
    console.log(atLeastOneIsFalse(false,false));
    const wrapper = shallow(<Splash isTracksDataLocal={false} isShowsDataLocal={false}/>);

});