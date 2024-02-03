import React, {createContext, useContext, useState} from 'react';

export const StateContext = createContext();

const initialState = {
    userProfile: false,
    notification: false
};

export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);

    const [socket, setSocket] = useState(null);
    const [isSocketOpen, setIsSocketOpen] = useState(false);

    const [heatmapSocket, setHeatmapSocket] = useState(null);

    const [devices, setDevices] = useState([]);
    const [connectedDevices, setConnectedDevices] = useState([]);

    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [isInsertedHighlighted, setIsInsertedHighlighted] = useState(false);
    const [insertedCount, setInsertedCount] = useState(0);
    const [userMenuVisible, setUserMenuVisible] = useState(false);
    const [notificationMenuVisible, setNotificationMenuVisible] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const [waferConfig, setWaferConfig] = useState([]);

    const [testTemplates, setTestTemplates] = useState([]);

    const [selectedVisualizationProperties, setSelectedVisualizationProperties] = useState({});


    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
    };

    const handleClick = (clicked) =>
        setIsClicked({...initialState, [clicked]: true});
    return (
        <StateContext.Provider
            value={{
                isInsertedHighlighted,
                setIsInsertedHighlighted,
                insertedCount,
                setInsertedCount,
                activeMenu,
                setActiveMenu,
                currentColor,
                setSocket,
                socket,
                isSocketOpen,
                setIsSocketOpen,
                devices,
                setDevices,
                connectedDevices,
                setConnectedDevices,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                heatmapSocket,
                setHeatmapSocket,
                setUserMenuVisible,
                userMenuVisible,
                notificationMenuVisible,
                setNotificationMenuVisible,
                waferConfig,
                setWaferConfig,
                setTestTemplates,
                testTemplates,
                selectedVisualizationProperties,
                setSelectedVisualizationProperties
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
