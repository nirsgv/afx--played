import React from "react";
import PropTypes from "prop-types";


function SwitchButton ({ Text=["Yes", "No"],  disabled=false, val, id, Name, Small, labelText, cb }) {
    const change = e => typeof cb === "function" && cb();
        return (<>
            <label htmlFor={id}>{labelText} </label>
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

// SwitchButton.propTypes = {
//     id: PropTypes.string.isRequired,
//     Text: PropTypes.string.isRequired,
//     Name: PropTypes.string,
//     onChange: PropTypes.func,
//     defaultChecked: PropTypes.bool,
//     Small: PropTypes.bool,
//     currentValue: PropTypes.bool,
//     disabled: PropTypes.bool
// };
export default SwitchButton;