import type {NextApiRequest, NextApiResponse} from "next";

import {SystemInfo} from "../../../types/models";
import {Method, StatusCode} from "../../../types/constants";
import {Systeminformation} from "systeminformation";
import OsData = Systeminformation.OsData;
import {getPowerOffCommand, getRebootCommand, getTerminal} from "@/platform";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SystemInfo>) {

    let value: [number, SystemInfo]
    switch (req.method) {
        case Method.get:
        default:
            value = await getSystemInfo()
            break
        case Method.post:
            const {command} = req.query
            value = await execute(command)
            break
    }
    res.status(value[0]).json(value[1])
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

async function execute(command: string | string[] | undefined): Promise<[number, SystemInfo]> {
    // Get system data
    const info = (await getSystemInfo())[1]
    // Check command
    if (typeof command === undefined) {
        return [
            StatusCode.internalServerError,
            info,
        ]
    }
    if (typeof command !== 'string') {
        command = command!.join("\n")
    }
    // Choose command
    if (command.includes("poweroff")) {
        command = await getPowerOffCommand()
    } else if (command.includes("reboot")) {
        command = await getRebootCommand()
    } else {
        return [
            StatusCode.internalServerError,
            info,
        ]
    }
    // Execute command
    const execSync = require('child_process').execSync
    info.message = execSync(command, {
        encoding: "utf8",
        shell: getTerminal()
    })
    return [
        StatusCode.success,
        info
    ]
}