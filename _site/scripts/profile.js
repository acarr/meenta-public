var app = angular.module('mtprofile', []);

app.config(function() {
  var config = {
    apiKey: "AIzaSyBFeEzLC7tH2fyEhSXEjA6LxEkfVlFtvXY",
    authDomain: "samplehub-25c4d.firebaseapp.com",
    databaseURL: "https://samplehub-25c4d.firebaseio.com",
    projectId: "samplehub-25c4d",
    storageBucket: "samplehub-25c4d.appspot.com",
    messagingSenderId: "529323641154"
  };
  firebase.initializeApp(config);
})

app.directive('profile', function() {
  return {
    transclude: true,
    scope: {
      title: '@'
    },
    template: `
      <a href="#" style="color: #2977D2; font-weight: bold;" ng-click="go()">
        {{ title }}
      </a>
    `,
    controller: ['$scope', '$timeout', function($scope, $timeout) {

      $scope.go = function() {
        if ($scope.title.toLowerCase() === 'search') {
          document.location = '/search'
        } else {
          document.location = '/app'
        }
      }

      firebase.auth().onAuthStateChanged(function(user) {
        $timeout(function() {
          if (user) $scope.title = 'Console'
        }, 400);
      });
    }]
  }
})
