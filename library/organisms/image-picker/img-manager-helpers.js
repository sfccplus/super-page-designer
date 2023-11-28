const imgManagerHelpers = {
    getFinalURL: function (imagePath, cropData, quality) {
        let baseURL = window.viewImageURL + imagePath;

        if (cropData) {
            baseURL += '&cropX=' + cropData.x.toFixed(3);
            baseURL += '&cropY=' + cropData.y.toFixed(3);
            baseURL += '&cropWidth=' + cropData.width.toFixed(3);
            baseURL += '&cropHeight=' + cropData.height.toFixed(3);
        }

        if (quality && quality != 100) {
            baseURL += '&quality=' + quality;
        }

        return baseURL;
    },
};

export default imgManagerHelpers;
