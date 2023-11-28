import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggleEditor } from '../../redux/manager-slice';
import { setCurrentImage } from '../../redux/image-slice';

import styles from './image-holder.module.scss';

export default function ImageHolder({ image }) {
    const { url, name, path } = image;
    const currentImagePath = useSelector((state) => state.image.path);

    const dispatch = useDispatch();

    function handleEditClick() {
        dispatch(toggleEditor());
    }

    function handleHolderClick() {
        dispatch(setCurrentImage(path));
    }

    function getIsActiveClass() {
        return currentImagePath == path ? styles.active : '';
    }

    return (
        <div onClick={handleHolderClick} className={styles.imageHolder}>
            <div className={`${styles.detailsContainer} ${getIsActiveClass()}`}>
                <div className={styles.imageContainer}>
                    <img src={url} loading="lazy" alt="" />
                </div>
                <div className={styles.nameContainer}>{name}</div>
            </div>
            <div className={styles.actionsBlock}>
                <i onClick={handleEditClick} className="fas fa-edit"></i>
            </div>
        </div>
    );
}
