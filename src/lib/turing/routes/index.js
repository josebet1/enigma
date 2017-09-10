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
}

export { handleAnalyzeRequest, handleViewRequest };
