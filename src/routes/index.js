import express from 'express';
import { handleAnalyzeRequest } from '../lib/turing/routes';

const router = express.Router();

router.post('/analyze', handleAnalyzeRequest);

export default router;