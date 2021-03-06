import React from 'react';
import { shallow, mount } from 'enzyme';
import CarouselSlide from '../CarouselSlide';
import styled from 'styled-components';

describe('CarouselSlide', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CarouselSlide
        imgUrl="https://example.com/default.jpg"
        description="Default test image"
      />
    );
  });
  /*
//Snapshot does all of this 
  it('renders a <figure>', () => {
    expect(wrapper.type()).toBe('figure');
  });

  it('renders an <img> and <figcaption> as children', () => {
    expect(wrapper.childAt(0).type()).toBe(CarouselSlide.defaultProps.Img);
    expect(wrapper.childAt(1).type()).toBe('figcaption');
  });

  it('passes "imgUrl" to <img>', () => {
    const imgUrl = 'https://example.com/image.png';
    wrapper.setProps({ imgUrl });
    const img = wrapper.find(CarouselSlide.defaultProps.Img);
    expect(img.prop('src')).toBe(imgUrl);
  });
  it('passes "description" to <strong> in <figcaption>', () => {
    const description = 'what did I tell you';
    const attribution = 'Jun Yin';
    wrapper.setProps({ description, attribution });
    expect(wrapper.find('figcaption strong').text()).toBe(description);
    expect(wrapper.find('figcaption').text()).toBe(
      `${description} ${attribution}`
    );
  });
  */
  it('renders correctly', () => {
    wrapper.setProps({
      description: 'description',
      attribution: 'attribution',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('passes other props to <figure>', () => {
    const onClick = () => {};
    const style = {};
    const className = 'carousel-slide';

    wrapper.setProps({ onClick, style, className });

    expect(wrapper.prop('onClick')).toBe(onClick);
    expect(wrapper.prop('style')).toBe(style);
    expect(wrapper.prop('className')).toBe(className);
  });
});

describe('Img', () => {
  const imgUrl = 'https//whatever.com/123';
  const Img = CarouselSlide.defaultProps.Img;
  let mounted;
  beforeEach(() => {
    mounted = mount(<Img src={imgUrl} imgHeight={500} />);
  });

  //these two are the only required ones 1) SnapShot 2) Dynamic CSS that depends on props
  it('renders correctly', () => {
    expect(mounted.find('img')).toMatchSnapshot();
  });

  it('uses the imgHeight as Height style property', () => {
    expect(mounted).toHaveStyleRule('height', '500px');
    mounted.setProps({ imgHeight: 'calc(100vh - 100px)' });
    expect(mounted).toHaveStyleRule('height', 'calc(100vh - 100px)');
  });
  /*
//SnapShot 'renders correctly' does all of this 
  it('renders an <img> with the given src', () => {
    expect(mounted.containsMatchingElement(<img src={imgUrl} />)).toBe(true);
  });


  it('has the expected styles', () => {
    expect(mounted).toHaveStyleRule('width', '100%');
    expect(mounted).toHaveStyleRule('object-fit', 'cover');
    expect(mounted).toHaveStyleRule('height', '500px');
  });
*/

  //optional
  it('allows styles to be overriden', () => {
    const TestImg = styled(Img)`
      object-fit: contain;
      width: 500px;
      height: 100vh;
    `;
    mounted = mount(
      <CarouselSlide Img={TestImg} imgUrl={imgUrl} description="required" />
    );

    expect(mounted.find(TestImg)).toHaveStyleRule('width', '500px');
    expect(mounted.find(TestImg)).toHaveStyleRule('object-fit', 'contain');
    expect(mounted.find(TestImg)).toHaveStyleRule('height', '100vh');
  });
});
