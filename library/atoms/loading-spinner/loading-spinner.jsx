import React from 'react';
import styles from './loading-spinner.module.scss';

export default function LoadingSpinner() {
    return (
        <div className={styles.loaderContainer}>
            <i className={styles.loaderSpinner}></i>
        </div>
    );
}
