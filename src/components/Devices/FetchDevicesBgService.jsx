import {useEffect} from "react";
import {useStateContext} from "../../contexts/ContextProvider";
import {FETCH_DEVICES_LIST} from "../../config";
import {fetch_get} from "../Utils/AuthenticationUtils";
import {triggerDeviceToastNew, triggerDeviceToastStateChanged} from "../Utils/ToastManager";
import {DEVICE_FETCH_INTERVAL} from "../../data/general_config";

export function FetchDevicesBgService() {


    const {setDevices} = useStateContext();
    let tmpLoading = true
    let deviceArray = []

    const fetch_devices = async () => {

        await fetch_get(FETCH_DEVICES_LIST, (value) => {
            console.log(value)
        }, (value) => {
            console.log(value)
        }).then((retData) => {
            console.log(retData)
            if (retData) {
                retData.forEach((dev) => {
                    const deviceInList = deviceArray.some((old) => old.id === dev.id);

                    if (deviceInList) {
                        const index = deviceArray.findIndex((old) => old.id === dev.id);
                        const statusChanged = deviceArray[index].status !== dev.status;

                        if (statusChanged) {
                            triggerDeviceToastStateChanged(dev);
                            deviceArray[index] = {...dev, status: dev.status};
                        }
                    } else {
                        setDevices((prevDevices) => [...prevDevices, dev]);
                        deviceArray.push(dev);
                        triggerDeviceToastNew(dev);
                    }
                });

                if (tmpLoading) {
                    setDevices(retData)
                }
                tmpLoading = false
            }
        })
    }


    useEffect(() => {
        const bgService = setInterval(() => {

            fetch_devices().catch(() => {
            })
        }, DEVICE_FETCH_INTERVAL)


        return () => clearInterval(bgService);
    }, [])
}