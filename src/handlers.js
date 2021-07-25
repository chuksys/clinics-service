const Stream = require('stream');
const {
    searchDentalClinics, searchVetClinics
} = require('./helpers')
const { validationResult } = require('express-validator')


const getClinics = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            errors: errors.array()
        });
    } 

  let filteredData = {};  
  let filteredDataDental = [];
  let filteredDataVet = [];

  const writeableStreamDental = new Stream.Writable({
    write(chunk, encoding, callback) {  
      const data = JSON.parse(chunk.toString())
      filteredDataDental = [...filteredDataDental, ...data]
      callback(null, chunk);
    }
  });

  const writeableStreamVet = new Stream.Writable({
    write(chunk, encoding, callback) {
      const data = JSON.parse(chunk.toString())
      filteredDataVet = [...filteredDataVet, ...data]
      callback(null, chunk);
    }
  });

  searchDentalClinics(req.query, writeableStreamDental);

  writeableStreamDental.on("finish", () => {
    searchVetClinics(req.query, writeableStreamVet);

    writeableStreamVet.on("finish", () => {
      Object.assign(filteredData, {"Dental": filteredDataDental})
      Object.assign(filteredData, {"Vet": filteredDataVet})
      res.status(200).json(filteredData);
    });
  });
};

module.exports = { 
  getClinics
};