// Code in the client-side JavaScript file for the trigger editor
(() => {
    function generateTemplate() {
        var template = `
            <div>
                <button class='slds-button slds-button_brand slds-button_stretch'>
                    Open Editor
                </button>
            </div>
        `;
        document.body.innerHTML = template;
    }

    function handleBreakoutApply(value) {
        // Emit value update to Page Designer host application
        emit({
            type: 'sfcc:value',
            payload: value,
        });
    }

    function handleBreakoutClose({ type, value }) {
        if (type === 'sfcc:breakoutApply') {
            handleBreakoutApply(value);
        }
    }

    function handleBreakoutOpen(data) {
        emit(
            {
                type: 'sfcc:breakout',
                payload: {
                    id: 'richTextEditor',
                    title: 'Super Text Editor',
                },
            },
            handleBreakoutClose
        );
    }

    subscribe('sfcc:ready', ({ value }) => {
        // Once the editor is ready, a `sfcc:breakout` event is sent. Usually
        // this happens when a user clicks on a certain <button> or interacts with the trigger editor in some way
        generateTemplate();
        const openButtonEl = document.querySelector('button');
        openButtonEl.addEventListener('click', () => handleBreakoutOpen(value));
    });
})();
