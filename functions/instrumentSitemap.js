const _ = require('underscore')
const functions = require('firebase-functions')
const request = require('request')
const moment = require('moment')

module.exports = functions.https.onRequest((req, res) => {

	var url = 'https://samplehub-25c4d.firebaseio.com/instrument.json'
	request.get({ url: url, json: true }, function(err, data) {

		var list = [];
		var instruments = data.body
		_.each(instruments, function(obj, id) {
			var date = moment().format('YYYY-MM-DD');
			if (obj.updatedAt) date = moment(obj.updatedAt).format('YYYY-MM-DD')

			var o = `<url><changefreq>monthly</changefreq><loc>https://meenta.io/app/#!/machine/${id}</loc><lastmod>${date}</lastmod><priority>0.9</priority></url>`
			list.push(o)
		})

		var d = '<urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">'
		d = d + list.join('')
		d = d + '</urlset>'

		res.header('Content-Type', 'text/xml')
		res.send(d)
	})
})
