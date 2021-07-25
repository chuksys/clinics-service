const https = require('https');
const { Transform } = require('stream');

const filterDentalData = (data, filterParameters) => data.filter(d => {

    if(filterParameters.from == undefined && 
        filterParameters.to == undefined &&
        filterParameters.name == undefined &&
        filterParameters.state == undefined) return true

    if(filterParameters.from !== undefined && 
        d.availability.from == filterParameters.from ||
        filterParameters.to !== undefined && 
        d.availability.to == filterParameters.to ||
        filterParameters.name !== undefined &&
        d.name == filterParameters.name ||
        filterParameters.state !== undefined &&
        d.stateName == filterParameters.state) {
        return true;
    } else {
        return false;
    }
});

const filterVetData = (data, filterParameters) => data.filter(d => {

    if(filterParameters.from == undefined && 
        filterParameters.to == undefined &&
        filterParameters.name == undefined &&
        filterParameters.state == undefined) return true

    if(filterParameters.from !== undefined && 
        d.opening.from == filterParameters.from ||
        filterParameters.to !== undefined && 
        d.opening.to == filterParameters.to ||
        filterParameters.name !== undefined &&
        d.clinicName == filterParameters.name ||
        filterParameters.state !== undefined &&
        d.stateCode == filterParameters.state) {
        return true;
    } else {
        return false;
    }
});

const truncateData = (data) => {
  const lastIndex = data.lastIndexOf('}');
  const jsonData = data.slice(0, lastIndex + 1);
  const truncatedData = data.slice(lastIndex + 1);

  return [jsonData, truncatedData];
}

const convertDataToJson = (formattedData, truncatedData, bufferCount) => {
  let jsonString = '';
  if (bufferCount > 1) {
    jsonString = `[${truncatedData}${formattedData}]`;
  } else {
    jsonString = `${truncatedData + formattedData}]`;
  }

  if (jsonString.indexOf(',') === 1) jsonString = jsonString.replace(',', '');
  return JSON.parse(jsonString);
}

const processDentalClinicsData = (params) => {
  let truncatedData = '';
  let bufferCount = 0;
  let filteredData = [];

  return new Transform({
      transform(chunk, enc, callback) {
          const data = chunk.toString();
          bufferCount++;
          const truncateDataResult = truncateData(data);
          const jsonData = convertDataToJson(truncateDataResult[0], truncatedData, bufferCount);
          truncatedData = truncateDataResult[1];
          filteredData = filterDentalData(jsonData, params);
          callback(null, JSON.stringify(filteredData))
      }
  })
}

const processVetClinicsData = (params) => {
  let truncatedData = '';
  let bufferCount = 0;
  let filteredData = [];

  return new Transform({
      transform(chunk, enc, callback) {
          const data = chunk.toString();
          bufferCount++;
          const truncateDataResult = truncateData(data);
          const jsonData = convertDataToJson(truncateDataResult[0], truncatedData, bufferCount);
          truncatedData = truncateDataResult[1];
          filteredData = filterVetData(jsonData, params);
          callback(null, JSON.stringify(filteredData))
      }
  })
}


const searchDentalClinics = (params, writeable) => {
  const url = 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json';

  https.get(url, res => {
    const processDentalClinicsDataStream = processDentalClinicsData(params)
    processDentalClinicsDataStream.setEncoding("utf8")
    
    res.pipe(processDentalClinicsDataStream).pipe(writeable)

    res.on("error", err => console.error(err))
    processDentalClinicsDataStream.on("error", err => console.error(err))
  
  });
}

const searchVetClinics = (params, writeable) => {
    const url = 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json';

    https.get(url, res => {
      const processVetClinicsDataStream = processVetClinicsData(params)
      processVetClinicsDataStream.setEncoding("utf8")
      
      res.pipe(processVetClinicsDataStream).pipe(writeable)
  
      res.on("error", err => console.error(err))
      processVetClinicsDataStream.on("error", err => console.error(err))
    
    });
}

module.exports = {  
    filterDentalData, 
    filterVetData,
    truncateData,
    convertDataToJson,
    processDentalClinicsData,
    processVetClinicsData,
    searchDentalClinics,
    searchVetClinics
};
