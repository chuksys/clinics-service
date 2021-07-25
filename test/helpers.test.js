process.env.NODE_ENV = "test"

const chai = require("chai")
const expect = chai.expect

const { 
    filterDentalData, 
    filterVetData, 
    truncateData, 
    convertDataToJson
} = require("../src/helpers")

describe("Test Helper Functions", () => {

    describe("Test filterDentalData", () => {

        it("Returns an array of Dental Clinics that match the given arguments", () => {
            const testData = require("./testDataDental")
            const filterParameters = {
                name: "Good Health Home",
                from: "00:00",
                to: "24:00"
            }
            const expectedData = [
                {
                    name: 'Good Health Home',
                    stateName: 'Alaska',
                    availability: {from: '10:00', to: '19:30'}
                }
            ]

            const result = filterDentalData(testData, filterParameters)
            expect(result).to.be.an("array").to.deep.equal(expectedData)
        })

        it("Returns an array of Dental Clinics when filterParameters is empty", () => {
            const testData = require("./testDataDental")
            const filterParameters = {}
            const result = filterDentalData(testData, filterParameters)
            expect(result).to.be.an("array").to.deep.equal(testData)
        })
    })

    describe("Test filterVetData", () => {
        it("Returns an array of Vet Clinics that match the given arguments", () => {
            const testData = require("./testDataVet")
            const filterParameters = {
                name: "Good Health Home",
                from: "00:00",
                to: "24:00"
            }
            const expectedData = [
                {
                    clinicName: 'Good Health Home',
                    stateCode: 'FL',
                    opening: {from: '15:00', to: '20:00'}
                },
                {
                    clinicName: 'Scratchpay Test Pet Medical Center',
                    stateCode: 'CA',
                    opening: {from: '00:00', to: '24:00'}
                }
            ]

            const result = filterVetData(testData, filterParameters)
            expect(result).to.be.an("array").to.deep.equal(expectedData)
        })

        it("Returns an array of Vet Clinics when filterParameters is empty", () => {
            const testData = require("./testDataVet")
            const filterParameters = {}
            const result = filterVetData(testData, filterParameters)
            expect(result).to.be.an("array").to.deep.equal(testData)
        })
    })

    describe("Test truncateData", () => {
        it("Takes in a Chunk of String Data as an argument then extacts valid json string from this data and returns an array containing the extracted jsonData string & truncatedData string", () => {
            const testData = require("./testDataChunk")
            const expectedData = [
                "[{clinicName: 'Good Health Home',stateCode: 'FL', opening: { from: '15:00', to: '20:00' }},{clinicName: 'National Veterinary Clinic', stateCode: 'CA',opening: { from: '15:00', to: '22:30' }}", ",{clinicName: 'German Pets Clinics', stateCode: 'K"
            ];

            const result = truncateData(testData)
            expect(result).to.be.an("array").to.deep.equal(expectedData)

        })
    })

    describe("Test convertDataToJson", () => {
        it("Takes in json formatted string, truncated string from previous buffer and buffer count as arguments, then appends/prepends truncated string & square brackets where necessary and converts result to json and returns jsonData", () => {
            const formattedData = '[{"clinicName": "Good Health Home","stateCode": "FL", "opening": { "from": "15:00", "to": "20:00" }},{"clinicName": "National Veterinary Clinic", "stateCode": "CA","opening": { "from": "15:00", "to": "22:30" }}'
            const truncatedData = ''
            const bufferCount = 1
            const expectedDataStr = `${truncatedData + formattedData}]`
            const expectedData = JSON.parse(expectedDataStr);

            const result = convertDataToJson(formattedData, truncatedData, bufferCount)
            expect(result).to.be.an("array").to.deep.equal(expectedData)

        })

        xit("return expected jsonData when bufferCount is greater than 1", () => {
           
        })
    })

    xdescribe("Test processDentalClinicsData", () => {

    })

    xdescribe("Test processVetClinicsData", () => {

    })

    xdescribe("Test searchDentalClinics", () => {

    })

    xdescribe("Test searchVetClinics", () => {

    })
})