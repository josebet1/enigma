import url from 'url';

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
				res.cookie('urls', { hostname, articleURL, articleHeadline, newURL: url });
				res.redirect('/view');
			});
		});
	});
}

function handleViewRequest(req, res) { 
	console.log(req.cookies);
	res.set('Content-Type', 'text/html');
	res.send(`<html><head></head><body><div style="width: 49.5% !important; height:100%;"> <iframe id="left" style="width: 100%; height: 100%;" src="${req.cookies.urls.articleURL}"></iframe></div> <div style="width: 49.5% !important;"><iframe id="right" style="width: 100%; height: 100%;" src="${req.cookies.urls.newURL}"></iframe></div></body></html>`);
}

export { handleAnalyzeRequest, handleViewRequest };
