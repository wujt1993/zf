#! /usr/bin/env node


const program = require('commander');
const config = require("./serverConfigs");
Object.values(config).forEach(val => {
    program.option(val.option, val.descriptor)
});


program.on('--help', function(){
    console.log("\r\nUsage:")
    Object.values(config).forEach(val => {
        console.log(val.usage)
    });
})
program.parse(process.argv);
const finalConfig = {};
Object.entries(config).forEach(([key, value])=>{
    finalConfig[key] = program[key] || value.default
})
console.log(finalConfig);