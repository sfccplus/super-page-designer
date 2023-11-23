import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import styles from './carousel-studio.module.scss';

import NumberOfSlidesSelector from './number-of-slides-selector/number-of-slides-selector';

import BreakPointSelector from 'library/molecules/breakpoint-selector/breakpoint-selector';
import NumberInput from 'library/atoms/numberInput/numberInput';
import Toggle from 'library/atoms/toggle/toggle';
import AutoPlayControl from './auto-play-control/auto-play-control';
import Picklist from 'library/atoms/picklist/picklist';

const DEFAULT_VALUE = {
    loop: false,
    effect: 'slide',
    centeredSlides: false,
    spaceBetween: 0,
    slidesPerView: 'auto',
    breakpoints: {
        tablet: {},
        desktop: {},
    },
};

export default function CarouselStudio({ data }) {
    const [carousel, setCarousel] = useState(JSON.parse(data.value || null));
    const [currentBreakpoint, setCurrentBreakpoint] = useState('default');

    useEffect(() => {
        if (!carousel) {
            setCarousel(DEFAULT_VALUE);
        }
    }, []);

    function handleChange(propertyName, value, isResponsive) {
        if (!isResponsive || currentBreakpoint === 'default') {
            if (!value) {
                delete carousel[propertyName];
            } else {
                carousel[propertyName] = value;
            }
        } else {
            if (!value) {
                delete carousel.breakpoints[currentBreakpoint][propertyName];
            } else {
                carousel.breakpoints[currentBreakpoint][propertyName] = value;
            }
        }

        var newCarousel = cloneDeep(carousel);
        setCarousel(newCarousel);

        emit({
            type: 'sfcc:value',
            payload: {
                value: JSON.stringify(newCarousel),
            },
        });
    }

    function getValue(propertyName, isResponsive) {
        if (!isResponsive || currentBreakpoint === 'default') {
            return carousel[propertyName] || '';
        }

        return carousel.breakpoints[currentBreakpoint][propertyName] || '';
    }

    function handleEffectChange(effect) {
        if (effect === 'fade') {
            handleChange('fadeEffect', { crossFade: true });
        } else {
            handleChange('fadeEffect', null);
        }
        handleChange('effect', effect);
    }

    if (!carousel) return <></>;

    return (
        <div style={{ backgroundColor: 'white' }}>
            <div className={styles.attributesGroup}>
                <div className="slds-m-bottom_x-small">
                    <Picklist
                        name="Slider Effect"
                        value={getValue('effect')}
                        onChange={handleEffectChange}
                        options={[
                            { value: 'slide', label: 'Slide' },
                            { value: 'fade', label: 'Fade' },
                        ]}
                    />
                </div>
                <Toggle
                    name="Infinite Loop ?"
                    checked={getValue('loop')}
                    onChange={(value) => handleChange('loop', value)}
                />
            </div>
            <hr className="slds-m-vertical_small" />
            <BreakPointSelector
                value={currentBreakpoint}
                onChange={setCurrentBreakpoint}
                excludeBreakpoints={['mobile']}
            />
            <div className="slds-m-bottom_x-small">
                <NumberInput
                    name="Gap Between Slides"
                    value={getValue('spaceBetween', true)}
                    onChange={(value) => handleChange('spaceBetween', value, true)}
                />
            </div>
            <div className="slds-m-bottom_x-small">
                <NumberOfSlidesSelector
                    name="Number of Slides shown"
                    value={getValue('slidesPerView', true)}
                    onChange={(value) => handleChange('slidesPerView', value, true)}
                />
            </div>
            <div className="slds-m-bottom_x-small">
                <AutoPlayControl
                    name="Auto Play"
                    value={getValue('autoplay', true)}
                    onChange={(value) => handleChange('autoplay', value, true)}
                />
            </div>
            <div className="slds-m-bottom_x-small">
                <Toggle
                    name="Center Active Slide ?"
                    checked={getValue('centeredSlides', true) || false}
                    onChange={(value) => handleChange('centeredSlides', value, true)}
                />
            </div>
        </div>
    );
}
