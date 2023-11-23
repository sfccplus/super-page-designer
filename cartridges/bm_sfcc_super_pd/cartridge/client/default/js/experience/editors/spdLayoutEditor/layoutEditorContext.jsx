import React, { createContext, useReducer } from 'react';
import { getInitialContainerDefinition } from './utilities/regionsHandler';
import { generateSalt } from 'library/utilities';

/**
 * @type {import('./utilities/cssHandler').default} CssHandler
 */
let cssHandlerInstance;

const defaultEditorState = {
    initialSetupDone: false,
};

// Emit value update to Page Designer host application
function handleStateChanges(editorState) {
    emit({
        type: 'sfcc:value',
        payload: editorState,
    });
}

export const EditorContext = createContext();

function editorActionsReducer(state, action) {
    let editorState;
    switch (action.type) {
        case 'initialSetup': {
            const layoutKey = generateSalt(9);
            const layoutSelector = `.spdlayout-container.layout-${layoutKey}`;
            const container = getInitialContainerDefinition(action.value);

            editorState = {
                ...state,
                layoutKey,
                container,
                initialSetupDone: true,
                containerRawCss: cssHandlerInstance.getRawCss(layoutSelector, container),
            };

            break;
        }
        case 'updateContainer': {
            const container = action.value;
            const layoutKey = state.layoutKey;
            const layoutSelector = `.spdlayout-container.layout-${layoutKey}`;

            editorState = {
                ...state,
                container: container,
                containerRawCss: cssHandlerInstance.getRawCss(layoutSelector, container),
            };
            console.log(editorState.containerRawCss);
            break;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }

    handleStateChanges(editorState);
    return editorState;
}

export const LayoutEditorContext = ({ children, initialValue, cssHandler }) => {
    const [editorState, dispatch] = useReducer(
        editorActionsReducer,
        initialValue || defaultEditorState,
    );

    cssHandlerInstance = cssHandler;

    const value = { editorState, dispatch };
    return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};
