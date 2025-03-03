import request from 'supertest';
import app from '../app'; // Import your Express app instance
import User from '../model/userSchema.js';
import { jest } from '@jest/globals';
import { register, login } from '../controller/userController.js';

// Mock User model methods
jest.mock('../model/userSchema.js');

describe('User API Tests', () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = { body: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  test('should register a new user', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ username: 'testuser', email: 'test@example.com' });

    req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User registered successfully' }));
  });

  test('should not register an existing user', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com' });

    req.body = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'User already exists' }));
  });

  test('should login a user with correct credentials', async () => {
    User.findOne.mockResolvedValue({
      userId: 1,
      email: 'test@example.com',
      password: '$2b$10$hashedpassword123',
      role: 'user'
    });
    jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);

    req.body = { email: 'test@example.com', password: 'password123' };
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Login successful', token: expect.any(String) }));
  });

  test('should return error for invalid login credentials', async () => {
    User.findOne.mockResolvedValue(null);

    req.body = { email: 'test@example.com', password: 'password123' };
    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Invalid email or password' }));
  });
});
