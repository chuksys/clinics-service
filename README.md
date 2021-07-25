A Web Service that enables you retrieve and filter clinics from multiple endpoints.

### Assumptions

1. Given multiple parameters, a Search for clinics should return a result which is a union of clinics containing at least one of the given parameters. For example, if the search parameters are: **name=Good Health Home** and **state=CA**, the result will contain all clinics with name **Good Health Home** as well as all clinics with state __CA__.

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
5. To search for clinics simply provide values to the following request query parameters: __name__, __state__, __from__, __to__. For example:

```
http://localhost:3001/api/clinics?name=Good Health Homes&state=CA&from=00:00&to=24:00
```
6. Query Parameter __name__ takes in possible values for __clinicName/name__; query parameter __state__ takes in possible values for __stateName/stateCode__; query parameter __from__ takes in possible values for __opening/availability from item__; query parameter __to__ takes in possible values for __opening/availability to item__.