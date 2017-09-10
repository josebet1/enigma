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
	res.send(`<div style="width: 50% !important; height:100%;"> <iframe id="left" style="width: 100%; height: 100%;" src="${req.cookies.articleURL}"></iframe></div> <div style="width: 50% !important;"><iframe id="right" style="width: 100%; height: 100%;" src="${req.cookies.newURL}"></iframe></div>`);
}

export { handleAnalyzeRequest, handleViewRequest };
