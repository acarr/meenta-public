const functions = require('firebase-functions')
const admin = require('firebase-admin')
const mcapi = require('mailchimp-api');
const apikey = '191ee247c1caf240f284318717714ad4-us16'
var mc = new mcapi.Mailchimp(apikey);

// This action will reject a given request remove any transactions charges.
module.exports = functions.database.ref('/emails/{id}/actions/subscribe').onWrite((event) => {

    var action = event.data.val();
    var db = admin.database();

    if (!action || action == 'failed' || action == 'completed') return;

    return db.ref(`/emails/${event.params.id}`).once('value').then(snap => {
        var data = snap.val();

				mc.lists.subscribe({id: '9909dc4664', email:{ email: data.email }}, function(data) {
					console.log('Success', data);
					return event.data.ref.set('completed');
				}, reason => {
					console.log(reason)
					return event.data.ref.set('failed');
				});
    });

});
