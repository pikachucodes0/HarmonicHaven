// import request from 'supertest';
// import express from 'express';
// import storeRouter from '../routes/storeRoutes.js';
// import Store from '../model/storeSchema.js';
// import { addProduct, listProducts, removeProduct } from '../controller/storeController.js';
// import { jest } from '@jest/globals';

// // Mock Store model methods
// jest.mock('../model/storeSchema.js');

// const app = express();
// app.use(express.json());
// app.use('/store', storeRouter);

// describe('Store Controller Tests', () => {
//   it('should add a product successfully', async () => {
//     const req = { body: { name: 'Product 1', price: 100, description: 'Test', image: 'img.png' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     Store.create.mockResolvedValue(req.body);
//     await addProduct(req, res);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
//   });

//   it('should list all products', async () => {
//     const products = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
//     Store.findAll.mockResolvedValue(products);
//     const req = {};
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     await listProducts(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ products }));
//   });

//   it('should delete a product successfully', async () => {
//     const req = { body: { id: 1 } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     Store.findByPk.mockResolvedValue({ destroy: jest.fn() });
//     await removeProduct(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
//   });
// });

// describe('Store Routes Tests', () => {
//   it('should handle adding a product', async () => {
//     Store.create.mockResolvedValue({ name: 'New Product', price: 200, description: 'Test', image: 'img.png' });
//     const response = await request(app).post('/store/add').send({ name: 'New Product', price: 200, description: 'Test', image: 'img.png' });
//     expect(response.status).toBe(201);
//   });

//   it('should handle listing products', async () => {
//     Store.findAll.mockResolvedValue([{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]);
//     const response = await request(app).get('/store/list');
//     expect(response.status).toBe(200);
//   });

//   it('should handle deleting a product', async () => {
//     Store.findByPk.mockResolvedValue({ destroy: jest.fn() });
//     const response = await request(app).delete('/store/delete/1');
//     expect(response.status).toBe(200);
//   });
// });
