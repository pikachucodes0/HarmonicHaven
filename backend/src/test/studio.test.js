// import request from 'supertest';
// import express from 'express';
// import studioRouter from '../routes/studioRoutes.js';
// import Studio from '../model/studioSchema.js';
// import { addStudio, listStudios, deleteStudio } from '../controller/studioController.js';
// import { jest } from '@jest/globals';

// // Mock Studio model methods
// jest.mock('../model/studioSchema.js');

// const app = express();
// app.use(express.json());
// app.use('/studio', studioRouter);

// describe('Studio Controller Tests', () => {
//   it('should add a studio successfully', async () => {
//     const req = { body: { name: 'Studio 1', price: 300, description: 'Test Studio', image: 'studio.png' } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     Studio.create.mockResolvedValue(req.body);
//     await addStudio(req, res);
//     expect(res.status).toHaveBeenCalledWith(201);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
//   });

//   it('should list all studios', async () => {
//     const studios = [{ id: 1, name: 'Studio 1' }, { id: 2, name: 'Studio 2' }];
//     Studio.findAll.mockResolvedValue(studios);
//     const req = {};
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     await listStudios(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ studios }));
//   });

//   it('should delete a studio successfully', async () => {
//     const req = { params: { id: 1 } };
//     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
//     Studio.findByPk.mockResolvedValue({ destroy: jest.fn() });
//     await deleteStudio(req, res);
//     expect(res.status).toHaveBeenCalledWith(200);
//     expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
//   });
// });

// describe('Studio Routes Tests', () => {
//   it('should handle adding a studio', async () => {
//     Studio.create.mockResolvedValue({ name: 'New Studio', price: 400, description: 'Test Studio', image: 'studio.png' });
//     const response = await request(app).post('/studio/add').send({ name: 'New Studio', price: 400, description: 'Test Studio', image: 'studio.png' });
//     expect(response.status).toBe(201);
//   });

//   it('should handle listing studios', async () => {
//     Studio.findAll.mockResolvedValue([{ id: 1, name: 'Studio 1' }, { id: 2, name: 'Studio 2' }]);
//     const response = await request(app).get('/studio/list');
//     expect(response.status).toBe(200);
//   });

//   it('should handle deleting a studio', async () => {
//     Studio.findByPk.mockResolvedValue({ destroy: jest.fn() });
//     const response = await request(app).delete('/studio/delete/1');
//     expect(response.status).toBe(200);
//   });
// });
