import React from "react";
import Switch from "react-switch";
import styles from "./toggle.module.scss"

export default function Toggle({ name, checked, onChange }) {
    return (
        <div className={styles.switchContainer}>
            <label className="slds-form-element__label">{name}</label>
            <Switch
                uncheckedIcon={false}
                checkedIcon={false}
                checked={checked}
                onChange={onChange}
                onColor="#86d3ff"
                onHandleColor="#2693e6"
                height={20}
                width={40}
            />
        </div>
    );
}
