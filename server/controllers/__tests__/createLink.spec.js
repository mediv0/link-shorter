const request = require("supertest");
const mongoose = require("mongoose");
const Url = require("../../models/Url");
let server;

describe("/api/link/create ( without user )", () => {
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

        await Url.collection.deleteMany({});
    });

    afterEach(async () => {
        await server.close();
        await mongoose.connection.close();
    });

    it("should create new url", async () => {
        const res = await request(server)
            .post("/link/create")
            .send({
                url: "https://www.mahdi.wtf",
            })
            .set("Accept", "application/json");

        expect(res.status).toBe(200);
    });
});
