// const keys = require('../config/keys');
const mongoose = require('mongoose');
// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const vendorModsHashes = require('../data/vendorModsHashes.json');

module.exports = app => {
    app.get('/api/fetch_vendor_mods', async (req, res) => {
        // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // const userInfo = await User.findOne({membershipID: currentUser.accessToken.membership_id});
        // const selectedChar = JSON.parse(localStorage.getItem("selectedChar"));

        // if(selectedChar === null) {
        //     res.send(null);
        //     return;
        // }

        // //get vendor sales
        // const query = `https://www.bungie.net/Platform/Destiny2/${userInfo.profiles[0].membershipType}/Profile/${userInfo.profiles[0].membershipId}/Character/${selectedChar.characterID}/Vendors/${vendorModsHashes[req.query.vendor].hash}/?components=402`;

        // const response = await fetch(query, {
        //     headers: {
        //         'X-API-Key': keys.apiKey,
        //         'Authorization': "Bearer " + currentUser.accessToken.access_token
        //     }
        // });
        // if (response.status === 400 || response.status === 401) {
        //     return res.status(401).send({ error: 'error retrieving vendors' });
        // }
        // const respData = await response.json();
        // let vendorSales = null;
        // if (respData.Response.sales.data) {
        //     vendorSales = respData.Response.sales.data;
        // } else {
        //     res.send();
        // }

        // const manifest = new Manifest();

        // const vendorSalesInfo = Object.values(vendorSales).map(item => {
        //     return manifest.getItemInfo(item.itemHash);
        // });

        // //filter for mods 
        // const filteredVendorSalesInfo = vendorSalesInfo.filter((item) => {
        //     return item.itemCategoryHashes.includes(59);
        // });

        // res.send(filteredVendorSalesInfo);
    });
}