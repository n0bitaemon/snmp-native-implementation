var snmp = require("snmp-native");

const SESSION_TIMEOUT = 10000;
const GENERAL_ERR_MSG = "Unable to perform the specified operation";

const get = (host, port = 161, community, oid) => {
    let session = new snmp.Session({ host: host, port: port, community: community });
    let response = {};

    return new Promise((resolve, reject) => {
        session.get({ oid: oid }, (error, varbinds) => {
            if(error){
                reject(GENERAL_ERR_MSG)
            }else{
                response = {
                    error: null,
                    result: varbinds[0]
                };
            }
            resolve(response);
        });
    })
}

const getSubtree = (host, port = 161, community, oid) => {
    let session = new snmp.Session({ host: host, port: port, community: community });
    let response = {};

    return new Promise((resolve, reject) => {
        session.getSubtree({ oid: oid }, function (error, varbinds) {
            if (error) {
                reject(GENERAL_ERR_MSG);
            } else {
                let vals = new Array();
                varbinds.forEach(function (vb) {
                    vals.push(vb);
                    response = {
                        error: null,
                        result: vals
                    }
                });
            }
            resolve(response);
        });
    });
}

const getNext = (host, port = 161, community, oid) => {
    let session = new snmp.Session({ host: host, port: port, community: community });
    let response = {};

    return new Promise((resolve, reject) => {
        session.getNext({ oid: oid }, (error, varbinds) => {
            if(error){
                reject(GENERAL_ERR_MSG)
            }else{
                response = {
                    error: null,
                    result: varbinds[0]
                };
            }
            resolve(response);
        });
    })
}

const getAll = (host, port = 161, community, oids) => {
    let session = new snmp.Session({ host: host, port: port, community: community });
    let response = {};

    return new Promise((resolve, reject) => {
        session.getAll({ oids: oids }, function (error, varbinds) {
            if (error) {
                reject(GENERAL_ERR_MSG);
            } else {
                let vals = new Array();
                varbinds.forEach(function (vb) {
                    vals.push(vb);
                    response = {
                        error: null,
                        result: vals
                    }
                });
            }
            resolve(response);
        });
    });
}

const set = (host, port = 161, community, oids, type, value) => {
    let session = new snmp.Session({ host: host, port: port, community: community });

    return new Promise((resolve, reject) => {
        session.set({ oid: oids, value: value, type: type }, function (error, varbind) {
            if (error) {
                reject(GENERAL_ERR_MSG);
            } else {
                resolve("SET action is done");
            }
        });
    });
}

module.exports = {
    get, getSubtree, getNext, getAll, set
}

