import React, { useEffect } from 'react';

import { useLazyGetFolderImagesQuery } from '../redux/images-manager-client';
import ImageHolder from './image-holder/image-holder';
import LoadingSpinner from 'library/atoms/loading-spinner/loading-spinner';

export default function ImagesList({ currentFolder }) {
    const [getImages, { data, isFetching, isUninitialized }] =
        useLazyGetFolderImagesQuery();

    useEffect(() => {
        if (currentFolder) {
            getImages(currentFolder);
        }
    }, [currentFolder]);

    if (isFetching || isUninitialized) {
        return <LoadingSpinner />;
    }

    const images = data.map((image, index) => {
        return <ImageHolder key={index} image={image} />;
    });

    return <>{images}</>;
}
