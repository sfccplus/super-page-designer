const editorToolbar = require('./editorToolbar');

/**
 * @type {import("tinymce").TinyMCE}
 */
var tinymce = window.tinymce;

const baseConfig = {
    selector: '#editor-textarea',
    promotion: false,
    plugins: 'table link image lists advlist code',
    height: '755px',
    branding: false,
    resize: false,
    menubar: 'edit insert view format table',
    toolbar: editorToolbar,
    convert_urls: false,
    setup: function (editor) {
        editor.on('NodeChange', function () {
            emit({
                type: 'sfcc:value',
                payload: {
                    value: editor.getContent(),
                },
            });
        });
    },
};

/**
 * Init Rich Text Editor
 * @param {Object} config editor config
 */
function initEditor(config) {
    baseConfig.document_base_url = `https://${config.siteHostname}/`;
    baseConfig.images_upload_base_path = config.viewImageURL + '?imagePath=';
    baseConfig.images_upload_url = config.imageUploaderURL;
    baseConfig.content_css = [config.globalCssURL, config.richTextEditorCss];

    if (config.customFontFamilies) {
        baseConfig.font_family_formats = config.customFontFamilies;
    }

    if (config.customFontSizes) {
        baseConfig.font_size_formats = config.customFontSizes;
    }

    tinymce.init(baseConfig);
}

(() => {
    subscribe('sfcc:ready', ({ value, config }) => {
        var text = value ? value.value : '';
        var template = `
            <textarea id='editor-textarea'>${text}</textarea>
        `;
        document.body.innerHTML = template;
        initEditor(config);
    });
})();
