import React from 'react';
import { shallow } from 'enzyme';
import HasIndex from '../HasIndex';

describe('HasIndex()', () => {
  const MockComponent = () => null;
  MockComponent.displayName = 'MockComponent';
  const MockComponentWithIndex = HasIndex(MockComponent, 'index');

  it('has the expected displayName', () => {
    expect(MockComponentWithIndex.displayName).toBe('HasIndex(MockComponent)');
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MockComponentWithIndex />);
  });

  it('has an initial `index` of 0', () => {
    expect(wrapper.state('index')).toBe(0);
  });

  it('passes `index` state down as an `index` prop', () => {
    expect(wrapper.prop('index')).toBe(0);
    wrapper.setState({ index: 1 });
    expect(wrapper.prop('index')).toBe(1);
  });

  it('has an `index` state of 2 after decrementing from 3', () => {
    wrapper.setState({ index: 3 });
    wrapper.prop('indexDecrement')();
    expect(wrapper.state('index')).toBe(2);
  });

  it('has an `index` state of 1 on increment from 0', () => {
    wrapper.setState({ index: 0 });
    wrapper.prop('indexIncrement')();
    expect(wrapper.state('index')).toBe(1);
  });

  it('has Max Index state after decrementing from 0', () => {
    wrapper.setState({ index: 0 });
    wrapper.prop('indexDecrement')(3);
    expect(wrapper.state('index')).toBe(2);
  });

  it('has 0 Index state after incrementing from maxIndex', () => {
    wrapper.setState({ index: 2 });
    wrapper.prop('indexIncrement')(3);
    expect(wrapper.state('index')).toBe(0);
  });
});
