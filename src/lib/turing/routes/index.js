import url from 'url';
import request from 'request';

import TuringAnalyze from '../index';

function handleAnalyzeRequest(req, res) {
	const articleURL = req.body.site;
	const articleHeadline = req.body.headline;

	let hostname = url.parse(articleURL).hostname;

	if (hostname.substring(0,4) === 'www.') {
		hostname = hostname.slice(4);
	}

	const newTuringAnalyze = new TuringAnalyze(hostname, articleHeadline);

	newTuringAnalyze.googleEntitySearch((resp) => {
		newTuringAnalyze.calcOppositeSites((opposites) => {
			TuringAnalyze.bingSearch(resp, opposites[0], (url) => {
				const newURL = url.replace('http', 'https');
				res.cookie('urls', { hostname, articleURL, articleHeadline, newURL });
				res.redirect('/view');
			});
		});
	});
}

function handleProxyRequest(req, res) {
	const newURL = req.query.url;

	request(newURL, (error, response, body) => {
		res.send(body);
	});
}

function handleViewRequest(req, res) { 
	console.log(req.cookies);

	res.set('Content-Type', 'text/html');
	res.send(`<html><head></head><body><div style="width: 49.5% !important; height:100%;"> <iframe id="left" style="width: 100%; height: 100%;" src="https://www.google.com/search?q=%${req.cookies.urls.articleURL}&btnI=Im+Feeling+Lucky"></iframe></div> <div style="width: 49.5% !important;"><iframe id="right" style="width: 100%; height: 100%;" src="https://enigma.joseb.me/view?url=${req.cookies.urls.newURL}"></iframe></div></body></html>`);
}

export { handleAnalyzeRequest, handleViewRequest, handleProxyRequest };
