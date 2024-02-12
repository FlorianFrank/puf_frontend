import React, {Component, useEffect} from 'react';
import {FETCH_ADD_TEST, FETCH_DEFAULT_VALUES, FETCH_LIVE_PLOT_DATA, FETCH_START_EVALUATION} from '../../../config';
import {toast} from "react-toastify";
import {Header} from "../../index";
import {useNavigate} from "react-router-dom";
import {fetch_get, fetch_post} from "../../Utils/AuthenticationUtils";


const NavigatorComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/tests')
    }, []);

    return ''
}

class AddTest extends Component {
    constructor(props) {
        super(props);


        this.state = {
            alertIsSet: false,
            alertMessage: '',
            submitted: false,
            values: {
                title: ''
            },
            errors: {},
            testTypes: [],
            loading: false,
            fields: false,
            selectedOption: '',
        }

    }


    async fetch_test_types(test_type) {
        try {
            console.log('Fetch default test template values for test class' + test_type)
            fetch_get(FETCH_DEFAULT_VALUES + '?testClass=' + test_type, (value) => {
                this.setState({'alertIsSet': value})
            }, (value) => {
                this.setState({'alertMessage': value})
            }).then((retData) => {
                this.setState({values: retData['default_values'], testTypes: retData['test_types']})

            })

        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    }


    triggerAddTestToast = (test) => {
        toast.success(<div>
            <div>Test template added:</div>
            <div>Title: {test.title}</div>
            <div>Type: {test.testType}</div>
        </div>);
    }

    validate = () => {
        return true
    }

    handleNavigate() {
        return this.render()
        // Check if this.props is defined before accessing navigate

    };

    handleSubmit = async (pufType, event) => {

        event.preventDefault();

        try {
            console.log('Save Test');

            if (this.validate()) {
                console.log('Send Post Request:');

                const {values} = this.state;

                await fetch_post(FETCH_ADD_TEST + '?testClass=' + pufType,
                    (value) => this.setState({alertIsSet: value}),
                    (value) => this.setState({alertMessage: value}), values).then((retData) => {
                    if (retData) {
                        console.log('Response Data:', retData);
                        this.triggerAddTestToast(values)
                        this.setState({submitted: true})
                    }
                });

            } else {
                console.log('Input missing');
                this.setState({fields: true});
            }
        } catch (error) {
            console.error('An unexpected error occurred:', error);
        }
    };


    handleChange = (name) => (event) => {
        console.log('🚀 ~ handleChange ~ event:', name, event.target.value);
        this.setState({values: {...this.state.values, [name]: event.target.value}});
    };

    handleChangeChecked = (name) => (event) => {
        this.setState({values: {...this.state.values, [name]: event.target.checked}})
    };

    defineInputField(label, value, value_name, type) {
        return <div className="flex">
                <span
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  {label}
                </span>
            <input
                type={type}
                id="website-admin"
                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                onChange={this.handleChange(value_name)}
            />
        </div>
    }

    defineSelectField(retValueName, optionList) {
        return <div className="relative z-0 w-full mb-6 group">
            <label htmlFor="underline_select" className="sr-only">
                Underline select
            </label>
            <select
                id="underline_select"
                className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                value={this.state.values[retValueName]}
                onChange={this.handleChange(retValueName)}
            >
                <option selected>Select a test type</option>
                {optionList.map((testType) => (
                    <option key={testType.name} value={testType.name}>
                        {testType.name}
                    </option>
                ))}
            </select>
        </div>
    }

    defineCheckbox(checkedValue, checkedValueName, title) {
        return <div className="flex items-center">
            <input
                id="bordered-checkbox-1"
                type="checkbox"
                value=""
                name="bordered-checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100"
                checked={checkedValue}
                onChange={this.handleChangeChecked(checkedValueName)}
            />
            <label
                className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
                {title}
            </label>
        </div>
    }

    returnRenderObject(renderObj, testType) {
        return <div className="m-2 md:m-10 mt-10 p-2 md:p-10 rounded-3xl">
            <Header category="Tests" title={"Add " + testType + " Test"}/>
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-1 flex-col gap-3 lg:pl-3 mt-2 w-full">
                    {renderObj}
                    {(this.state.submitted) ? <NavigatorComponent/> : ''}
                </div>
            </div>
        </div>
    }

}

export default AddTest;
