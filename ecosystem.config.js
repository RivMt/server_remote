module.exports = {
    apps : [{
        name: "server_remote",
        script: "./node_modules/next/dist/bin/next",
        args: "start --port 3000",
        instances: "max",
        exec_mode: "cluster"
    }]
}