const fs                  = require('fs');
const readline            = require('readline');
const greatCircleDistance = require('./src/great-circle-distance');

const DUBLIN_LAT = 53.339428;
const DUBLIN_LON = -6.257664;

parseFileAndGetInvitees("customers.txt", 100);

async function parseFileAndGetInvitees(file, customerDistanceKM){

    try {
        const customers = readFile(file);

        const inviteeList = await getCustomersByDistance(customers, customerDistanceKM);
        if( inviteeList == "Error"){
            return "Error";
        }

        const inviteeListStr = convertToString(inviteeList);

        console.log(inviteeListStr);
        writeOutputToFile(inviteeListStr);

        return inviteeListStr;
    } catch (error) {
        console.log(error);
        writeOutputToFile("Error");
        return "Error";
    }

}

function getCustomersByDistance( customers, customerDistanceKM ){

    return customers.then(customers => {
        
        let listByDis = [];     
        customers.forEach( (eachCust) => {

            const dis = greatCircleDistance(DUBLIN_LAT, DUBLIN_LON, eachCust.latitude, eachCust.longitude);
            
            if( dis <= customerDistanceKM ){
                listByDis.push({name: eachCust.name, user_id: eachCust.user_id});
            }   

        });
        
        listByDis = listByDis.sort( (a,b) => a.user_id - b.user_id);

        return listByDis;

    }).catch(err => {
        console.log(" Error parsing file" + err)
        writeOutputToFile("Error");
        return "Error";
    });
}

   
function readFile(file) {

    return new Promise((resolve, reject) => {

        const stream = fs.createReadStream(file);

        stream.on('error', reject);

        const reader = readline.createInterface({
            input: stream
        });

        const array = [];

        reader.on('line', line => {

            try {
                array.push(JSON.parse(line));
            } catch (error) {
                console.log("Error parsing file" + error);
                reject("Error");
            }
           
        });

        reader.on('close', () => resolve(array));
    });
}

function writeOutputToFile(output) {

    fs.writeFile("output.txt", output, function (err) {
        if (err) return console.log("Error in writing to output.txt"  + err);
      });

}


function convertToString( list ){

    if( typeof(list) != "array" && typeof(list) != "object"){
        console.log("Error in converting list to string");
        return list ;
    }

    const listStr = JSON.stringify(list).replace(/},/g, "}\r\n").replace(/[\[\]]/g, "");
    return listStr;

}

module.exports = {
    parseFileAndGetInvitees,
    getCustomersByDistance
}