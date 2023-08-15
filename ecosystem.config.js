module.exports = {
    apps : [{
        name: "server_remote",
        script: "next",
        args: "start --port 3000",
        instances: "max",
        exec_mode: "cluster"
    }]
}