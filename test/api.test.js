process.env.NODE_ENV = "test"
process.env.PORT = 5001

const chai = require("chai")
const expect = chai.expect
const chaiHttp = require("chai-http")
chai.use(chaiHttp)

const startServer = require("../src/server")
let testServer;
const app = require("../src/app")

describe("Test GET Endpoint api/clinics", function() {
    this.timeout(10000);

    before(function(done) {
        startServer(app).then(server => {
            testServer = server
            done()
        })
    })

    after(function(done) {
        testServer.close()
        done()
    })

    it("Endpoint returns object when query params are provided", function(done) {
        chai.request(testServer)
            .get("/api/clinics?name=Good Health Home&from=00:00&to=24:00")
            .end((err, res) => {
                if (err) return done(err)
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("object").with.property("Dental")
                expect(res.body).to.be.an("object").with.property("Vet")
                return done()
            })
    })

    it("Endpoint returns object when query params are not provided", function(done) {
        chai.request(testServer)
            .get("/api/clinics")
            .end((err, res) => {
                if (err) return done(err)
                expect(res).to.have.status(200)
                expect(res.body).to.be.an("object").with.property("Dental")
                expect(res.body).to.be.an("object").with.property("Vet")
                return done()
            })
    })
})