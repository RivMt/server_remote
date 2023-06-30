import type { NextApiRequest, NextApiResponse } from "next";

import {SystemInfo} from "../../../types/models";
import {Method, StatusCode} from "../../../types/constants";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<SystemInfo>) {

    let value: [number, SystemInfo] = [StatusCode.internalServerError, new SystemInfo("")]
    switch (req.method) {
        case Method.get:
            value = getSystemInfo()
            break
        case Method.post:
            value = powerOff()
            break
    }
    res.status(value[0]).json(value[1])
}

function getSystemInfo(): [number, SystemInfo] {
    return [StatusCode.success, new SystemInfo("")]
}

function powerOff(): [number, SystemInfo] {
    const execSync = require('child_process').execSync
    const output = execSync('ls', {
        encoding: "utf8",
        shell: "powershell.exe"
    })
    let info = getSystemInfo()[1]
    info.message = output
    return [
        StatusCode.success,
        info
    ]
}