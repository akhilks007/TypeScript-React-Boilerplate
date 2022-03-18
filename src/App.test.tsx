import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App component', () => {
  const wrapper = shallow(<App />);
  it('Should render correctly', () => {
    expect(wrapper.getElements()).toMatchSnapshot();
  });
});
