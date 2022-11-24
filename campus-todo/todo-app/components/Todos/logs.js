const writeFileP = require("write-file-p");
let data = require('../../log.json')



export default async function log(type, datanew,oData) {
    let ts = String(new Date).split("(")[0];
    let newdata = {
        "type" : type,
        "NewData" : datanew,
        "oldData" : oData
    }

    data[ts] = newdata;
    console.log(JSON.stringify(data));
    writeFileP.sync(`${__dirname}../../../../../../log.json`, data);
}
