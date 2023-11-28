/**
 * Upload images for richtext editor
 */
function upload() {
    var File = require('dw/io/File');
    var URLUtils = require('dw/web/URLUtils');

    var params = request.httpParameterMap;
    var libraryId = params.libraryId.value;
    var locale = params.locale.value;
    var uploadPath = params.uploadPath.value;

    var imagesFolder = [File.LIBRARIES, libraryId, locale].join('/');

    // Create folders in path if they don't exist
    var rootFolder = new File([imagesFolder, uploadPath].join('/'));
    if (!rootFolder.exists()) {
        rootFolder.mkdirs();
    }

    var fileRelPath;
    var files = params.processMultipart(function (field, contentType, fileName) {
        fileRelPath = [uploadPath, fileName].join('/');

        return new File([imagesFolder, fileRelPath].join('/'));
    });

    if (files) {
        response.setContentType('application/json');
        response.setStatus(200);

        response.writer.print(JSON.stringify({ location: fileRelPath }));
    } else {
        response.setStatus(500);
    }
}
upload.public = true;
exports.Upload = upload;

function getLibraryFolders() {
    var File = require('dw/io/File');

    var params = request.httpParameterMap;
    var libraryId = params.libraryId.value;

    var rootPath = [File.LIBRARIES, libraryId].join('/');

    function getSubFolders(parentPath, folderName, depth) {
        var folderPath = [parentPath, folderName]
            .filter((pathElement) => !!pathElement)
            .join('/');

        var folderData = {
            id: folderPath,
            name: folderName,
        };

        if (depth == 0) return folderData;

        var folder = new File([rootPath, folderPath].join('/'));

        var subfolders = folder
            .listFiles(function (file) {
                return file.isDirectory();
            })
            .toArray();

        if (subfolders.length) {
            folderData.children = subfolders.map(function (subfolder) {
                return getSubFolders(folderPath, subfolder.name, depth - 1);
            });
        }

        return folderData;
    }

    var result = getSubFolders('', '', 10);
    var subfolders = result && result.children ? result.children : [];

    // Create folders in path if they don't exist
    if (!subfolders.length) {
        var defaultPath = [File.LIBRARIES, libraryId, 'default'].join('/');
        var rootFolder = new File(defaultPath);
        if (!rootFolder.exists()) {
            rootFolder.mkdirs();
        }
    }

    response.setContentType('application/json');
    response.setStatus(200);
    response.writer.print(JSON.stringify(subfolders));
}
getLibraryFolders.public = true;
exports.GetLibraryFolders = getLibraryFolders;

function getFolderImages() {
    var File = require('dw/io/File');
    var URLUtils = require('dw/web/URLUtils');
    var params = request.httpParameterMap;

    var libraryId = params.libraryId.value;
    var locale = params.locale.value;
    var folderPath = params.folderPath.value;

    var folderAbsolutePath = [File.LIBRARIES, libraryId, locale, folderPath].join('/');

    var folder = new File(folderAbsolutePath);
    var files = folder
        .listFiles(function (file) {
            return !file.isDirectory();
        })
        .toArray();

    var images = files.map(function (file) {
        var pathComponents = file.path.split('/');
        pathComponents.shift();

        var imagePath = pathComponents.join('/');

        return {
            name: file.name,
            path: imagePath,
            url: URLUtils.imageURL(URLUtils.CONTEXT_LIBRARY, libraryId.ID, imagePath, {
                quality: 60,
                scaleWidth: 230,
            }).toString(),
        };
    });

    response.setContentType('application/json');
    response.setStatus(200);
    response.writer.print(JSON.stringify(images));
}
getFolderImages.public = true;
exports.GetFolderImages = getFolderImages;
