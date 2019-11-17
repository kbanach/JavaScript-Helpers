import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import App from './App';
import Presets from './components/Presets/Presets';
import Settings from './components/Settings/Settings';
import LogVars from './components/LogVars/LogVars';
import Comment from './components/Comment/Comment';
import Output from './components/Output/Output';


describe('root App component', () => {
  const rootApp = shallow(<App />);

  console.log(rootApp.debug());
  it(`should have Presets mounted`, () => {
    expect(rootApp.contains(<Presets />)).toBe(true);
  });


  it(`should have Settings mounted`, () => {
    expect(rootApp.contains(<Settings />)).toBe(true);
  });


  it(`should have LogVars mounted`, () => {
    expect(rootApp.contains(<LogVars />)).toBe(true);
  });


  it(`should have Comment mounted`, () => {
    expect(rootApp.contains(<Comment />)).toBe(true);
  });


  it(`should have Output mounted`, () => {
    expect(rootApp.contains(<Output />)).toBe(true);
  });
});
