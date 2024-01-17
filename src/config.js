// Fetch the VM IP address dynamically.
const VM_IP_ADDRESS = window.location.hostname;
export const BACKEND_IP_ADDRESS = '127.0.0.1'//'132.231.14.120'
export const BACKEND_IP_PORT = 8000
export const BACKEND_BASE_URL = 'http://' + BACKEND_IP_ADDRESS + ':' + BACKEND_IP_PORT

// NATS
export const FETCH_START_NATS = BACKEND_BASE_URL + '/nats/start/'

// Authentication
export const FETCH_REQUEST_TOKEN = BACKEND_BASE_URL + '/token/'

export const FETCH_LOGOUT = BACKEND_BASE_URL + '/authentication/logout/'


// Devices
export const FETCH_DEVICES_LIST = BACKEND_BASE_URL + '/device_manager/get_devices/'

// Tests
export const FETCH_TEST_CATEGORIES = BACKEND_BASE_URL + '/tests/get_test_categories/'
export const FETCH_ADD_TEST = BACKEND_BASE_URL + '/tests/add_test/'
export const FETCH_DEFAULT_VALUES = BACKEND_BASE_URL + '/tests/get_default_values/'
export const FETCH_TEST_TEMPLATE_BY = BACKEND_BASE_URL + '/tests/get_tests/'
export const FETCH_UPLOADED_TESTS = BACKEND_BASE_URL +'/tests/get_uploaded/?type='
export const FETCH_TEST_TEMPLATE = 'http://' + BACKEND_IP_ADDRESS + ':8089/test/tests/'
export const FETCH_TEST_STATE = BACKEND_BASE_URL + '/nats/get_test_status/?filter='
export const FETCH_DOWNLOAD_RESULT = BACKEND_BASE_URL + '/evaluation/download_result/?identifier='
export const FETCH_DELETE_CNT_TEST = BACKEND_BASE_URL + '/tests/delete_test/?testType=CNTTest&id='
export const FETCH_SCHEDULE_TEST = BACKEND_BASE_URL + '/nats/schedule_test/'

// Evaluation
export const FETCH_EVALUATED_DATA = BACKEND_BASE_URL + '/tests/get_evaluated_data/?type='
export const FETCH_START_EVALUATION = BACKEND_BASE_URL + '/evaluation/start_evaluation/'
export const FETCH_EVALUATION_STATUS = BACKEND_BASE_URL + '/evaluation/get_status/'
export const FETCH_EVALUATION_RESULT = BACKEND_BASE_URL + '/evaluation/result/?taskID='
export const FETCH_CONNECTED_MEASUREMENTS = BACKEND_BASE_URL + '/evaluation/get_connected_measurements/?taskID='
export const FETCH_VISUALIZATION_RESULT = BACKEND_BASE_URL + '/evaluation/visualizations/?taskID='
export const FETCH_DELETE_EVALUATION_RESULT = BACKEND_BASE_URL + '/evaluation/delete_result/?taskID='

// Carbon NanoTubes
export const FETCH_WAFER_CONFIG = BACKEND_BASE_URL + '/cnts/get_wafer_configs/'
