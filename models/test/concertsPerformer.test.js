const Concert = require('../concerts.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('Concerts by performer', () => {


    before(async () => {
        const concert1Test = new Concert({
            _id: '5d9f1140f10a81216cfd4401',
            performer: `John Doe`,
            genre: `Rock`,
            price: 20,
            day: 1,
            image: `/img/uploads/1fsd324fsdg.jpg`,
        });
        const concert2Test = new Concert({
            _id: '5d9f1140f10a81216cfd4402',
            performer: `Rebekah Parker`,
            genre: `R&B`,
            price: 40,
            day: 2,
            image: `/img/uploads/1fsd324fsdg.jpg`,
        });
        const concert3Test = new Concert({
            _id: '5d9f1140f10a81216cfd4403',
            performer: `Maybell Haley`,
            genre: `Pop`,
            price: 35,
            day: 3,
            image: `/img/uploads/1fsd324fsdg.jpg`,
        });

        await concert1Test.save();
        await concert2Test.save();
        await concert3Test.save();

    });;

    it('Search by performer', async () => {
        const res = await request(server).get('/api/concerts/performer/John Doe');
        expect(res.body).to.be.an('array');
        expect(res.body[0].performer).to.be.equal(`John Doe`)
    });

    it('Search by performer lowerCase', async () => {
        const res = await request(server).get('/api/concerts/performer/maybell haley');
        expect(res.body).to.be.an('array');
        expect(res.body[0].performer).to.be.equal(`Maybell Haley`)
    });

    it('Search by performer wrong name', async () => {
        const res = await request(server).get('/api/concerts/performer/[]');
        expect(res.body.message).to.be.equal(`Not found`)
    });

    it('Search by performer non existing name', async () => {
        const res = await request(server).get('/api/concerts/performer/Mikolaj');
        expect(res.body.message).to.be.equal(`Not found`)
    });

    after(async () => {
        await Concert.deleteMany();
    });

});
