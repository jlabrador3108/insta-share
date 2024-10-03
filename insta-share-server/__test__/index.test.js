import dotenv from "dotenv";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const url = "http://127.0.0.1:" + process.env.PORT;

const username = "hola";

describe("New user", () => {
  test("Add user without username", async () => {
    try {
      await axios.post(`${url}/user`, {
        password: "123456",
      });
      fail("Expected request to fail");
    } catch (error) {
      expect(error.response?.status).toBe(404);
    }
  });
  test("Add user without password", async () => {
    try {
      await axios.post(`${url}/user`, {
        username: "user_" + uuidv4(),
      });
      fail("Expected request to fail");
    } catch (error) {
      expect(error.response?.status).toBe(404);
    }
  });
  test("Add user", async () => {
    const res = await axios.post(`${url}/user`, {
      username: "user_" + uuidv4(),
      password: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
  });
  test("Add user", async () => {
    const res = await axios.post(`${url}/user`, {
      username: username,
      password: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty("id");
  });
  test("Add existing user", async () => {
    try {
      await axios.post(`${url}/user`, {
        username: username,
        password: "123456",
      });
      fail("Expected request to fail");
    } catch (error) {
      expect(error.response?.status).toBe(409);
    }
  });
});

describe("Login", () => {
  test("Login without username", async () => {
    try {
      await axios.post(`${url}/user/login`, {
        password: "123456",
      });
      fail("Expected request to fail");
    } catch (error) {
      expect(error.response?.status).toBe(404);
    }
  });
  test("Login without password", async () => {
    try {
      await axios.post(`${url}/user/login`, {
        username: "user_" + uuidv4(),
      });
      fail("Expected request to fail");
    } catch (error) {
      expect(error.response?.status).toBe(404);
    }
  });
  test("Successful login", async () => {
    const res = await axios.post(`${url}/user/login`, {
      username: username,
      password: "123456",
    });
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty("token");
  });
  test("Login error", async () => {
    try {
      await axios.post(`${url}/user/login`, {
        username: username,
        password: uuidv4(),
      });
      fail("Expected request to fail");
    } catch (error) {
      expect(error.response?.status).toBe(401);
    }
  });
});
