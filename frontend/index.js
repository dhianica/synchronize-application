const fs = require('fs')
const path = require('path')

const textFile = fs.readFileSync(path.resolve('C:\\Users\\user\\Downloads\\RK_90983_S1AJNG11BD_220924_221031.txt'), 'utf-8')

//get index 1
const sliceHeader = textFile.split('========================================================================================================================')

const mergerMultiRow = sliceHeader[1].replace(/\r?\n                                     |\r                                     /g, '')

const rows = mergerMultiRow.split(/\n/g)

rows.splice(0, 2)
rows.pop()
rows.pop()
rows.pop()

let arr = []
let arrNotHandle = []

for (let i = 0; i < rows.length; i++) {
    arr[i] = {}
    const row = rows[i].split(/  /g)
    if (row.length > 19) {
        row.forEach((v, n) => {
            v = v.trim()
            if (n == 0) arr[i]["tglTrans"] = v.trim()
            if (n == 1) arr[i]["tglVal"] = v.trim()
            if (n == 2) {
                const splitIndex2 = v.split(' ')
                const userID = splitIndex2[0]
                const noTransaksi = `${splitIndex2[1]} ${splitIndex2[2]}`
                arr[i]["userID"] = userID
                arr[i]["noTransaksi"] = noTransaksi
            }
            if (n == 3) arr[i]["uraian"] = v.trim()
            // if (n == 4) skip
            // if (n == 5) skip
            if (n == 6) arr[i]["noRecord"] = v.trim()
            // if (n == 7) skip
            if (n == 8) arr[i]["gatau"] = v.trim()
            //if (n == 7) skip
            //if (n == 8) skip
            // if (n == 9) skip
            //if (n == 10) skip
            //if (n == 11) skip
            // if (n == 12) skip
            // if (n == 13) skip
            // if (n == 14) skip
            if (n == 15) {
                const splitIndex = v.split(' ')
                arr[i]["mutasi"] = splitIndex[0]
                arr[i]["category"] = splitIndex[1]
            }
            //if (n == 16) skip
            //if (n == 17) skip
            //if (n == 18) skip
            if (n == 19) arr[i]["saldo"] = v.replace('\r', '').trim()
        });
    } else if (row.length > 18) {
        row.forEach((v, n) => {
            v = v.trim()
            if (n == 0) arr[i]["tglTrans"] = v.trim()
            if (n == 1) arr[i]["tglVal"] = v.trim()
            if (n == 2) {
                const splitIndex2 = v.split(' ')
                const userID = splitIndex2[0]
                const noTransaksi = `${splitIndex2[1]} ${splitIndex2[2]}`
                arr[i]["userID"] = userID
                arr[i]["noTransaksi"] = noTransaksi
            }
            if (n == 3) arr[i]["uraian"] = v.trim()
            // if (n == 4) skip
            // if (n == 5) skip
            if (n == 6) arr[i]["noRecord"] = v.trim()
            // if (n == 7) skip
            if (n == 8) arr[i]["gatau"] = v.trim()
            //if (n == 7) skip
            //if (n == 8) skip
            // if (n == 9) skip
            //if (n == 10) skip
            //if (n == 11) skip
            // if (n == 12) skip
            // if (n == 13) skip
            if (n == 14) {
                const splitIndex = v.split(' ')
                arr[i]["mutasi"] = splitIndex[0]
                arr[i]["category"] = splitIndex[1]
            }
            //if (n == 15) skip
            //if (n == 16) skip
            //if (n == 17) skip
            if (n == 18) arr[i]["saldo"] = v.replace('\r', '').trim()
        });
    } else if (row.length > 14) {
        row.forEach((v, n) => {
            v = v.trim()
            if (n == 0) arr[i]["tglTrans"] = v.trim()
            if (n == 1) arr[i]["tglVal"] = v.trim()
            if (n == 2) {
                const splitIndex2 = v.split(' ')
                const userID = splitIndex2[0]
                const noTransaksi = `${splitIndex2[1]} ${splitIndex2[2]}`
                arr[i]["userID"] = userID
                arr[i]["noTransaksi"] = noTransaksi
            }
            if (n == 3) arr[i]["uraian"] = v.trim()
            // if (n == 4) skip
            // if (n == 5) skip
            if (n == 6) {
                const noRecord = arr[i]["uraian"].split('/')[2]
                arr[i]["noRecord"] = noRecord
            }
            // if (n == 7) skip
            if (n == 8) arr[i]["gatau"] = v.trim()
            //if (n == 7) skip
            //if (n == 8) skip
            // if (n == 9) skip
            if (n == 10) {
                const splitIndex = v.split(' ')
                arr[i]["mutasi"] = splitIndex[0]
                arr[i]["category"] = splitIndex[1]
            }
            //if (n == 11) skip
            //if (n == 12) skip
            //if (n == 13) skip
            if (n == 14) arr[i]["saldo"] = v.replace('\r', '').trim()
        });
    } else if (row.length > 13) {
        row.forEach((v, n) => {
            v = v.trim()
            if (n == 0) arr[i]["tglTrans"] = v.trim()
            if (n == 1) arr[i]["tglVal"] = v.trim()
            if (n == 2) {
                const splitIndex2 = v.split(' ')
                const userID = splitIndex2[0]
                const noTransaksi = `${splitIndex2[1]} ${splitIndex2[2]}`
                arr[i]["userID"] = userID
                arr[i]["noTransaksi"] = noTransaksi
            }
            if (n == 3) arr[i]["uraian"] = v.trim()
            // if (n == 4) skip
            // if (n == 5) skip
            if (n == 6) {
                const noRecord = arr[i]["uraian"].split('/')[2]
                arr[i]["noRecord"] = noRecord
            }
            // if (n == 7) skip
            if (n == 8) arr[i]["gatau"] = v.trim()
            //if (n == 7) skip
            //if (n == 8) skip
            if (n == 9) {
                const splitIndex = v.split(' ')
                arr[i]["mutasi"] = splitIndex[0]
                arr[i]["category"] = splitIndex[1]
            }
            //if (n == 11) skip
            //if (n == 12) skip
            if (n == 13) arr[i]["saldo"] = v.replace('\r', '').trim()
        });
    } else if (row.length > 12) {
        row.forEach((v, n) => {
            v = v.trim()
            if (n == 0) arr[i]["tglTrans"] = v.trim()
            if (n == 1) arr[i]["tglVal"] = v.trim()
            if (n == 2) {
                const splitIndex2 = v.split(' ')
                const userID = splitIndex2[0]
                const noTransaksi = `${splitIndex2[1]} ${splitIndex2[2]}`
                arr[i]["userID"] = userID
                arr[i]["noTransaksi"] = noTransaksi
            }
            if (n == 3) arr[i]["uraian"] = v.trim()
            // if (n == 4) skip
            // if (n == 5) skip
            if (n == 6) {
                const noRecord = arr[i]["uraian"].split('/')[2]
                arr[i]["noRecord"] = noRecord
            }
            // if (n == 7) skip
            if (n == 8) arr[i]["gatau"] = v.trim()
            //if (n == 7) skip
            //if (n == 8) skip
            if (n == 9) {
                const splitIndex = v.split(' ')
                arr[i]["mutasi"] = splitIndex[0]
                arr[i]["category"] = splitIndex[1]
            }
            //if (n == 11) skip
            //if (n == 12) skip
            if (n == 13) arr[i]["saldo"] = v.replace('\r', '').trim()
        });
    } else {
        console.log(row)
        console.log(row.length)
        arrNotHandle.push(row)
    }
}

fs.writeFileSync('./data.json', JSON.stringify(arr, null, 4))