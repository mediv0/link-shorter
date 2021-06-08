const request = require("supertest");
const mongoose = require("mongoose");
const User = require("../../models/User");
let server;

const dummyUser = {
    email: "anonymous@gmail.com",
    password: "$2b$12$Jzx/Bz3j5QxE9IYoQDgVweNkC0urA1IKYMSsnRmBpEDVnNVx.WJGa",
};

async function createDummyUser() {
    await User.collection.insertOne(dummyUser);
}

describe("/api/auth/login", () => {
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

        await User.collection.deleteMany({});
        await createDummyUser();
    });

    afterEach(async () => {
        await server.close();
        await mongoose.connection.close();
    });

    it("should login", async () => {
        const res = await request(server)
            .post("/auth/login")
            .send({
                email: "anonymous@gmail.com",
                password: "Xxx445709",
            })
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
    });

    it("should fail (invalid password or email)", async () => {
        const res = await request(server)
            .post("/auth/login")
            .send({
                email: "anonymous@gmail.com",
                password: "Xxx",
            })
            .set("Accept", "application/json");

        expect(res.body).toEqual({ message: "Your email or password is incorrect.", status: "error", statusCode: 401 });
        await mongoose.connection.close();
    });
});
