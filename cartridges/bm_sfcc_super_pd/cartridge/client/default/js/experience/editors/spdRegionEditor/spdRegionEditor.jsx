import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { cloneDeep } from 'lodash';

import { generateSalt } from 'library/utilities';

import { getRegionDefinition } from '../spdLayoutEditor/utilities/regionsHandler';
import RegionEditor from './region-editor/region-editor';
import CssHandler from '../spdLayoutEditor/utilities/cssHandler';

function EditorContainer({ cssHandler, value }) {
    const [region, setRegion] = useState(value.region);
    const [currentBreakpoint, setCurrentBreakpoint] = useState('default');

    useEffect(() => {
        if (!region) {
            setRegion(
                getRegionDefinition({
                    key: generateSalt(9),
                }),
            );
        }
    }, []);

    function handleValueChange(propertyName, value) {
        const cssSelector = `.spdlayout-region.region${region.key}`;

        region.breakpoints[currentBreakpoint][propertyName] = value;
        setRegion(cloneDeep(region));

        emit({
            type: 'sfcc:value',
            payload: {
                region,
                regionsRawCss: cssHandler.getRawCss(cssSelector, region),
            },
        });
    }

    return (
        <RegionEditor
            breakpoint={currentBreakpoint}
            region={region}
            onChange={handleValueChange}
            onBreakpointChange={setCurrentBreakpoint}
        />
    );
}

(() => {
    subscribe('sfcc:ready', ({ value, config }) => {
        const template = '<div id="region-editor"></div>';
        document.body.innerHTML = template;

        const cssHandler = new CssHandler(config.breakpointsConfig);

        const root = createRoot(document.querySelector('#region-editor'));
        root.render(<EditorContainer cssHandler={cssHandler} value={value || {}} />);
    });
})();
