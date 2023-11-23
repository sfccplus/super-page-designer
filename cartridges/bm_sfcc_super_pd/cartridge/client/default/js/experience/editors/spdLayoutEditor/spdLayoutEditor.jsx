import React, { useContext } from 'react';
import { createRoot } from 'react-dom/client';

import QuickSetup from './components/quickSetup/quickSetup';
import { EditorContext, LayoutEditorContext } from './layoutEditorContext';
import ContainerEditor from './components/containerEditor/containerEditor';
import CssHandler from './utilities/cssHandler';

function SpdLayoutEditor() {
    const { editorState } = useContext(EditorContext);

    if (!editorState.initialSetupDone) {
        return <QuickSetup />;
    }

    return <ContainerEditor container={editorState.container} />;
}

function EditorContainer({ value, cssHandler }) {
    return (
        <LayoutEditorContext cssHandler={cssHandler} initialValue={value}>
            <SpdLayoutEditor />
        </LayoutEditorContext>
    );
}

(() => {
    subscribe('sfcc:ready', ({ value, config }) => {
        const rootElement = document.createElement('div');
        document.body.append(rootElement);

        const cssHandler = new CssHandler(config.breakpointsConfig);

        const root = createRoot(rootElement);
        root.render(<EditorContainer cssHandler={cssHandler} value={value} />);
    });
})();
