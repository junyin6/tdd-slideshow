import { shallow, mount } from 'enzyme';
import React from 'react';
import Carousel from '../Carousel';
import CarouselSlide from '../CarouselSlide';

describe('Carousel', () => {
  let wrapper;
  const slides = [
    {
      imgUrl: 'https://example.com/slide1.png',
      description: 'Slide 1',
      attribution: 'Uno Pizzeria',
    },
    {
      imgUrl: 'https://example.com/slide2.png',
      description: 'Slide 2',
      attribution: 'Dos Equis',
    },
    {
      imgUrl: 'https://example.com/slide3.png',
      description: 'Slide 3',
      attribution: 'Three Amigos',
    },
  ];

  beforeEach(() => {
    wrapper = shallow(<Carousel slides={slides} />);
  });
  // SnapShot does all this
  // it('renders a <div>', () => {
  //   expect(wrapper.type()).toBe('div');
  // });

  // it('renders a CarouselButton labeled "Prev"', () => {
  //   expect(wrapper.find(CarouselButton).at(0).prop('children')).toBe('Prev');
  // });

  // it('renders a CarouselButton labeled "Next"', () => {
  //   expect(wrapper.find(CarouselButton).at(1).prop('children')).toBe('Next');
  // });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the current slide as a CarouselSlide', () => {
    let slideProps;
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({ ...slides[0], ...CarouselSlide.defaultProps });
    wrapper.setState({ slideIndex: 1 });
    slideProps = wrapper.find(CarouselSlide).props();
    expect(slideProps).toEqual({ ...slides[1], ...CarouselSlide.defaultProps });
  });

  it('has an initial "slideIndex" of 0', () => {
    expect(wrapper.state('slideIndex')).toBe(0);
  });

  describe('with the middle slide selected', () => {
    beforeEach(() => {
      wrapper.setState({ slideIndex: 1 });
    });
    it('increments `slideIndex` when Next is clicked ', () => {
      wrapper.find('[data-action="Next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(2);
    });

    it('decrements `slideIndex` when Prev is clicked', () => {
      wrapper.find('[data-action="Prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    });
  });

  describe('with the first slide selected', () => {
    it('wraps to the last slide, when "prev" is clicked', () => {
      wrapper.setState({ slideIndex: 0 });
      wrapper.find('[data-action="Prev"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(slides.length - 1);
    });
  });

  describe('with the last slide selected', () => {
    it('wraps to the first slide, when Next is clicked', () => {
      wrapper.setState({ slideIndex: 2 });
      wrapper.find('[data-action="Next"]').simulate('click');
      expect(wrapper.state('slideIndex')).toBe(0);
    });
  });

  it('passes defaultImg and defaultHeight to CarouselSlide', () => {
    const defaultImg = () => 'default';
    const defaultImgHeight = '100';
    wrapper.setProps({ defaultImg, defaultImgHeight });
    expect(wrapper.find(CarouselSlide).prop('Img')).toBe(defaultImg);
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(
      defaultImgHeight
    );
  });

  it('allows individual slides to override defaultImg and defaultImgHeight', () => {
    const Img = () => 'default';
    const imgHeight = '100';
    wrapper.setProps({ slides: [{ ...slides[0], Img, imgHeight }] });
    expect(wrapper.find(CarouselSlide).prop('Img')).toBe(Img);
    expect(wrapper.find(CarouselSlide).prop('imgHeight')).toBe(imgHeight);
  });
});

describe('CarouselWrapper', () => {
  const CarouselWrapper = Carousel.defaultProps.defaultCarouselWrapper;
  it('renders correctly', () => {
    let mounted = mount(<CarouselWrapper />);
    expect(mounted.find('div')).toMatchSnapshot();
  });
});

describe('ForwardButton', () => {
  const ForwardButton = Carousel.defaultProps.defaultForwardButton;
  const text = 'buttonText';
  it('renders correctly', () => {
    let mounted = mount(<ForwardButton>{text}</ForwardButton>);
    expect(mounted.find('button')).toMatchSnapshot();
  });
});

describe('BackButton', () => {
  const BackButton = Carousel.defaultProps.defaultBackButton;
  const text = 'buttonText';
  it('renders correctly', () => {
    let mounted = mount(<BackButton>{text}</BackButton>);
    expect(mounted.find('button')).toMatchSnapshot();
  });
});
