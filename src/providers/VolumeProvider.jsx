import React, { createContext, useContext, useState } from 'react';
import PropType from 'prop-types';

const VolumeContext = createContext();

function VolumeProvider({ children }) {
    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('volume');
        return savedVolume ? parseFloat(savedVolume) : 0.5;
    });
    const [isMute, setIsMute] = useState(true);

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);

        localStorage.setItem('volume', newVolume);
        console.log('volume: ' + volume);
    };

    const toggleMute = () => {
        setIsMute(!isMute);
    };

    return (
        <VolumeContext.Provider value={{ volume, isMute, handleVolumeChange, toggleMute }}>
            {children}
        </VolumeContext.Provider>
    );
}

export const useVolume = () => useContext(VolumeContext);

VolumeProvider.prototype = {
    children: PropType.node.isRequired,
};

export default VolumeProvider;
