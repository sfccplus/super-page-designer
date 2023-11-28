import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const imagesManagerClient = createApi({
    reducerPath: 'managerClient',
    baseQuery: fetchBaseQuery({
        baseUrl: '',
    }),
    tagTypes: ['Images'],
    endpoints: (builder) => ({
        getLibraryFolders: builder.query({
            query: () => `${window.getLibraryFoldersURL}`,
        }),
        getFolderImages: builder.query({
            query: (folderPath) => {
                const folderComponents = folderPath.split('/');
                const locale = folderComponents.shift();
                folderPath = folderComponents.join('/');

                return `${window.getFolderImagesURL}&locale=${locale}&folderPath=${folderPath}`;
            },
            providesTags: ['Images'],
        }),
        uploadImage: builder.mutation({
            query: ({ folderPath, data }) => {
                const folderComponents = folderPath.split('/');
                const locale = folderComponents.shift();
                folderPath = folderComponents.join('/');

                return {
                    url: `${window.imageUploaderURL}&locale=${locale}&uploadPath=${folderPath}`,
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Images'],
        }),
    }),
});

export const {
    useGetLibraryFoldersQuery,
    useLazyGetFolderImagesQuery,
    useUploadImageMutation,
} = imagesManagerClient;
