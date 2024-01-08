import React from 'react';
import AddTest from "./AddTest";

class AddMemoryTest extends AddTest {
    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.fetch_test_types('memory').then((result) => {
            console.log(`fetch_test_types returned ${result}`)
        })
            .catch((error) => {
                console.error(`fetch_test_types returned ${error}`)
            });
    }

    render() {
        return this.returnRenderObject(
            <form onSubmit={(event) => {
                this.handleSubmit('cnt_puf', event).then((result) => {
                    console.log(`handleSubmit returned ${result}`)
                })
                    .catch((error) => {
                        console.error(`handleSubmit returned ${error}`)
                    });
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

                <div className="grid md:grid-cols-2 md:gap-6">
                    {this.defineSelectField("test_type", this.state.testTypes)}
                </div>

                <div className="grid grid-cols-3 gap-4 my-8">
                    {this.defineInputField('Initial Value', this.state.values.initialValue, 'initialValue', 'number')}
                    {this.defineInputField('Start Address', this.state.values.startAddress, 'startAddress', 'number')}
                    {this.defineInputField('Stop Address', this.state.values.stopAddress, 'stopAddress', 'number')}
                </div>

                <div className="grid grid-cols-3 gap-4 my-8">
                    {(this.state.values['test_type'] === 'Write Latency' || this.state.values['test_type'] === 'Read Latency') ? this.defineInputField('Data Setup Time', this.state.values.dataSetupTime, 'dataSetupTime', 'number') : ''}

                    {(this.state.values['test_type'] === 'Row Hammering') ? this.defineInputField('Hammer value', this.state.values.hammerValue, 'hammerValue', 'number') : ''}
                    {(this.state.values['test_type'] === 'Row Hammering') ? this.defineInputField('Write iterations', this.state.values.hammerIterations, 'hammerIterations', 'number') : ''}
                    {(this.state.values['test_type'] === 'Row Hammering') ? this.defineInputField('Cell Offset', this.state.values.cellOffset, 'cellOffset', 'number') : ''}

                    {(this.state.values['test_type'] === 'DRAM Retention') ? this.defineInputField('Retention Time', this.state.values.retentionTime, 'retentionTime', 'number') : ''}
                </div>


                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.defineCheckbox(this.state.values.temperatureChecked, 'temperatureChecked', 'Specify ambient temperature')}
                </div>
                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.state.values.temperatureChecked && (
                        this.defineInputField('Temperature', this.state.values.temperature, 'temperature', 'number')
                    )}
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.defineCheckbox(this.state.values.voltageChecked, 'voltageChecked', 'Specify supply voltage')}
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.state.values.voltageChecked && (
                        this.defineInputField('Supply Voltage', this.state.values.voltage, 'voltage', 'number')
                    )}
                </div>

                <div className="grid md:grid-cols-3 md:gap-6 my-4 mt-8">
                    {this.defineCheckbox(this.state.values.multipleIterationsChecked, 'multipleIterationsChecked', 'Specify Number of iterations')}
                </div>

                <div className="grid md:grid-cols-2 md:gap-6 mt-8">
                    {this.state.values.multipleIterationsChecked && (
                        this.defineInputField('Iterations', this.state.values.iterations, 'iterations', 'number')
                    )}
                </div>
                <div className="grid md:grid-cols-3 md:gap-6 my-4 mt-8">

                    <button
                        type="submit"
                        className="bg-black text-white font-bold p-2 rounded-full w-28 outline-none"
                    >
                        Save
                    </button>
                </div>
            </form>, 'Memory'
        )
    }
}

export default AddMemoryTest;
