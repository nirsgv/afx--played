import React from "react";
import PropTypes from "prop-types";

function SwitchButton ({ Text=["Yes", "No"],  disabled=false, val, id, Name, Small, labelText, cb }) {
    const change = e => typeof cb === "function" && cb();
        return (<>
            <label htmlFor={id} className={'toggle-switch-label'}>{labelText} </label>
            <div className={"toggle-switch" + (Small ? " small-switch" : "")}>
                <input
                    type="checkbox"
                    name={Name}
                    className="toggle-switch-checkbox"
                    id={id}
                    checked={val}
                    onChange={change}
                    disabled={disabled}
                />
                {id ? (
                    <label className="toggle-switch-label" htmlFor={id}>

            <span
                className={
                    disabled
                        ? "toggle-switch-inner toggle-switch-disabled"
                        : "toggle-switch-inner"
                }
                data-yes={Text[0]}
                data-no={Text[1]}
            />
                        <span
                            className={
                                disabled
                                    ? "toggle-switch-switch toggle-switch-disabled"
                                    : "toggle-switch-switch"
                            }
                        />
                    </label>
                ) : null}
            </div>
            </>
        );
}

SwitchButton.propTypes = {
    Text: PropTypes.array,
    disabled: PropTypes.bool,
    val: PropTypes.string,
    id: PropTypes.string,
    Name: PropTypes.string,
    Small: PropTypes.bool,
    labelText: PropTypes.string,
    cb: PropTypes.func
};
export default SwitchButton;