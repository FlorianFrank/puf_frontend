import React from 'react';
import {AddTest} from '../../index';

import {StateContext} from "../../../contexts/ContextProvider";


class AddCNTTest extends AddTest {

    static contextType = StateContext

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetch_test_types('cnt_puf').then((result) => {
            console.log(`fetch_test_types returned ${result}`)
        })
            .catch((error) => {
                console.error(`fetch_test_types returned ${error}`)
            });
    }


    validate = () => {
        let newErrors = {};
        newErrors.title = this.state.values.title ? '' : 'This field is required.';

        newErrors.min_VDS = this.state.values.min_VDS ? '' : 'This field is required.';
        newErrors.max_VDS = this.state.values.max_VDS ? '' : 'This field is required.';
        newErrors.step_VDS = this.state.values.step_VDS ? '' : 'This field is required.';

        newErrors.min_VGS = this.state.values.min_VGS ? '' : 'This field is required.';
        newErrors.max_VGS = this.state.values.max_VGS ? '' : 'This field is required.';
        newErrors.step_VGS = this.state.values.step_VGS ? '' : 'This field is required.';

        this.setState({'errors': newErrors});
        return Object.values(newErrors).every((x) => x === '');
    };


    render() {
        return this.returnRenderObject(
            <form onSubmit={(event) => {
                this.handleSubmit('cnt_puf', event).catch((errorMsg) => {
                    console.log('Error while calling handleSubmit: ', errorMsg)
                })
            }}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="floating_Title"
                        id="floating_Title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder="Title"
                        onChange={this.handleChange('title')}
                        required
                    />
                    <label
                        htmlFor="floating_Title"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                    </label>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    {this.defineSelectField("test_type", this.state.testTypes)}
                </div>

                <div className="grid grid-cols-4 gap-4 my-8">

                    {this.defineInputField('VDS min', this.state.values.min_VDS, 'min_VDS', 'number')}
                    {this.defineInputField('VDS max', this.state.values.max_VDS, 'max_VDS', 'number')}
                    {this.defineInputField('VDS step', this.state.values.step_VDS, 'step_VDS', 'number')}


                    <div className="flex">
                <span
                    className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  Device
                </span>
                        <select
                            id="memory_brand_select"
                            className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                            value={'a'}
                        >
                            {this.context.devices.map(function (device) {
                                return <option key={device.name} value={device.name}>
                                    {device.name}
                                </option>
                            })}

                        </select>
                    </div>


                    {this.defineInputField('VGS min', this.state.values.min_VGS, 'min_VGS', 'number')}
                    {this.defineInputField('VGS max', this.state.values.max_VGS, 'max_VGS', 'number')}
                    {this.defineInputField('VGS step', this.state.values.step_VGS, 'step_VGS', 'number')}
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.defineCheckbox(this.state.values['multipleIterationsChecked'], 'multipleIterationsChecked', 'Specify Number of iterations')}
                    {this.defineCheckbox(this.state.values['useSwitchMatrix'], 'useSwitchMatrix', 'Use Switch Matrix')}
                </div>
                {
                    this.state.values['multipleIterationsChecked'] && (
                        this.defineInputField('Iterations', this.state.values['nrIterations'], 'nrIterations', 'number')
                    )
                }

                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.defineCheckbox(this.state.values.temperatureChecked, 'temperatureChecked', 'Set temperature')}
                </div>
                {
                    this.state.values.temperatureChecked && (
                        this.defineInputField('Temperature', this.state.values.temperature, 'temperature', 'number')

                    )
                }
                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.defineCheckbox(this.state.values.hysteresis, 'hysteresis', 'With hysteresis.')}
                </div>
                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.defineCheckbox(this.state.values['pulsed'], 'pulsed', 'Pulsed measurement.')}
                </div>
                <button
                    type="submit"
                    className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
                >
                    Save
                </button>
            </form>, 'Carbon Nanotube'
        )
    }
}

export default AddCNTTest;