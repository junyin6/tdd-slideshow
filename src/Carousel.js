import React from 'react';
import CarouselButton from './CarouselButton';
import CarouselSlide from './CarouselSlide';
import PropTypes from 'prop-types';
class Carousel extends React.PureComponent {
  static propTypes = {
    slides: PropTypes.arrayOf(PropTypes.shape(CarouselSlide.propTypes))
      .isRequired,
    defaultImgHeight: CarouselSlide.propTypes.imgHeight,
    defaultImg: CarouselSlide.propTypes.Img,
  };

  static defaultProps = {
    defaultImgHeight: CarouselSlide.defaultProps.imgHeight,
    defaultImg: CarouselSlide.defaultProps.Img,
  };

  state = {
    slideIndex: 0,
  };

  handlePrevClick = () => {
    const { slides } = this.props;
    this.setState(({ slideIndex }) => ({
      slideIndex: (slides.length + slideIndex - 1) % this.props.slides.length,
    }));
  };
  handleNextClick = () => {
    this.setState(({ slideIndex }) => ({
      slideIndex: (slideIndex + 1) % this.props.slides.length,
    }));
  };

  render() {
    const { slides, defaultImgHeight, defaultImg, ...rest } = this.props;
    return (
      <div {...rest}>
        <CarouselSlide
          Img={defaultImg}
          imgHeight={defaultImgHeight}
          {...slides[this.state.slideIndex]}
        />
        <CarouselButton data-action="Prev" onClick={this.handlePrevClick}>
          Prev
        </CarouselButton>
        <CarouselButton data-action="Next" onClick={this.handleNextClick}>
          Next
        </CarouselButton>
      </div>
    );
  }
}

export default Carousel;
