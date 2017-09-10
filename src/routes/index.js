import express from 'express';
import { handleAnalyzeRequest, handleViewRequest, handleProxyRequest } from '../lib/turing/routes';

const router = express.Router();

router.post('/analyze', handleAnalyzeRequest);

router.get('/view', handleViewRequest);

router.get('/proxy', handleProxyRequest);

router.get('/blank', (req, res) => {
	res.send();
});

export default router;