'use strict';

process.env.SECRET = "TEST_SECRET";

const { sequelize } = require('../../../auth/models/index.model');
const { handleSignup } = require('../../../auth/routes/handlers.routes');

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

describe('testing the Signup Handler', () => {

  const res = {
    send: jest.fn(() => res),
    status: jest.fn(() => res),
    json: jest.fn(() => res),
  };
  const next = jest.fn();

  test('Should respons with a new user if a Username and Password is present on the request', async () => {

    let req = {
      body: {
        username: 'test',
        password: 'test'
      }
    };

    await handleSignup(req, res, next);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        user: expect.any(Object),
        token: expect.any(String)
      })
    );
  });

  test('Should call the error handler if no body attached to the request the on the request body', async () => {
    let req = {};
    jest.clearAllMocks();

    await handleSignup(req, res, next);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.anything());
  });
});