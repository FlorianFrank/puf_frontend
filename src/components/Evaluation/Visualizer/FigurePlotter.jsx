import React, {useState, useEffect} from 'react';
import mpld3 from 'mpld3'

const FigurePlotter = ({visualizerJson, fig_name, width, height}) => {

    const mpld3_load_lib = (url, callback) => {
        try {
            var s = document.createElement('script');
            s.src = url;
            s.async = true;
            s.onreadystatechange = s.onload = callback;
            s.onerror = function () {
                console.warn("failed to load library " + url);
            };
            document.getElementsByTagName("head")[0].appendChild(s);
        } catch (e) {
            console.log("ERROR " + e)
        }

    }

    useEffect(() => {
        visualizerJson.width = width
        visualizerJson.height = height
    }, []);

    return (
        <React.Fragment>
            {
                (visualizerJson) ?
                    mpld3_load_lib("https://d3js.org/d3.v5.js", function () {


                        mpld3_load_lib("https://mpld3.github.io/js/mpld3.v0.5.8.js", function () {
                            mpld3.remove_figure(fig_name)
                            mpld3.draw_figure(fig_name, visualizerJson)
                        })
                    }) : ''
            }
        </React.Fragment>
    );
};

export default FigurePlotter;