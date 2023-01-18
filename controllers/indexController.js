const translate = require('@iamtraction/google-translate');
 
exports.index = (req, res) => {
	return res.json({
		status: true,
		data: {
			maintainer: 'adel trabelsi',
			// endpoint: 'api-translate.azharimm.site/translate?engine={engine}&text={text}&to={to}',
			// example: 'api-translate.azharimm.site/translate?engine=google&text=Welcome&to=id'
		}
	})
}
exports.trans = async (req, res) => {
	let resultInFrench;
	let resultinGerman;
	let resultinSpanish;
	let resultinKorean;
	let resultinJapanese;
	let resultinPortuguese;
	try {

		const text = req.body.text;
		let to = req.query.to;
		let result;


		if (text == null || text == '' || text == undefined) {
			throw new Error(
				"Text query cannot be null"
			);
			next();
		}

		if (to == null || to == '' || to == undefined) {
			to = "en";
		}

		resultInFrench = await translate(text, {to: "fr"});
		resultinGerman = await translate(text, {to: "de"});
		resultinSpanish = await translate(text, {to: "es"});
		resultinKorean = await translate(text, {to: "ko"});
		resultinJapanese = await translate(text, {to: "ja"});
		resultinPortuguese = await translate(text, {to: "pt"});


		return res.status(200).json({
			status: true,
			message: "success",
			data: {
				origin: "en",
				result: {
					french: resultInFrench.text,
					german: resultinGerman.text,
					spanish: resultinSpanish.text,
					korean: resultinKorean.text,
					japanese: resultinJapanese.text,
					portuguese: resultinPortuguese.text
				},

				targets: [],
			},
		});
	} catch (error) {
		res.status(500).json(
			{
				status: false,
				message: "Server error: ",
				data: {
					error: error.message,
				},
			},
		);
	}
};
