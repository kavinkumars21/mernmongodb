const express = require('express')
let mongodb = require('mongodb')
let url = require('../url')
let mcl = mongodb.MongoClient
let router = express.Router()

router.post('/', (req, res) => {
    let p_id = req.body.p_id
    let obj = {
        "p_name": req.body.p_name,
        "p_cost": req.body.p_cost
    }
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db("miniprj")
            db.collection("products").updateOne({ p_id }, { $set: obj }, (err, result) => {
                if (err)
                    res.json({ 'update': 'Error ' + err })
                else {
                    if (result.matchedCount != 0) {
                        console.log("Data updated ")
                        res.json({ 'update': 'success' })
                    }
                    else {
                        console.log("Data Not updated ")
                        res.json({ 'update': 'Record Not found' })
                    }
                    conn.close()
                }
            })
        }
    })
})
router.post("/updateCart", (req, res) => {
    let p_id = req.body.p_id
    let uname = req.body.uname
    let obj = { "qty": req.body.qty }
    mcl.connect(url, (err, conn) => {
        if (err)
            console.log('Error in connection:- ', err)
        else {
            let db = conn.db('miniprj')
            db.collection('cart').updateOne({ p_id, uname }, { $set: obj },
                (err, result) => {
                    if (err)
                        res.json({ 'cartUpdate': 'Error ' + err })
                    else {
                        if (result.matchedCount != 0) {
                            console.log(`Cart data for ${uname} updated`)
                            res.json({ 'cartUpdate': 'success' })
                        }
                        else {
                            console.log(`Record not updated`)
                            res.json({ 'cartUpdate': 'Record Not found' })
                        }
                        conn.close()
                    }
                })
        }
    })
})

module.exports = router