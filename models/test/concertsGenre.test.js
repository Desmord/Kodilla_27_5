const Concert = require('../concerts.model');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('Concerts by genre', () => {


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

    it('Search by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.body).to.be.an('array');
        expect(res.body[0].performer).to.be.equal(`Maybell Haley`)
        expect(res.body[0].genre).to.be.equal(`Pop`)
    });

    it('Search by genre lowerCase', async () => {
        const res = await request(server).get('/api/concerts/genre/pop');
        expect(res.body).to.be.an('array');
        expect(res.body[0].genre).to.be.equal(`Pop`)
    });

    it('Search by genre wrong name', async () => {
        const res = await request(server).get('/api/concerts/genre/[]');
        expect(res.body.message).to.be.equal(`Not found`)
    });

    it('Search by genre non existing name', async () => {
        const res = await request(server).get('/api/concerts/genre/classic');
        expect(res.body.message).to.be.equal(`Not found`)
    });

    after(async () => {
        await Concert.deleteMany();
    });

});
