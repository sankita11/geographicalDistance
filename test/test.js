const greatCircleDistance = require("../src/great-circle-distance");
const { parseFileAndGetInvitees } = require("../index");


describe( 'test distance between two origin', () => {
    test( "should return distance", () => {
        const distance = greatCircleDistance( 53.339428, -6.257664, 53.2451022, -6.238335) ;
        expect(Math.floor(distance)).toEqual(10);
    });
    test( "should return -1", () => {
        const distance = greatCircleDistance( "a","b", 53.2451022, -6.238335) ;
        expect(Math.floor(distance)).toEqual(-1);
    });
});

describe(' test parseFileAndGetInvitees', () => {
    test('should return Error', async () => {
      const actualValue = await parseFileAndGetInvitees("./test/error.txt", 100);
      expect(actualValue).toEqual('Error');
    });
    test('should return data', async () => {
        const expectedVal = '{"name":"Ian Kehoe","user_id":4}\r\n'+
        '{"name":"Nora Dempsey","user_id":5}\r\n'+
        '{"name":"Christina McArdle","user_id":12}';
        
        const actualValue = await parseFileAndGetInvitees("./test/customer-test.txt", 100);
        expect(actualValue).toBe(expectedVal);
    });
    test('should return empty', async () => {
        const actualValue = await parseFileAndGetInvitees("./test/customer-test.txt", "a");
        expect(actualValue).toBe("");
    });
  });
