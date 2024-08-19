require("../models")
const request = require("supertest")
const app = require("../app")

let directorId; 

const URLB = "/api/v1/directors"
const director = {
    firstName:"Sam",
    lastName: "Raimi",
    nationality: "North American",
    image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT2HMfq1IyZoDw99Ks_mmcpRIUtKEXYzzquyDaBrj-a8J54-axJJ2xfExvWERNZtN9zqiRu17-d9oTtG4s",
    birthday: "1959-10-23"
};

test('POST -> URLB, should return statusCode 201 and res.body.firstName === director.firstName', async() => {
    const res = await request(app)
    .post(URLB)
    .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test('GET->URLB/directorId, should return statusCode 200 and res.body.firstName === director.firstName', async() => {
    const res = await request(app)
    .get(`${URLB}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
});

test('PUT-> URLB/directorId, should return statusCode 200 and res.body.firstName === director.firstName', async() => {
    const actorUpdate = {
        firstName: "Samantha"
    }
    const res = await request(app)
    .put(`${URLB}/${directorId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actorUpdate.firstName)
});

test('DELETE -> URLB/directorId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${URLB}/${directorId}`)

    expect(res.status).toBe(204)
});

