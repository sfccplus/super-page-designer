import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop';

import { setTempCropData } from '../../redux/image-slice';

export default function ImageCrop({ imagePath }) {
    const dispatch = useDispatch();
    const cropData = useSelector((state) => state.image.cropData);
    const tempCropData = useSelector((state) => state.image.tempCropData);

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    function handleOnCropComplete(croppedArea, croppedAreaPixels) {
        dispatch(setTempCropData(croppedAreaPixels));
    }

    const imageURL = window.viewImageURL + imagePath;
    return (
        <Cropper
            crop={crop}
            onCropChange={setCrop}
            zoom={zoom}
            onZoomChange={setZoom}
            image={imageURL}
            onCropComplete={handleOnCropComplete}
            initialCroppedAreaPixels={tempCropData || cropData}
        />
    );
}
