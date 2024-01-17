import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const loaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', // Adjust the height based on your needs
};

const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'blue',
};

const LoadingClip = () => {
    return (
        <div style={loaderStyle}>
            <ClipLoader
                color="#ffff00"
                loading={true}
                size={150}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default LoadingClip;