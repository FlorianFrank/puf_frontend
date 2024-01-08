import React, {useState} from 'react';
import {Header} from '../../index';
import MonacoEditor from 'react-monaco-editor';
import AddTest from "./AddTest";

class ScriptExecution extends AddTest {

    constructor(props) {
        super(props);
    }

    getCode(e) {
        return 'def init:\n' +
            '    pass\n' +
            '\n' +
            'def execute:\n' +
            '    pass\n' +
            '\n' +
            'def done:\n' +
            '    pass'
    }

    render() {
        return this.returnRenderObject(
            <form onSubmit={(event) => {
                this.handleSubmit('cnt_puf', event)
            }}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_Title"
                        id="floating_Title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        onChange={this.handleChange('title')}
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
                        value={this.getCode()}
                        options={this.props.options}
                        onChange={this.onChange}
                        editorDidMount={this.editorDidMount}
                    /></div>

                <button
                    type="submit"
                    className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
                >
                    Send Script
                </button>
            </form>
            , 'Script');
    }
}

export default ScriptExecution;
