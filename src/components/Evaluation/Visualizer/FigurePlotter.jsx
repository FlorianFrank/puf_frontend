import React, {useEffect} from 'react';
import mpld3 from 'mpld3'

const FigurePlotter = ({visualizerJson, fig_name, width, height}) => {

    const mpld3_load_lib = (url, callback) => {
        try {
            let script = document.createElement('script');
            script.src = url;
            script.async = true;
            script.onreadystatechange = script.onload = callback;
            script.onerror = function () {
                console.warn(`Failed to load library ${url}`);
            };
            document.head.appendChild(script);
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    useEffect(() => {
        visualizerJson.width = width
        visualizerJson.height = height
    }, []);

    return (
        <React.Fragment>
            {
                (visualizerJson) ?
                    mpld3_load_lib("https://d3js.org/d3.v7.js", function () {


                        mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.10.js", function () {
                            mpld3.remove_figure(fig_name)
                            mpld3.draw_figure(fig_name, visualizerJson)
                        })
                    }) : ''
            }
        </React.Fragment>
    );
};

export default FigurePlotter;