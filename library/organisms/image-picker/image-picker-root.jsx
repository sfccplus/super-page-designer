import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import ImagePicker from './image-picker';
import { imagesMangerStore } from './redux/images-manger-store';

import styles from './image-picker.module.scss';

export default function ImagePickerRoot() {
    const [windowHeight, setWindowHeight] = useState(window.top.innerHeight);
    function handleWindowResize(event) {
        setWindowHeight(event.target.innerHeight);
    }

    useEffect(() => {
        window.top.addEventListener('resize', handleWindowResize);

        return () => {
            window.top.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    // 214 is the vertical spacing between the window and the editor container in PD
    const containerHeight = windowHeight - 214;

    return (
        <Provider store={imagesMangerStore}>
            <div className={styles.imagePickerRoot} style={{ height: containerHeight }}>
                <ImagePicker />
            </div>
        </Provider>
    );
}
