import {toast} from "react-toastify";
import React from "react";

export const triggerDeviceToastNew = (dev) => {
    toast.success(<div>
        <div>Device Detected:</div>
        <div>{dev.name}</div>
        <div>Port: {dev.port}</div>
        <div>Status: {dev.status}</div>
    </div>);
}

export const triggerDeviceToastStateChanged = (dev) => {
    const innerDiv = <div>
        <div>Device status changed:</div>
        <div>{dev.name}</div>
        <div>Port: {dev.port}</div>
        <div>Status: {dev.status}</div>
    </div>

    if (dev.status === 'offline') {
        toast.error(innerDiv);
    } else if (dev.status === 'online') {
        toast.success(innerDiv);
    }
}

export const triggerStartTestToast = (test) => {
    toast.success(<div>
        <div>Test added to waiting queue :</div>
        <div>Name: {test.title}</div>
    </div>);
}