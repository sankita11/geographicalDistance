"use strict";

const RADIUS_OF_EARTH = 6371;

const distance = (originLat, originLon, destLat, destLon) => {

    try {
        originLat  *= Math.PI / 180 ;
        originLon  *= Math.PI / 180 ;
        destLat    *= Math.PI / 180 ;
        destLon    *= Math.PI / 180 ;
        
        const lonDelta = originLon - destLon ;
    
        const a = Math.sin( originLat ) * Math.sin( destLat ) +
                     Math.cos( originLat ) * Math.cos( destLat ) * Math.cos( lonDelta )  ;
        
        const angle = Math.acos(a);

        if(isNaN(angle)){
            return "-1";
        }

        return angle * RADIUS_OF_EARTH;
            
    } catch (error) {
        console.log("Error in calucating distance" + error);        
    }

}

module.exports = distance;
