const {
    validateRequest
} = require('./validate');

const app = require('./app');

const { getClinics } = require('./handlers');

app.get('/api/clinics', validateRequest, getClinics);

module.exports = app;