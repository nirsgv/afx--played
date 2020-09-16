import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount } from 'enzyme';
import rootReducer from './reducers';
import { createStore } from 'redux';
const store = createStore(rootReducer);

const setup = (props = {}, state = null) => {
  return mount(<App store={props} />);
};

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

it.skip('renders without crashing', () => {
  const wrapper = setup(store);
  const componentApp = findByTestAttr(wrapper, 'component-app');
  const splashRoot = findByTestAttr(wrapper, 'splash-root');

  expect(componentApp.length).toBe(1);
  expect(splashRoot.length).toBe(1);

  //const div = document.createElement('div');
  //ReactDOM.render(<App />, div);
  //ReactDOM.unmountComponentAtNode(div);
});
