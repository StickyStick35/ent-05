require("../models")
const request = require("supertest")
const app = require("../app")

let genreId; 

const URLB = "/api/v1/genres"
const genre = {
    name:"Horror",
};

test('POST -> URLB, should return statusCode 201 and res.body.name === genre.name', async() => {
    const res = await request(app)
    .post(URLB)
    .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

test('GET->URLB/genreId, should return statusCode 200 and res.body.name === genre.name', async() => {
    const res = await request(app)
    .get(`${URLB}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
});

test('PUT-> URLB/genreId, should return statusCode 200 and res.body.name === genre.name', async() => {
    const actorUpdate = {
        name: "Comedy"
    }
    const res = await request(app)
    .put(`${URLB}/${genreId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actorUpdate.name)
});

test('DELETE -> URLB/genreId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${URLB}/${genreId}`)

    expect(res.status).toBe(204)
});

