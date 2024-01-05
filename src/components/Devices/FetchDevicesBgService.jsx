import React, {useEffect, useState} from "react";
import {useStateContext} from "../../contexts/ContextProvider";
import {toast} from "react-toastify";
import {FETCH_DEVICES_LIST} from "../../config";

export function FetchDevicesBgService() {


    const {setDevices} = useStateContext();
    const [isLoading, setIsLoading] = useState(true);

    let tmpLoading = true
    let deviceArray = []
    const triggerDeviceToastNew = (dev) => {
        toast.success(<div>
            <div>Device Detected:</div>
            <div>{dev.name}</div>
            <div>Port: {dev.port}</div>
            <div>Status: {dev.status}</div>
        </div>);
    }

    const triggerDeviceToastStateChanged = (dev) => {
        const inner_div = <div>
            <div>Device status changed:</div>
            <div>{dev.name}</div>
            <div>Port: {dev.port}</div>
            <div>Status: {dev.status}</div>
        </div>
        if (dev.status === 'offline')
            toast.error(inner_div);

        if (dev.status === 'online')
            toast.success(inner_div);
    }

    const fetch_devices = async () => {
        try {
            const res = await fetch(FETCH_DEVICES_LIST);
            const json = await res.json();
            console.log(json)
            json.forEach((dev) => {
                const deviceInList = deviceArray.some((old) => old.id === dev.id);

                if (deviceInList) {
                    const index = deviceArray.findIndex((old) => old.id === dev.id);
                    const statusChanged = deviceArray[index].status !== dev.status;

                    if (statusChanged) {
                        triggerDeviceToastStateChanged(dev);
                        deviceArray[index] = { ...dev, status: dev.status };
                    }
                } else {
                    setDevices((prevDevices) => [...prevDevices, dev]);
                    deviceArray.push(dev);
                    triggerDeviceToastNew(dev);
                }
            });
            if (tmpLoading) {
                setDevices(json)
                setIsLoading(false)
            }

            tmpLoading = false


        } catch (e) {
            console.log("Error " + e)
        }
    }


    useEffect(() => {
        setIsLoading(true)
        const bgService = setInterval(() => {
            // check the condition for running the background service
            // for example, to skip the API call, or whatever
            console.log('Fetch Devices')
            fetch_devices()
        }, 4000)


        function cleanup() {
            clearInterval(bgService)
        }

        return cleanup;
    }, [])
}