const axios = require("axios");
const express = require('express');

exports.Addpayment = async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
        "app_token": "07871599-39a5-4b3d-b443-a39d1e536ebe", //public key of your flouci dev account
        "app_secret": process.env.private_key, // private key of your flouci dev account
        "amount": req.body.amount,
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:4200/payment",
        "fail_link": "http://localhost:4200/checkout",
        "developer_tracking_id": "37943079-416e-4333-b644-f4fbbeb4a2e3"
    };

    if (payload.amount<1999999) {
        await axios.post(url,payload)
            .then(result => {
                res.send(result.data);
            })
            .catch(err => {
                console.error(err);
            })
    } else {
        res.send({message: `The amount is not accepted, please enter an amount less than 2000dt`})
    }
};
exports.Verifypayment = async (req, res) => {
    const payment_id = req.params.id;
    const link = "https://developers.flouci.com/api/verify_payment/";
    await axios.get(link + payment_id, {
        headers: {
            'Content-Type': 'application/json',
            'apppublic': '07871599-39a5-4b3d-b443-a39d1e536ebe',
            'appsecret': process.env.private_key
        }
    })
        .then((result) => {
            res.send(result.data);
        })
        .catch((err) => {
            console.log(err.message);
        });
}



