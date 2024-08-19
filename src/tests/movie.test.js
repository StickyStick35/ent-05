require("../models")
const request = require("supertest")
const app = require("../app");
const Genre = require("../models/Genre");
const Actor = require("../models/Actor");
const Director = require("../models/Director");

let movieId; 

const URLB = "/api/v1/movies"
const movie = {
    name:"Alien: Romulus",
    image: "https://archivos-cms.cinecolombia.com/images/_aliases/exhibition_banner_mobile/7/2/2/3/63227-1-esl-CO/efa182c7a6d9-800x600_bannermovil_cinecolombia_alien.png",
    synopsis: "Alien killing people",
    releaseYear: 2024
    };

test('POST -> URLB, should return statusCode 201 and res.body.name === movie.name', async() => {
    const res = await request(app)
    .post(URLB)
    .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test('GET->URLB/movieId, should return statusCode 200 and res.body.name === movie.name', async() => {
    const res = await request(app)
    .get(`${URLB}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test('PUT-> URLB/movieId, should return statusCode 200 and res.body.name === movie.name', async() => {
    const actorUpdate = {
        name: "Halloween"
    }
    const res = await request(app)
    .put(`${URLB}/${movieId}`)
    .send(actorUpdate)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(actorUpdate.name)
});

test('POST -> URLB/movieId/genre, should return statusCode 200 and res.body.length === 1', async() => {
    const genre = {
        name: "Thriller"
    }
    const createGenrer = await Genre.create(genre)
    const res = await request(app)
    .post(`${URLB}/${movieId}/genres`)
    .send([createGenrer.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].name).toBe(createGenrer.name)
    await createGenrer.destroy()
});

test('POST -> URLB/movieId/actor, should return statusCode 200 and res.body.length === 1', async() => {
    const actor = {
        firstName:"Andrew",
        lastName: "Garfield",
        nationality: "North American",
        image: "https://www.mundodeportivo.com/alfabeta/hero/2024/01/andrew-garfield-spider-man-venom.jpg?width=768&aspect_ratio=16:9&format=nowebp",
        birthday: "1983-08-20"
    };
    const createActor = await Actor.create(actor)
    const res = await request(app)
    .post(`${URLB}/${movieId}/actors`)
    .send([createActor.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].name).toBe(createActor.name)
    await createActor.destroy()
});

test('POST -> URLB/movieId/director, should return statusCode 200 and res.body.length === 1', async() => {
    const director = {
        firstName:"Sam",
        lastName: "Raimi",
        nationality: "North American",
        image: "https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcT2HMfq1IyZoDw99Ks_mmcpRIUtKEXYzzquyDaBrj-a8J54-axJJ2xfExvWERNZtN9zqiRu17-d9oTtG4s",
        birthday: "1959-10-23"
    };
    const createDirector = await Director.create(director)
    const res = await request(app)
    .post(`${URLB}/${movieId}/directors`)
    .send([createDirector.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].id).toBeDefined()
    expect(res.body[0].name).toBe(createDirector.name)
    await createDirector.destroy()
});

test('DELETE -> URLB/movieId, should return statusCode 204', async() => {
    const res = await request(app)
    .delete(`${URLB}/${movieId}`)

    expect(res.status).toBe(204)
});

