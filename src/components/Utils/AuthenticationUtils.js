import axios from "axios";

const showAlert = (setAlertIsSet, setAlertMessage, message) => {
    setAlertIsSet(true);
    setAlertMessage(message);
};

const fetchMethod = async (method, url, setAlertIsSet, setAlertMessage, data) => {
    try {
        const accessToken = localStorage.getItem('access_token');

        if (!accessToken) {
            showAlert(setAlertIsSet, setAlertMessage, 'Permission denied');
            return null;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        };

        let res;

        switch (method) {
            case 'POST':
                res = await axios.post(url, JSON.stringify(data), config);
                break;
            case 'GET':
                res = await axios.get(url, config);
                break;
            case 'DELETE':
                res = await axios.delete(url, data ? {...config, data: JSON.stringify(data)} : config);
                break;
            default:
                showAlert(setAlertIsSet, setAlertMessage, 'Invalid HTTP method');
                return null;
        }

        if (res.status === 200) {
            return res.data;
        } else {
            showAlert(setAlertIsSet, setAlertMessage, `Permission denied - Status: ${res.status}`);
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert(setAlertIsSet, setAlertMessage, `Error: ${error.message}`);
    }

    return null;
};

export const fetch_post = async (url, setAlertIsSet, setAlertMessage, data) => {
    return fetchMethod('POST', url, setAlertIsSet, setAlertMessage, data);
};

export const fetch_get = async (url, setAlertIsSet, setAlertMessage) => {
    return fetchMethod('GET', url, setAlertIsSet, setAlertMessage, null);
};

export const fetch_delete = async (url, setAlertIsSet, setAlertMessage, data) => {
    return fetchMethod('DELETE', url, setAlertIsSet, setAlertMessage, data);
};