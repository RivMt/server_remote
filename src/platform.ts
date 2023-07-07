import {Systeminformation} from "systeminformation";
import OsData = Systeminformation.OsData;

const commandDelay = (): number => {
    const env = process.env.NODE_ENV
    if (env === "development") {
        return 60
    } else {
        return 5
    }
}

export enum Platform {
    unknown,
    windows,
    linux,
    macOs
}

export async function getTerminal(): Promise<string> {
    const platform = await getPlatform()
    switch (platform) {
        case Platform.windows:
            return "powershell.exe"
        case Platform.linux:
        case Platform.macOs:
            return "bash"
        case Platform.unknown:
        default:
            return "sh"
    }
}

export async function getPowerOffCommand(): Promise<string> {
    const platform = await getPlatform()
    switch (platform) {
        case Platform.windows:
            return `shutdown /s /t ${commandDelay()} /c "Poweroff by server remote controller"`
        case Platform.linux:
        case Platform.macOs:
            return `(sleep ${commandDelay()} && poweroff) &`
        case Platform.unknown:
        default:
            return "sh"
    }
}

export async function getRebootCommand(): Promise<string> {
    const platform = await getPlatform()
    switch (platform) {
        case Platform.windows:
            return `shutdown /r /t ${commandDelay()} /c \"Reboot by server remote controller\"`
        case Platform.linux:
        case Platform.macOs:
            return `(sleep ${commandDelay()} && reboot) &`
        case Platform.unknown:
        default:
            return "sh"
    }
}

export async function getPlatform(): Promise<Platform> {
    const si = require("systeminformation")
    const data: OsData = await si.osInfo()
    const platform = data.platform.toLowerCase()
    if (platform.includes("wind")) {
        return Platform.windows
    } else if (platform.includes("linux")) {
        return Platform.linux
    } else if (platform.includes("darwin")) {
        return Platform.macOs
    } else {
        return Platform.unknown
    }
}