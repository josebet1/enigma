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
	request(req.query.url, (error, response, body) => {
		res.send(body);
	});
}

function handleViewRequest(req, res) { 
	console.log(req.cookies);

	res.set('Content-Type', 'text/html');
	res.send(`<title>Compare News Articles</title><link crossorigin=anonymous href=https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css integrity=sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u rel=stylesheet><style>.right{color:red}.left{color:#00f}.lead,h1{margin-bottom:5px;margin-top:5px}h2{margin-top:5px;margin-bottom:5px}body{background-image:url(http://68.media.tumblr.com/e324c866ff45e7e30dc2996607fa0ee0/tumblr_og2ppfmQNq1tomxvuo4_1280.jpg);height:40vh}iframe{border:0}#top{color:#fff}#main{background-color:#fff;height:calc(100vh - 83px)}#top{margin-top:45vh;transition:3s ease}#main{margin-top:50vh;transition:3s ease}.transform-up-top{transform:translateY(-45vh)}.transform-up-main{transform:translateY(-95vh)}.transform-body{transform:scaleY(.1)}</style><body id=body><div class="text-center container"id=top><h1>Enigma</h1><p class=lead>Compare the same articles from different perspectives.</div><div id=main><div style=width:50%!important;height:100%;display:inline-block><div class=text-center><h2>Your Article</h2><p class=lead> <span class=right></span></div><iframe id=left src=${req.cookies.urls.newURL} style="width:100%;height:calc(100% - 82px)"></iframe></div><div style=width:49%!important;height:100%;display:inline-block><div class=text-center><h2>Alternative Article</h2><p class=lead> <span class=left></span></div><iframe id=right src=${req.cookies.urls.articleURL} style="width:100%;height:calc(100% - 82px)"></iframe></div></div><script>setTimeout(function(){document.getElementById("top").className=document.getElementById("top").className+" transform-up-top",document.getElementById("main").className=document.getElementById("main").className+" transform-up-main"},1500),setTimeout(function(){document.getElementById("body").className="transform-up-body"},4500)</script>`);
}

export { handleAnalyzeRequest, handleViewRequest, handleProxyRequest };
