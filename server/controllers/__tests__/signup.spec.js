const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../../models/User");
let server;

describe("/api/auth", () => {
    beforeEach(async () => {
        server = require("../../index");
        server = await server.handler.listen(3001);

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.DB_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            });
        }
    });

    afterEach(async () => {
        await server.close();
        await mongoose.connection.close();
    });

    it("should sign up new user", async () => {
        await User.collection.deleteMany({});
        const res = await request(server)
            .post("/auth/signUp")
            .send({
                email: "anonymous@gmail.com",
                password: "Xxx445709",
                confirmPassword: "Xxx445709",
            })
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
    });

    it("should return 400 bad request ( validation error )", async () => {
        await User.collection.deleteMany({});
        const res = await request(server)
            .post("/auth/signUp")
            .send({
                email: "anonymous@gmail.com",
                password: "Xxx445709",
                confirmPassword: "Xxx445",
            })
            .set("Accept", "application/json");

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: '"confirmPassword" must be [ref:password]' });
    });
});
