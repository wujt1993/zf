#! /usr/bin/env node

const program = require("commander");
const config = require("./ServerConfig");
const {forEach} = require("../utils")
const Server = require("../src/index")

program.name("ks");

forEach(config, value=> {
    program.option(value.option, value.descriptor, value.defaultValue)
});


program.on("--help", function() {
    console.log("\r\n usage:")
    forEach(config, value=> {
        console.log(value.usage)
    });
})
program.parse(process.argv);

const serverConfig = {};

forEach(config, (value,key)=>{
    serverConfig[key] = program[key]
})

new Server(serverConfig).start()


