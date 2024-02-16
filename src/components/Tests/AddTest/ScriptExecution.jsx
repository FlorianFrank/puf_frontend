import React, {useEffect, useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import {Header} from "../../index";
import {useNavigate} from "react-router-dom";
import {fetch_post} from "../../Utils/AuthenticationUtils";
import {FETCH_ADD_TEST} from "../../../config";
import {triggerAddTestToast} from "../../Utils/ToastManager";
import {Alert} from "@mui/lab";


const ScriptExecution = ({options}) => {
    const [values, setValues] = useState({ script: getCode() });
    const [alertIsSet, setAlertIsSet] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const navigate = useNavigate();

    const getCode = (e) => {
        return 'def init:\n' +
            '    pass\n' +
            '\n' +
            'def execute:\n' +
            '    pass\n' +
            '\n' +
            'def done:\n' +
            '    pass'
    }

    useEffect(() => {
        setValues({script: getCode()})
    }, [])

    const handleChange = (name) => (event) => {
        console.log('🚀 ~ handleChange ~ event:', name, event.target.value);
        setValues({...values, [name]: event.target.value})
    };

    const handleCodeChange = (value, name) => {
        console.log('🚀 ~ handleChange ~ event:', name, value);
        setValues({...values, [name]: value})
    };


    const returnRenderObject = (renderObj, testType) => {
        return <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
            <Header category="Tests" title={"Add " + testType + " Test"}/>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-1 flex-col gap-3 lg:pl-3 mt-2 w-full">
                    {renderObj}
                </div>
            </div>
        </div>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Handle Submit ", values)
        try {
            await fetch_post(FETCH_ADD_TEST + '?testClass=script',
                (value) => setAlertIsSet(value),
                (value) => setAlertMessage(value),
                values).then((retData) => {
                if (retData) {
                    console.log('Response Data:', retData);
                    triggerAddTestToast(values)
                    navigate('/tests')
                }
            });
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };

    const editorDidMount = (editor, monaco) => {
        console.log('editorDidMount', editor);
        editor.focus();
    }

    if (alertIsSet)
        return <Alert severity="error">{alertMessage}</Alert>

    return returnRenderObject(
        <form onSubmit={(event) => handleSubmit(event)}>
            <div className="relative z-0 w-full mb-6 group">
                <input
                    type="text"
                    name="floating_Title"
                    id="floating_Title"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    onChange={handleChange('type')}
                    required
                />
                <label
                    htmlFor="floating_Title"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                    Title
                </label>
            </div>


            <div className="relative z-0 w-full mb-6 group">
                <MonacoEditor
                    width="800"
                    height="600"
                    language="python"
                    theme="vs-bright"
                    value={getCode()}
                    options={options}
                    onChange={(value,) => handleCodeChange(value, 'script')}
                    editorDidMount={editorDidMount}/>
            </div>

            <button
                type="submit"
                className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
            >
                Send Script
            </button>
        </form>
        , 'Script');
}

export default ScriptExecution;