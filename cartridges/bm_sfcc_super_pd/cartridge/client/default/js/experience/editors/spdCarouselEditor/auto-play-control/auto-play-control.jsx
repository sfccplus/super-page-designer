import React, { useEffect, useState } from 'react';
import Switch from 'react-switch';
import styles from './auto-play-control.module.scss';
import NumberInput from 'library/atoms/numberInput/numberInput';

export default function AutoPlayControl({ name, value, onChange}) {
    const [autoPlay, setAutoPlay] = useState(!!value);

    useEffect(() => {
        setAutoPlay(!!value);
    }, [value]);

    function handleToggleChange(checkboxStatus) {
        setAutoPlay(checkboxStatus);
        onChange(checkboxStatus ? { delay: 3000 } : null);
    }

    function handleValueChange(value) {
        onChange(value ? { delay: value } : null);
    }

    return (
        <>
            <div className={`${styles.autoContainer}`}>
                <label className="slds-form-element__label" htmlFor={name}>
                    {name}
                </label>
                <div className={styles.switchContainer}>
                    <Switch
                        uncheckedIcon={false}
                        checkedIcon={false}
                        checked={autoPlay}
                        onChange={handleToggleChange}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        height={20}
                        width={40}
                    />
                </div>
            </div>

            {autoPlay && (
                <NumberInput
                    name={'Delay'}
                    hideLabel={true}
                    value={value.delay}
                    onChange={handleValueChange}
                />
            )}
        </>
    );
}
