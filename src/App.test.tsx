import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';
import { Logs } from './pages/';

configure({ adapter: new Adapter() });

describe('root App component', () => {
  const rootApp = shallow(<App />);

  it(`should have Logs mounted`, () => {
    expect(rootApp.contains(<Logs />)).toBe(true);
  });
});
