import { configureStore } from '@reduxjs/toolkit';
import { concat } from 'lodash';

import imagesManagerSlice from './manager-slice';
import imageSlice from './image-slice';
import { imagesManagerClient } from './images-manager-client';

export const imagesMangerStore = configureStore({
    reducer: {
        [imagesManagerClient.reducerPath]: imagesManagerClient.reducer,
        manager: imagesManagerSlice,
        image: imageSlice,
    },
    middleware: (getDefaultMiddleware) => {
        return concat(getDefaultMiddleware(), imagesManagerClient.middleware);
    },
});
