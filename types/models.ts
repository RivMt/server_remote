export class SystemInfo {
    message: string
    name: string
    system: string
    release: string
    build: string

    constructor(
        message: string,
        name?: string,
        system?: string,
        release?: string,
        build?: string,
    ) {
        this.message = message
        this.name = name ?? ""
        this.system = system ?? ""
        this.release = release ?? ""
        this.build = build ?? ""
    }
}