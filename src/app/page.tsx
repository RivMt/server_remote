"use client"

import ActionButton from "@/app/button";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {SystemInfo} from "../../types/models";
import Message from "@/app/message";

export default function Home() {
    const [server, setServer] = useState('')
    const [messageTitle, setMessageTitle] = useState('')
    const [message, setMessage] = useState('')

    const router = useRouter()
    useEffect(() => {
        getServerInfo().then((response: SystemInfo) => {
            const name = `${response.name} (${response.system} ${response.release})`
            setServer(name)
        })
    }, [router])

    function onPowerOffButtonPressed() {
        postPowerOff().then((response: SystemInfo) => {
            setMessageTitle("Power off")
            setMessage(response.message)
        })
    }

    function onRebootButtonPressed() {
        postReboot().then((response: SystemInfo) => {
            setMessageTitle("Reboot")
            setMessage(response.message)
        })
    }

    return (
    <div>
        <div className="target pane">
            <DevicesOutlinedIcon fontSize="large"/>
            <h2>{server}</h2>
        </div>
        <div className="content pane fill">
            <ActionButton onClick={onPowerOffButtonPressed}>
                <PowerSettingsNewIcon fontSize="large"/>
            </ActionButton>
            <ActionButton onClick={onRebootButtonPressed}>
                <RestartAltOutlinedIcon fontSize="large"/>
            </ActionButton>
        </div>
        <div className="content pane fill-width">
            <Message title={messageTitle} message={message}/>
        </div>
    </div>
    )
}



const getServerInfo = async (): Promise<SystemInfo> => {
    const response = (await fetch("api/v1/system"))
    if (!response.ok) {
        console.error("failed")
        return new SystemInfo("")
    }
    console.log("success")
    return response.json()
}

const postPowerOff = async (): Promise<SystemInfo> => {
    const response = (await fetch("api/v1/system?command=poweroff", {
        "method": "POST"
    }))
    if (!response.ok) {
        console.error("failed")
        return new SystemInfo("")
    }
    console.log("success")
    return response.json()
}

const postReboot = async (): Promise<SystemInfo> => {
    const response = (await fetch("api/v1/system?command=reboot", {
        "method": "POST"
    }))
    if (!response.ok) {
        console.error("failed")
        return new SystemInfo("")
    }
    console.log("success")
    return response.json()
}