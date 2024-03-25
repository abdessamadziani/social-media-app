
// const app = require('../server'); // Importing the router
// const request = require('supertest');
// const User = require('../models/User'); // Assuming you have a User model


// jest.mock('../models/User', () => ({
//     findById: jest.fn(),
//   }));
  
//   describe('GET /user/details/:id', () => {
//     // it('returns user details successfully', async () => {
//     //   // Mock User.findById to return a user
//     //   const mockUser = {
//     //     _id: 'userId',
//     //     name: 'John Doe',
//     //     email: 'john@example.com',
//     //     // Add other user properties as needed
//     //   };
//     //   User.findById.mockResolvedValueOnce(mockUser);
  
//     //   // Make a request to the route
//     //   const response = await request(app)
//     //     .get('/api/users/user/details/userId')
//     //     .expect(200);
  
//     //   // Assertions
//     //   expect(User.findById).toHaveBeenCalledWith('userId');
//     //   expect(response.body).toEqual(expect.objectContaining({
//     //     _id: 'userId',
//     //     name: 'John Doe',
//     //     email: 'john@example.com',
//     //     // Assert other user properties as needed
//     //   }));
//     // });
  
//     it('handles user not found', async () => {
//       // Mock User.findById to return null
//       User.findById.mockResolvedValueOnce(null);
  
//       // Make a request to the route
//       const response = await request(app)
//         .get('/api/users/user/details/nonexistentUserId')
//         .expect(400);
  
//       // Assertions
//     //   nonexistentUserId
//       expect(User.findById).toHaveBeenCalledWith('nonexistentUserId');
//       expect(response.body).toEqual('User not found');
//     });
  
//     it('handles errors', async () => {
//       // Mock User.findById to throw an error
//       User.findById.mockRejectedValueOnce(new Error('Some error'));
  
//       // Make a request to the route
//       const response = await request(app)
//         .get('/api/users/user/details/userId')
//         .expect(500);
  
//       // Assertions
//       expect(User.findById).toHaveBeenCalledWith('userId');
//       expect(response.body).toEqual('Internal server error');
//     });
//   });