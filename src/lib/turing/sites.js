const spectrum = {
	gl: -6,
	hl: -4,
	ll: -2,
	n: 0,
	lr: 2,
	hr: 4,
	gr: 6,
}

const quality = {
	high: 1,
	mixed: 2,
	poor: 3,
}

const validSites = {
	'vox.com': { q: quality.mixed, s: spectrum.gl },
	'huffingtonpost.com': { q: quality.mixed, s: spectrum.gl },
	'breitbart.com': { q: quality.mixed, s: spectrum.gr },
	'theblaze.com': { q: quality.mixed, s: spectrum.gr },
	'foxnews.com': { q: quality.high, s: spectrum.hr },
	'cnn.com': { q: quality.high, s: spectrum.hl },
	'wsj.com': { q: quality.high, s: spectrum.lr },
	'realclearpolitics.com': { q: quality.high, s: spectrum.lr },
	'forbes.com': { q: quality.high, s: spectrum.lr },
	'nbcnews.com': { q: quality.high, s: spectrum.ll },
	'cbsnews.com': { q: quality.high, s: spectrum.ll },
	'bloomberg.com': { q: quality.high, s: spectrum.ll },
	'politico.com': { q: quality.high, s: spectrum.ll },
	'thewashingtonpost.com': { q: quality.high, s: spectrum.ll },
	'nytimes.com': { q: quality.high, s: spectrum.ll },
	'nypost.com': { q: quality.mixed, s: spectrum.hr },
	'bluelivesmatter.blue': { q: quality.high, s: spectrum.hr },
}

export { spectrum, quality, validSites };
