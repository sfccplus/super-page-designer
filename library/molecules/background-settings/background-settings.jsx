import React from 'react';
import ImageInput from 'library/atoms/image-input/image-input';
import Picklist from 'library/atoms/picklist/picklist';
import Toggle from 'library/atoms/toggle/toggle';

export default function BackgroundSettings({ value, onChange }) {
    return (
        <>
            <div className="slds-m-bottom_small">
                <ImageInput
                    name="Background Image"
                    onChange={(value) => onChange('backgroundImage', value)}
                    value={value('backgroundImage')}
                />
            </div>
            <div className="slds-m-bottom_small">
                <Toggle
                    name="Background Repeat"
                    checked={value('backgroundRepeat', true)}
                    onChange={(value) => onChange('backgroundRepeat', value)}
                />
            </div>
            <div className="slds-m-bottom_small">
                <Picklist
                    name="Background Size"
                    onChange={(value) => onChange('backgroundSize', value)}
                    value={value('backgroundSize')}
                    options={[
                        { label: 'Auto', value: 'auto' },
                        { label: 'Contain', value: 'contain' },
                        { label: 'Cover', value: 'cover' },
                    ]}
                />
            </div>
        </>
    );
}
