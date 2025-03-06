import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const VolumeContext = createContext();

function VolumeProvider({ children }) {
    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('volume');
        return savedVolume ? parseFloat(savedVolume) : 0.5;
    });
    const [isMute, setIsMute] = useState(true);

    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
        setIsMute(newVolume <= 0.001);
        localStorage.setItem('volume', newVolume);
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

VolumeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default VolumeProvider;
