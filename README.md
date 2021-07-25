A Web Service that enables you retrieve and filter clinics from multiple endpoints.

### Assumptions

1. Given multiple parameters, a Search for clinics should return a result which is a union of clinics containing at least one of the given parameters. For example, if the search parameters are: "name=Good Health Home" and "state=CA", the result will contain all clinics with name "Good Health Home" as well as all clinics with state "CA".

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
5. To search for clinics simply provide values to the following request query parameters: name, state, from, to. For example:

```
http://localhost:3001/api/clinics?name=Good Health Homes&state=CA&from=00:00&to=24:00
```
6. Query Parameter "name" takes in possible values for "clinicName/name"; query parameter "state" takes in possible values for "stateName/stateCode"; query parameter "from" takes in possible values for "opening/availability from item"; query parameter "to" takes in possible values for "opening/availability to item".