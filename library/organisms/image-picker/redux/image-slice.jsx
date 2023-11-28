import { createSlice } from '@reduxjs/toolkit';
import { clone } from 'lodash';
import imgManagerHelpers from '../img-manager-helpers';

const initialState = {
    path: '',
    cropData: null,
    quality: 100,
};

function publishState(state) {
    if (window.publishState) {
        const imageURL = imgManagerHelpers.getFinalURL(
            state.path,
            state.cropData,
            state.quality,
        );
        window.publishState(imageURL);
    }
}

export const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers: {
        setCurrentImage: (state, action) => {
            state.path = action.payload;
            state.cropData = null;
            publishState(state);
        },
        setTempCropData: (state, action) => {
            state.tempCropData = action.payload;
        },
        saveCropData: (state) => {
            state.cropData = clone(state.tempCropData);
            state.tempCropData = null;
            publishState(state);
        },
        setQuality: (state, action) => {
            state.quality = action.payload;
            publishState(state);
        },
        resetImage: (state) => {
            state.quality = 100;
            state.cropData = null;
            publishState(state);
        },
    },
});

export const { setCurrentImage, setTempCropData, saveCropData, setQuality, resetImage } =
    imageSlice.actions;

export default imageSlice.reducer;
