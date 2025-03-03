import express from 'express';
import { addProduct, addStudio, updateProduct, updateStudio, deleteProduct, deleteStudio } from '../controller/adminController.js';

const router = express.Router();

router.post('/products', addProduct);
router.post('/studios', addStudio);
router.put('/products/:id', updateProduct);
router.put('/studios/:id', updateStudio);
router.delete('/products/:id', deleteProduct);
router.delete('/studios/:id', deleteStudio);

export default router;
