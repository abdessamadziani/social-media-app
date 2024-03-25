const app = require('../server'); // Importing the router
const request = require('supertest');
const User = require('../models/User'); // Assuming you have a User model
const  signin  = require('../controllers/userController');
const bcrypt = require('bcrypt');









jest.mock('../models/User', () => ({
    findOne: jest.fn(),
  }));
  
  describe('POST /signin', () => {
    it('signs in a user successfully', async () => {
      // Mocking request body
      const requestBody = {
        email: 'test@example.com',
        password: 'password123',
      };
  
      // Mocking user data
      const mockUser = {
        _id: 'mockUserId',
        email: 'test@example.com',
        password: await bcrypt.hash('password123', 10), // Hash the password
        active: true,
        // Add other properties as needed
      };
  
      // Mocking User.findOne to return a user
      User.findOne.mockResolvedValueOnce(mockUser);
  
      // Make a request to the route
      const response = await request(app)
        .post('/api/users/signin')
        .send(requestBody)
        .expect(200);
  
      // Assert response body
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toEqual(expect.objectContaining({
        _id: mockUser._id,
        email: mockUser.email,
        // Assert other properties as needed
      }));
    });
  
    it('handles invalid credentials', async () => {
      // Mocking request body with missing email
      const requestBody = {
        password: 'password123',
      };
  
      // Make a request to the route
      const response = await request(app)
        .post('/api/users/signin')
        .send(requestBody)
        .expect(400);
  
      // Assert response body
      expect(response.body).toEqual({ message: 'email is not allowed to be empty' });
    });
  
    it('handles user not found', async () => {
      // Mocking request body
      const requestBody = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };
  
      // Mocking User.findOne to return null
      User.findOne.mockResolvedValueOnce(null);
  
      // Make a request to the route
      const response = await request(app)
        .post('/api/users/signin')
        .send(requestBody)
        .expect(400);
  
      // Assert response body
      expect(response.body).toEqual({ error: 'User not found' });
    });
  
    // Add more test cases as needed
  });