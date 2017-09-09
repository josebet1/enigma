import async from 'async';
import request from 'request';

import { spectrum, quality, validSites } from './sites';

const BING_API_KEY = process.env.BING_KEY;
const GCLOUD_API_KEY = process.env.GCLOUD_KEY;

class TuringAnalyze {
	constructor(hostname) {
		this.hostname = hostname;
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

	static googleEntitySearch(headline, callback) {
		const requestOptions = {
			url: 'https://language.googleapis.com/v1/documents:analyzeEntities',
			headers: {
				'Authorization': `Bearer ${GCLOUD_API_KEY}`, 
			},
			body: {
				document: {
					type: 'PLAIN_TEXT',
					content: headline,
				},
				encoding: 'UTF8',
			},
		}

		request(requestOptions, (error, response, body) => {
			console.log(body);
		});

	}

	static bingSearch(termsArr, site, callback) {
		const searchTerms = termsArr.join('+');
		const searchQuery = `q=${searchTerms}+site:${site}&mkt=en-us`;

		const requestOptions = {
			url: `https://api.cognitive.microsoft.com/bing/v5.0/news/search?q=${searchQuery}`,
			headers: {
				'Ocp-Apim-Subscription-Key': BING_API_KEY
			}
		};

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
