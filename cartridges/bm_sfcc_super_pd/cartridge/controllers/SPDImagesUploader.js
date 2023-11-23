/* global dw request response */
var File = require('dw/io/File');
var URLUtils = require('dw/web/URLUtils');

/**
 * Upload images for richtext editor
 */
function upload() {
    var params = request.httpParameterMap;
    var libraryId = params.libraryId.value;

    var imagesFolder = [File.LIBRARIES, libraryId, 'default/'].join('/');
    var fileRelPath = 'images/rich-text-editor/';

    var rootFolder = new File(imagesFolder);
    if (!rootFolder.exists()) {
        rootFolder.mkdirs();
    }

    var files = params.processMultipart(function (field, contentType, fileName) {
        fileRelPath += fileName;
        return new File(imagesFolder + fileRelPath);
    });

    if (files) {
        response.setContentType('application/json');
        response.setStatus(200);

        var location = URLUtils.httpsStatic(
            URLUtils.CONTEXT_LIBRARY,
            libraryId,
            fileRelPath
        ).toString();

        response.writer.print(JSON.stringify({ location: fileRelPath }));
    } else {
        response.setStatus(500);
    }
}

upload.public = true;
exports.Upload = upload;
