import React, {Component, Children} from 'react';
import Icon from './icon';
import classNames from 'classnames';
import LazyLoad from 'react-lazy-load';

const calcMaxTranslateX = (sliderItemsWidth, sliderWidth, factor) => {
    return factor * (sliderItemsWidth - sliderWidth);
};

class Slider extends Component {
    constructor(props) {
        super(props);

        this.renderNavigation = this.renderNavigation.bind(this);
        this.onPrevClick = this.onPrevClick.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.rerenderOnTransitionEnd = this.rerenderOnTransitionEnd.bind(this);
        this.getTranslateX = this.getTranslateX.bind(this);
        this.isDisableNext = this.isDisableNext.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.setNavigationAvailability = this.setNavigationAvailability.bind(this);
        this.slide = this.slide.bind(this);
        this.renderChildren = this.renderChildren.bind(this);
        this.resetSliderLocation = this.resetSliderLocation.bind(this);

        this.state = {
            translateX: 0,
            rerenderOnTransitionEnd: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.resetTranslateXState && this.props.showNavigation && this.props.children.length > 0 && nextProps.children.length > 0 && this.props.children[0].key !== nextProps.children[0].key) {
            this.resetSliderLocation();
        } else {
            this.setNavigationAvailability();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.resetTranslateXState && !this.props.showNavigation && this.props.children.length > 0 && prevProps.children.length > 0 && this.props.children[0].key !== prevProps.children[0].key) {
            this.resetSliderLocation();
        }
    }

    resetSliderLocation() {
        if (this.props.showNavigation) {
            this.slide(0);
        } else {
            this.sliderItemsContainer.scrollLeft = 0;
        }
    }


    render() {
        const {showNavigation, isLazyLoad, lazyLoadProps, translateXDelta} = this.props;
        const {translateX} = this.state;
        const className = classNames('lci-slider', {'lci-slider--with-navigation': showNavigation});
        const {debounce = false, ...restLazyLoadProps} = lazyLoadProps;

        let component = (
            <div
                className={className}
                ref={(el) => {
                    this.slider = el;
                }}>
                {this.renderNavigation()}
                <div
                    className='lci-slider__items-container'
                    ref={(el) => {
                        this.sliderItemsContainer = el;
                    }}>
                    <div
                        className='lci-slider-items'
                        onTransitionEnd={this.rerenderOnTransitionEnd}
                        ref={(el) => {
                            this.sliderItems = el;
                        }}
                        style={{transform: `translateX(${translateX}px)`}}>
                        {this.renderChildren()}
                    </div>
                </div>
            </div>);

        if (isLazyLoad) {
            component = (
                <LazyLoad
                    onContentVisible={this.setNavigationAvailability}
                    className='lci-slider-lazy-load'
                    debounce={debounce}
                    {...restLazyLoadProps} >
                    {component}
                </LazyLoad>);
        }

        return component;
    }

    renderChildren() {
        const {children, isLazyLoad, lazyLoadProps, translateXDelta} = this.props;
        const {debounce = false, offsetHorizontal = translateXDelta, ...restLazyLoadProps} = lazyLoadProps;
        let renderedChildren;

        if (isLazyLoad) {
            renderedChildren = Children.map(children, (child, i) => {
                const key = child.props.uniqueKey || i;

                return (
                    <LazyLoad
                        className='lci-slider-item-lazy-load'
                        key={key}
                        debounce={debounce}
                        offsetHorizontal={offsetHorizontal}
                        {...restLazyLoadProps}>{child}</LazyLoad>);
            });
        } else {
            renderedChildren = children;
        }

        return renderedChildren;
    }

    componentDidMount() {
        window.addEventListener('resize', this.onWindowResize);
        this.setNavigationAvailability(this.state.translateX);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onWindowResize);
    }

    onWindowResize() {
        this.setNavigationAvailability(this.state.translateX);
    }

    onPrevClick() {
        this.slide(this.getTranslateX(false));
    }

    rerenderOnTransitionEnd() {
        this.setState({
            rerenderOnTransitionEnd: true
        });
    }

    onNextClick() {
        this.slide(this.getTranslateX(true));
    }

    slide(translateX) {
        this.setState({translateX});
        this.setNavigationAvailability(translateX);
    }

    setNavigationAvailability(translateX = this.state.translateX) {
        this.setState({
            isDisablePrev: this.isDisablePrev(translateX),
            isDisableNext: this.isDisableNext(translateX)
        });
    }

    getTranslateX(isNext) {
        const {translateXDelta} = this.props;
        const factor = isNext ? -1 : 1;

        let translateX;
        const calculatedTranslateX = this.state.translateX + (factor * translateXDelta);

        if (isNext) {
            translateX = Math.max(calculatedTranslateX, calcMaxTranslateX(this.sliderItems.clientWidth, this.slider.clientWidth, factor));
        } else {
            translateX = Math.min(0, calculatedTranslateX);
        }

        return translateX;
    }

    isDisableNext(translateX) {
        const sliderItems = this.sliderItems || {};
        const slider = this.slider || {};

        return Math.abs(translateX) >= calcMaxTranslateX(sliderItems.clientWidth, slider.clientWidth, 1);
    }

    isDisablePrev(translateX) {
        return translateX === 0;
    }

    renderNavigation() {
        const {showNavigation, prevIconProps, nextIconProps} = this.props;
        const {isDisablePrev, isDisableNext} = this.state;
        const arrowBaseClass = 'lci-navigation-arrow';

        const prevClassName = classNames(arrowBaseClass, `${arrowBaseClass}--prev`, {[`${arrowBaseClass}--disabled`]: isDisablePrev});
        const nextClassName = classNames(arrowBaseClass, `${arrowBaseClass}--next`, {[`${arrowBaseClass}--disabled`]: isDisableNext});

        return showNavigation && (
            <div className='lci-slider__navigation'>
                <div
                    className={prevClassName}
                    onClick={isDisablePrev ? null : this.onPrevClick}>
                    {prevIconProps ? <Icon {...prevIconProps} /> : <span>&#x3c;</span>}
                </div>
                <div
                    className={nextClassName}
                    onClick={isDisableNext ? null : this.onNextClick}>
                    {nextIconProps ? <Icon {...nextIconProps} /> : <span>&#x3e;</span>}
                </div>
            </div>);
    }
}

Slider.defaultProps = {
    isLazyLoad: false,
    lazyLoadProps: {},
    showNavigation: false,
    translateXDelta: 250,
    resetTranslateXState: false
};

export default Slider;