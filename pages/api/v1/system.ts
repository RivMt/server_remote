import type {NextApiRequest, NextApiResponse} from "next";

import {SystemInfo} from "../../../types/models";
import {Method, StatusCode} from "../../../types/constants";
import {Systeminformation} from "systeminformation";
import OsData = Systeminformation.OsData;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SystemInfo>) {

    let func: () => Promise<[number, SystemInfo]>
    switch (req.method) {
        case Method.get:
        default:
            func = getSystemInfo
            break
        case Method.post:
            func = powerOff
            break
    }
    if (func !== null) {
        const value = await func()
        res.status(value[0]).json(value[1])
        return
    }
    res.status(StatusCode.internalServerError).json(new SystemInfo(""))
}

async function getSystemInfo(): Promise<[number, SystemInfo]> {
    const si = require("systeminformation")
    const data: OsData = await si.osInfo()
    return [
        StatusCode.success,
        new SystemInfo(
            "",
            data.hostname,
            data.platform,
            data.release,
            data.build,
        )
    ]
}

async function powerOff(): Promise<[number, SystemInfo]> {
    // Get system info to select shell and command
    let info = (await getSystemInfo())[1]
    let shell: string, command: string
    const platform = info.system.toLowerCase()
    if (platform.includes("wind")) {
        shell = "powershell.exe"
        command = "shutdown /s /t 50 /c \"Poweroff by server remote controller\""
    } else if (platform.includes("linux")) {
        shell = "bash"
        command = "(sleep 5 && shutdown now) &"
    } else if (platform.includes("darwin")) {
        shell = "bash"
        command = "(sleep 5 && shutdown now) &"
    } else {
        // Return error on unknown system
        info.message = "Unknown system"
        return [
            StatusCode.internalServerError,
            info
        ]
    }
    // Execute command
    const execSync = require('child_process').execSync
    info.message = execSync(command, {
        encoding: "utf8",
        shell: shell
    })
    return [
        StatusCode.success,
        info
    ]
}