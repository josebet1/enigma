import url from 'url';

import TuringAnalyze from '../index';

function handleAnalyzeRequest(req, res) {
	const articleURL = req.body.site;

	let hostname = url.parse(articleURL).hostname;

	if (hostname.substring(0,4) === 'www.') {
		hostname = hostname.slice(4);
	}

	const newTuringAnalyze = new TuringAnalyze(hostname);

	newTuringAnalyze.calcOppositeSites(() => {

	});
}

export { handleAnalyzeRequest };
