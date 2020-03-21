
import React from 'react';
import classNames from 'classnames';

class SvgSprite extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.props.onClick && this.onClick.bind(this);
    }

    createIconByType() {
        const {name, classes, path, src} = this.props;
        const viewBox = '0 0 24 24';

            return (
                <svg viewBox={viewBox}>
                    <use xlinkHref={`${src}#${name}`} />
                </svg>
            )
    }

    onClick(event) {
        event.stopPropagation();
        this.props.onClick(event);
    }

    render() {
        const {modifier, text, onMouseLeave, onMouseOver, classes} = this.props;

        return (
            <span
                className={classNames('something', classes)}
                onClick={this.onClick}
                >
            {this.createIconByType()}
            </span>
        );
    }
}

SvgSprite.defaultProps = {
    throttleTimeoutForMouseOver: 300
};

export default SvgSprite;