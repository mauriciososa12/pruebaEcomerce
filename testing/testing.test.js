
import chai from 'chai'
import supertest from 'supertest'
import { generateUserFaker, generateProduct } from '../src/utils/faker.js'

const expect = chai.expect
const requester = supertest('http://localhost:8080')


describe('Router products', () => {
    describe('GET/api/products', () => {

        it('GET return 200', async () => {
            const { status } = await requester.get("/api/products");
            expect(status).to.exist.and.to.be.equal(200);
        })

        it('GET return array', async () => {
            const { _body } = await requester.get("/api/products");

            expect(_body.payload).to.be.an("array").that.is.not.empty;

        })
    })


})

