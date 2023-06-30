export class SystemInfo {
    message: string
    name: string
    system: string
    os: string

    constructor(
        message: string,
        name?: string,
        system?: string,
        os?: string,
    ) {
        this.message = message
        this.name = name ?? ""
        this.system = system ?? ""
        this.os = os ?? ""
    }
}