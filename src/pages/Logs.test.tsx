import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Logs} from './Logs';
import {Presets} from '../components/Presets';
import {Settings} from '../components/Settings';
import {LogVars} from '../components/LogVars';
import {Comment} from '../components/Comment';
import {Output} from '../components/Output';

configure({ adapter: new Adapter() });

describe('root App component', () => {
  const rootApp = shallow(<Logs />);

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
