import React, { useEffect, useState } from "react";
import Switch from "react-switch";
import styles from "./number-of-slides-selector.module.scss"
import NumberInput from "library/atoms/numberInput/numberInput";

export default function NumberOfSlidesSelector({ name, value , onChange}) {
    const [autoWidth, setAutoWidth] = useState(value);

    useEffect(() => {
        setAutoWidth(value === 'auto')
    }, [value])

    function handleToggleChange(checkboxStatus) {
        setAutoWidth(checkboxStatus)
        if (checkboxStatus) {
            onChange('auto');
        } else {
            onChange(1);
        }
    }

    function handleValueChange(value, isValid) {
        onChange(value);
    }

    return <>
        <div className={`${styles.autoContainer}`}>
            <label className="slds-form-element__label" htmlFor={name}>
                {name}
            </label>
            <div className={styles.switchContainer}>
                <label className="slds-form-element__label">
                    Auto:
                </label>
                <Switch 
                    uncheckedIcon={false}
                    checkedIcon={false}
                    checked={autoWidth}
                    onChange={handleToggleChange}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    height={20}
                    width={40}
                />
            </div>
        </div>

        {!autoWidth &&
            <NumberInput 
                name={name}
                hideLabel={true}
                value={value}
                onChange={handleValueChange}
            />
        }
    </>
}