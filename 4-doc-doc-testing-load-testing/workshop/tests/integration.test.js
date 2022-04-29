const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const server = require('../server');
const api = supertest(server);
const ToDo = require('../toDoModel').ToDo;

/* integration tests */

describe("ToDo", () => {
    beforeEach(async () => {
        await ToDo.deleteMany({});
        const toDoObjects = helper.initialToDos.map(toDo => new ToDo(toDo));
        const promiseArray = toDoObjects.map(toDo => toDo.save());
        await Promise.all(promiseArray);
    });

    test("creation succeeds with title", async () => {
        const newToDo = {
            title: "Test",
            completed: false
        };

        await api
            .post("/todo")
            .send(newToDo)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/todo");
        expect(response.body.length).toBe(helper.initialToDos.length + 1);
        const titles = response.body.map(r => r.title);
        expect(titles).toContain("Test");
    });

    test("Set done succeeds", async () => {
        const response = await api.get("/todo");
        const toDo = response.body[0];
        const id = toDo._id;
        await api
            .put(`/todo/${id}`)
            .send({done: true})
            .expect(200)
            .expect("Content-Type", /application\/json/);
        const response2 = await api.get("/todo");
        const toDo2 = response2.body[0];
        expect(toDo2.done).toBe(true);
    });

});