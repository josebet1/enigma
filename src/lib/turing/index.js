import async from 'async';
import request from 'request';

import { spectrum, quality, validSites } from './sites';

const BING_API_KEY = process.env.BING_KEY;
const GCLOUD_API_KEY = process.env.GCLOUD_KEY;
console.log(process.env);

class TuringAnalyze {
	constructor(hostname, headline) {
		this.hostname = hostname;
		this.headline = headline;
	}

	calcOppositeSites(callback) {
		if (this.hostname in validSites) {
			const site = validSites[this.hostname];
			const siteCopy = JSON.parse(JSON.stringify(site));

			siteCopy.s *= -1;
			const orderedMatchedSites = [];

			async.forEachOf(validSites, (value, key, cb) => {
				if (value.q === siteCopy.q && value.s === siteCopy.s) {
					orderedMatchedSites.push(key);
				}
				cb();
			}, () => {
				callback(orderedMatchedSites);
			});
		} else {
			callback(false);
		}
	}

	getOppositeArticle(callback) {
		this.calcOppositeSites((res) => {
			if (res) {
				googleEntitySearch(() => {
					// now find matching article in bing
					// return the final atricle url
				});
			} else {
				callback(false);
			}
		});
	}

	googleEntitySearch(callback) {
		const requestOptions = {
			url: `https://language.googleapis.com/v1/documents:analyzeEntities?key=${GCLOUD_API_KEY}`,
			method: 'POST',
			json: true,
			body: {
				document: {
					type: 'PLAIN_TEXT',
					content: this.headline,
				},
			},
		};

		request(requestOptions, (error, response, body) => {
			if (!error) {
				console.log(body);
				const termsArr = [];
				console.log(body.entities); // remove entities until we get something unless its 0 // then switch sites
				body.entities.forEach((elem) => {
					termsArr.push(elem.name);
				});
				callback(termsArr);
			} else {
				console.log(error);
			}
		});

	}

	static bingSearch(termsArr, site, callback) {
		const searchTerms = termsArr.join('+');
		const searchQuery = `q=${searchTerms}+site:${site}&mkt=en-us`;

		const requestOptions = {
			url: `https://api.cognitive.microsoft.com/bing/v5.0/news/search?${searchQuery}`,
			headers: {
				'Ocp-Apim-Subscription-Key': BING_API_KEY
			}
		};

		console.log(`https://api.cognitive.microsoft.com/bing/v5.0/news/search?${searchQuery}`);

		request(requestOptions, (error, response, body) => {
			const parsedBody = JSON.parse(body);
			if (parsedBody.totalEstimatedMatches > 0) {
				callback(parsedBody.value[0].url);
			} else {
				callback(false);
			}
		});
	}

}

export default TuringAnalyze;
