var assert = require("assert");
const reports = require('../routes/reports.js');

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js')

chai.should();

chai.use(chaiHttp);



describe("Get a single report from api",function(){
   it("should be a report ", (done)=>{

    chai.request(server)
    .get("/reports/1")
    .end((err, res) =>{
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.data.should.be.an("object");
        res.body.data.text.should.be.an("string");
        done();
    })
   }) 
})

describe("Get a single report from api",function(){
    it("should be a report ", (done)=>{
 
     chai.request(server)
     .get("/reports/2")
     .end((err, res) =>{
         res.should.have.status(200);
         res.body.should.be.an("object");
         res.body.data.should.be.an("object");
         res.body.data.text.should.be.an("string");
         done();
     })
    }) 
 })

describe("Get a home page", function() {
    it("should object with msg as a string", (done)=>{
 
     chai.request(server)
     .get("/")
     .end((err, res) =>{
         res.should.have.status(200);
         res.body.should.be.an("object");
         res.body.data.should.be.an("object");
         res.body.data.msg.should.be.an("string");
         done();
     })
    }) 
 })


