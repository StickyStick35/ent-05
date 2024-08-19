require("../models")
const request = require("supertest")
const app = require("../app")

let actorId;

const URLB = "/api/v1/actors"
const actor = {
    firstName:"Andrew",
    lastName: "Garfield",
    nationality: "North American",
    image: "https://www.mundodeportivo.com/alfabeta/hero/2024/01/andrew-garfield-spider-man-venom.jpg?width=768&aspect_ratio=16:9&format=nowebp",
    birthday: "1983-08-20"
};

test('POST -> URLB, should return statusCode 201 and res.body.firstName === actor.firstName', async() => {
    const res = await request(app)
    .post(URLB)
    .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test('GET->URLB/actorId, should return statusCode 200 and res.body.firstName === actor.firstName', async() => {
    const res = await request(app)
    .get(`${URLB}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
});

test('PUT-> URLB/actorId, should return statusCode 200 and res.body.firstName === actor.firstName', async() => {
    const actorUpdate = {
        firstName: "Peter"
    }
    const res = await request(app)
    .put(`${URLB}/${actorId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

test('DELETE -> URLB/actorId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${URLB}/${actorId}`)

    expect(res.status).toBe(204)
});

