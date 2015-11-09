'use strict';

var chai = require('chai');
var expect = chai.expect;
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var mongoose = require('mongoose');
process.env.MONGO_URL = 'mongodb://localhost/char_sheet_test';
require(__dirname + '/../../server.js');

var CharSheet = require(__dirname + '/../../models/char_sheet');
var User = require(__dirname + '/../../models/user');

var url = 'localhost:3000/api/';

describe("the character-sheet resource", function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function(err) {
      if(err) {
        throw err;
      }
      done();
    });
  });

  before(function(done) {
    var user = new User();
    user.username = 'testman';
    user.basic.username = 'testman';
    user.generateHash('foobar123', function(err, res) {
      if(err) throw err;
      user.save(function(err, data) {
        if(err) throw err;
        user.generateToken(function(err, token) {
          if(err) throw err;
          this.token = token;
          done();
        }.bind(this));
      }.bind(this));
    }.bind(this));
  });

  it("should be able to get stats", function(done) {
    chai.request(url)
      .get('sheets')
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it("should be able to generate a sheet when no data is sent", function(done){
    chai.request(url)
      .post('sheets')
      .send({token: this.token})
      .end(function(err, res){
        expect(err).to.eql(null);
        expect(res.body.name).to.have.length.within(4, 8);
        expect(res.body.race).to.match(/^(human|elf|orc|dwarf|halfling|troll|goblin)$/);
        expect(res.body.gender).to.eql('OTHER');
        expect(res.body.strength).to.eql(50);
        expect(res.body.intelligence).to.eql(50);
        expect(res.body.deceased).to.eql(false);
        done();
      });
  });

  it("should not like inputs that are invalid (on POST)", function(done) {
    chai.request(url)
      .post('sheets')
      .send({
        name: 'testman',
        race: 'huagnasdf',
        gender: 'F',
        strength: 50,
        intelligence: 50,
        token: this.token
      })
      .end(function(err, res) {
        expect(res.status).to.eql(418);
        expect(res.body.msg).to.eql('entry invalid; try again');
        done();
      });
  });

  describe("routes that need a note in the database", function() {
    beforeEach(function(done) {
      var testSheet = new CharSheet({
        name: 'test',
        race: 'orc',
        gender: 'other',
        strength: 80,
        intelligence: 20,
        deceased: false,
        token: this.token
      });

      testSheet.save(function(err, data) {
        if(err) {
          throw err;
        }

        this.testSheet = data;
        done();
      }.bind(this));
    });

    it("should be able to update a char sheet", function(done) {
      chai.request(url)
        .put('sheets/' + this.testSheet._id)
        .send({name: 'newName', token: this.token})
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Name changed');
          done();
        });
    });

    it("should be able to delete a char sheet", function(done) {
      chai.request(url)
        .delete('sheets/' + this.testSheet._id)
        .set('token', this.token)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('Delete successful');
          done();
        });
    });

    it("should not like inputs that are invalid (on PUT)", function(done) {
    chai.request(url)
      .put('sheets/' + this.testSheet._id)
      .send({name: '12345', token: this.token})
      .end(function(err, res) {
        expect(res.status).to.eql(418);
        expect(res.body.msg).to.eql('entry invalid; try again');
        done();
      });
    });

    it("should level-up characters", function() {
      expect(this.testSheet.levelUp()).to.eql('Level up!');
      expect(this.testSheet.strength).to.be.above(80);
      expect(this.testSheet.intelligence).to.be.above(20);
    });
  });
});
