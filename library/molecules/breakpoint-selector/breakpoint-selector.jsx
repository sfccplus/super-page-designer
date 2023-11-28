import React, { useMemo, useState } from 'react';
import { generateSalt } from 'library/utilities';

export default function BreakPointSelector({ value, onChange, excludeBreakpoints = [] }) {
    const selectorSalt = useMemo(() => generateSalt(3), []);
    const [currentBreakpoint, setCurrentBreakpoint] = useState(value);

    function handleBreakPointChange(event) {
        const newBreakPoint = event.target.value;
        setCurrentBreakpoint(newBreakPoint);
        if (onChange) {
            onChange(newBreakPoint);
        }
    }

    function displayBreakpoint(breakpointName) {
        const breakpoint = excludeBreakpoints.find((value) => value === breakpointName);
        return breakpoint == null;
    }

    return (
        <fieldset className="slds-form-element slds-text-align_center slds-border_bottom slds-p-vertical_x-small slds-m-bottom_small">
            <div className="slds-form-element__control">
                <div className="slds-radio_button-group">
                    {displayBreakpoint('default') && (
                        <span className="slds-button slds-radio_button">
                            <input
                                type="radio"
                                id="default-breakpoint"
                                value="default"
                                name={`breakpoint-${selectorSalt}`}
                                onChange={handleBreakPointChange}
                                checked={currentBreakpoint === 'default'}
                            />
                            <label
                                className="slds-radio_button__label"
                                htmlFor="default-breakpoint"
                            >
                                <span className="slds-radio_faux">Default</span>
                            </label>
                        </span>
                    )}
                    {displayBreakpoint('mobile') && (
                        <span className="slds-button slds-radio_button">
                            <input
                                type="radio"
                                id="mobile-breakpoint"
                                value="mobile"
                                name={`breakpoint-${selectorSalt}`}
                                onChange={handleBreakPointChange}
                                checked={currentBreakpoint === 'mobile'}
                            />
                            <label
                                className="slds-radio_button__label"
                                htmlFor="mobile-breakpoint"
                            >
                                <span className="slds-radio_faux">Mobile</span>
                            </label>
                        </span>
                    )}
                    {displayBreakpoint('tablet') && (
                        <span className="slds-button slds-radio_button">
                            <input
                                type="radio"
                                id="tablet-breakpoint"
                                value="tablet"
                                name={`breakpoint-${selectorSalt}`}
                                onChange={handleBreakPointChange}
                                checked={currentBreakpoint === 'tablet'}
                            />
                            <label
                                className="slds-radio_button__label"
                                htmlFor="tablet-breakpoint"
                            >
                                <span className="slds-radio_faux">Tablet</span>
                            </label>
                        </span>
                    )}
                    {displayBreakpoint('tablet') && (
                        <span className="slds-button slds-radio_button">
                            <input
                                type="radio"
                                id="desktop-breakpoint"
                                value="desktop"
                                name={`breakpoint-${selectorSalt}`}
                                onChange={handleBreakPointChange}
                                checked={currentBreakpoint === 'desktop'}
                            />
                            <label
                                className="slds-radio_button__label"
                                htmlFor="desktop-breakpoint"
                            >
                                <span className="slds-radio_faux">Desktop</span>
                            </label>
                        </span>
                    )}
                </div>
            </div>
        </fieldset>
    );
}
