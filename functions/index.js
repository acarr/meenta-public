const functions = require('firebase-functions');
const admin = require('firebase-admin')
require('@google-cloud/debug-agent').start({ allowExpressions: true })

// admin.initializeApp(functions.config().firebase)

// exports.betaEmails = require('./beta')

// This builds the Instrument Sitemap XML file.
exports.instrumentSitemap = require('./instrumentSitemap')
