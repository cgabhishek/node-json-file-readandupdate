'use strict';
const fs = require('fs');
var clicks;

fs.readFile('clicks.json', (err, data) => {
   if (err) throw err;
   var response = JSON.parse(data);
   var newResponse = [];
   var map = new Map();
   console.log("current response length is : ", response.length);
   for (let i = 0; i < response.length; i++) {
      let ip = response[i].ip;
      let amount = response[i].amount;
      let timest = response[i].timestamp.split(' ')[1].split(':')[0];
      console.log("ip & amount & timestamp are  ", ip, amount, timest);
      let key = ip + "_" + timest;
      if (map.get(key)) {
         if (map.get(key) < amount) {
            map.set(key, amount);
            for (let j; j < newResponse.length; j++) {
               if (newResponse[j].ip == response[i]) {
                  newResponse[j].amount = amount;
               }

            }
         }
      } else {
         map.set(key, amount);
         newResponse.push(response[i]);
      }
   }
   console.log("new data is  : ", JSON.stringify(newResponse));
   console.log("new data length is  : ", newResponse.length);
});
