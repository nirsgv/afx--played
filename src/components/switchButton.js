import React, { Component } from "react";
import PropTypes from "prop-types";

class SwitchButton extends Component {
    state = {
        checked: this.props.defaultChecked
    };
    onChange = e => {
        this.setState({
            checked: e.target.checked
        });
        if (typeof this.props.cb === "function") this.props.cb();
    };
    render() {
        return (
            <div
                className={"toggle-switch" + (this.props.Small ? " small-switch" : "")}
            >
                <input
                    type="checkbox"
                    name={this.props.Name}
                    className="toggle-switch-checkbox"
                    id={this.props.id}
                    checked={this.props.val}
                    defaultChecked={this.props.val}
                    onChange={this.onChange}
                    disabled={this.props.disabled}
                />
                {this.props.id ? (
                    <label className="toggle-switch-label" htmlFor={this.props.id}>
            <span
                className={
                    this.props.disabled
                        ? "toggle-switch-inner toggle-switch-disabled"
                        : "toggle-switch-inner"
                }
                data-yes={this.props.Text[0]}
                data-no={this.props.Text[1]}
            />
                        <span
                            className={
                                this.props.disabled
                                    ? "toggle-switch-switch toggle-switch-disabled"
                                    : "toggle-switch-switch"
                            }
                        />
                    </label>
                ) : null}
            </div>
        );
    }
    // Set text for rendering.
    static defaultProps = {
        Text: ["Yes", "No"]
    };
}

SwitchButton.propTypes = {
    id: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    Name: PropTypes.string,
    onChange: PropTypes.func,
    defaultChecked: PropTypes.bool,
    Small: PropTypes.bool,
    currentValue: PropTypes.bool,
    disabled: PropTypes.bool
};
export default SwitchButton;