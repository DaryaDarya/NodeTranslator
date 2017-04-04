var config = {
	db:{
		database: "translate",
		host: "127.0.0.1",
		user: "root",
		password: ""
	},

	translators: {
		yandex: {
			protocol: 'https',
			hostname: 'translate.yandex.net',
			pathname: 'api/v1.5/tr.json/translate',
			query: {
				key: 'trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4',
			}
		}
	}
};

module.exports = config;

