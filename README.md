A Web Service that enables you retrieve and filter clinics from multiple endpoints.

### Assumptions

1. Given multiple parameters, a Search for clinics should return a result which is a union of clinics containing at least one of the given parameters. For example, if the search parameters are: ***name=Good Health Home*** and ***state=CA***, the result will contain all clinics with name ***Good Health Home*** as well as all clinics with state ___CA___.

2. When no parameter is provided, all clinics should be returned.


### Instructions

1. Clone this repo
2. Simply run:
```
npm install
```
```
npm start
```
3. To run automated tests and view code coverage report, simply run:
```
npm test
```

4. API endpoint path is 
```
/api/clinics
```
5. To search for clinics simply provide values to the following request query parameters: ___name___, ___state___, ___from___, ___to___. For example:

```
http://localhost:3001/api/clinics?name=Good Health Homes&state=CA&from=00:00&to=24:00
```
6. Query Parameter ___name___ takes in possible values for ___clinicName/name___; query parameter ___state___ takes in possible values for ___stateName/stateCode___; query parameter ___from___ takes in possible values for ___opening/availability from item___; query parameter ___to___ takes in possible values for ___opening/availability to item___.