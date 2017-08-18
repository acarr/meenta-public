app
    .config([function() {

    	var config = {
            apiKey: "AIzaSyDsZjmh7RQEBg3k8zNFNWZw7RWGmyVCNLQ",
            authDomain: "vera-39d1b.firebaseapp.com",
            databaseURL: "https://vera-39d1b.firebaseio.com",
            projectId: "vera-39d1b",
            storageBucket: "vera-39d1b.appspot.com",
            messagingSenderId: "845750951912"
    	};

        firebase.initializeApp(config);

    }])
    .service('fbUtils', function() {
       return {
        	encode: (function(pattern, replacer) {
        		return function(s) {
              return s.replace(pattern, replacer);
            };
        	})(/[/%\.#\$\[\]]/g, function(c) { return '%' + c.charCodeAt(0).toString(16).toUpperCase(); }),
        	encodeFully: function(s) {
        		return encodeURIComponent(s).replace('.', '%2E');
        	},
        	decode: function(s) {
        		return decodeURIComponent(s);
        	}
       };
    })
    .service('fbPaths', function() {

        // Define the root for all DB paths.
        var root = firebase.database().ref();

        return {

            users: root.child('users'),
            userOrganizations: root.child('userOrganizations'),

            organizations: root.child('organizations'),
            organizationRequests: root.child('organizationRequests'),
            organizationCollaborations: root.child('organizationCollaborations'),
            organizationAssessments: root.child('organizationAssessments'),
            organizationActionPlans: root.child('organizationActionPlans'),

            collaborations: root.child('collaborations'),
            assessments: root.child('assessments'),
            plans: root.child('plans'),
            templates: root.child('templates'),
            actions: root.child('actions'),

            indicators: root.child('indicators'),
            actionIndicatorMeasures: root.child('actionIndicatorMeasures'),
            indicatorMeasureActions: root.child('indicatorMeasureActions'),
            invites: root.child('invites'),

        };
    });
