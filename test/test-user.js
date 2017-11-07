'use strict';
//dependencies
const chai = require('chai');
const request = require('supertest');
const app = require('../server');
const expect = chai.expect;
const mongoose = require('mongoose');
const User = require('../src/user/user.model');

//Create Test User
const userCredentials = {
    email: 'userTest@user.com',
    password: 'qwerty',
};
let testUser;
let token = '';
let userModel = new User();

let authenticatedUser = request.agent(app);

(async function createUser() {
    //Clear test database and add there Test User
    userModel.user.remove({}, (err) => {
        console.log('test database  is cleared');
    });
    testUser = await userModel.createUser(userCredentials);
    run()
})();


describe('Create new user', () => {
    it('valid sign up - should respond status 200', function (done) {
        request(app).post('/api/auth/register')
            .send({
                email: 'userNew@user.com',
                password: 'qwerty',
            })
            .end(function (err, response) {
                expect(response.status).to.equal(200);
                done();
            });
    });

    it('no email - should respond with errors, status 400', function (done) {
        request(app).post('/api/auth/register')
            .send({
                email: '',
                password: 'qwerty',
            })
            .end(function (err, response) {
                expect(response.status).to.equal(400);
                expect('please check email or password');
                done();
            });
    });

    it('no password - should respond with errors, status 400', function (done) {
        request(app).post('/api/auth/register')
            .send({
                email: 'userNew@user.com',
                password: '',
            })
            .end(function (err, response) {
                expect(response.status).to.equal(400);
                expect('please check email or password');
                done();
            });
    });

    it('user is already exist - should respond with errors, status 400', function (done) {
        request(app).post('/api/auth/register')
            .send({
                email: 'userTest@user.com',
                password: 'qwerty',
            })
            .end(function (err, response) {
                expect(response.status).to.equal(400);
                expect('user already exists');
                done();
            });
    })
});
describe('User module: get users list,  update user', () => {
    //Authenticate Test User
    before(function (done) {
        authenticatedUser
            .post('/api/auth/sign-in')
            .send(userCredentials)
            .end(function (err, response) {
                token = response.body.token;
                expect(response.status).to.equal(200);
                done();
            });
    });

    describe('Get users-list', function (done) {
        it('should respond with status 200 if the user is logged in', function (done) {
            authenticatedUser.get('/api/users')
                .set('x-access-token', token)
                .end(function (err, response) {
                    expect(response.status).to.equal(200);
                    done();
                });
        });

        it('should respond with status 401 if the user is NOT logged in', function (done) {
            request(app).get('/api/users')
                .end(function (err, response) {
                    expect(response.status).to.equal(401);
                    done();
                });
        });
    });

    describe('Update user', function (done) {
        it('should return updated user with updated email, status 200', function (done) {
            authenticatedUser.put('/api/users')
                .send({
                    email: 'newUserTest@user.com',
                    password: 'newPassword',
                    _id: testUser._id
                })
                .set('x-access-token', token)
                .end(function (err, response) {
                    expect(response.status).to.equal(200);
                    expect(response.body.email).to.equal('newUserTest@user.com');
                    done();
                });
        });

        it('no email - should respond with errors, status 400', function (done) {
            authenticatedUser.put('/api/users')
                .send({
                    email: '',
                    password: 'newPassword',
                })
                .set('x-access-token', token)
                .end(function (err, response) {
                    expect(response.status).to.equal(400);
                    expect('please check email or password');
                    done();
                });
        });

        it('no password - should respond with errors, status 400', function (done) {
            authenticatedUser.put('/api/users')
                .send({
                    email: 'userNew@user.com',
                    password: '',
                })
                .set('x-access-token', token)
                .end(function (err, response) {
                    expect(response.status).to.equal(400);
                    expect('please check email or password');
                    done();
                });
        });
    })
});

