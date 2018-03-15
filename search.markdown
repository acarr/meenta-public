---
layout: search
title: Search
published: true
---

<script src="https://www.gstatic.com/firebasejs/4.10.1/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBFeEzLC7tH2fyEhSXEjA6LxEkfVlFtvXY",
    authDomain: "samplehub-25c4d.firebaseapp.com",
    databaseURL: "https://samplehub-25c4d.firebaseio.com",
    projectId: "samplehub-25c4d",
    storageBucket: "samplehub-25c4d.appspot.com",
    messagingSenderId: "529323641154"
  };
  firebase.initializeApp(config);
</script>

<link href="https://app.meenta.io/css/vendors.css" rel="stylesheet">
<link href="https://app.meenta.io/css/app.css" rel="stylesheet">
<script src="https://app.meenta.io/scripts/vendors.js"></script>
<script src="https://app.meenta.io/scripts/core.js"></script>
<script src="https://app.meenta.io/find/templates.js"></script>
<script src="https://app.meenta.io/find/app.js"></script>
<script src="https://app.meenta.io/scripts/modals.js"></script>

<div ui-view></div>

<br>
<br>

<script>
  angular.element(document).ready(function () {
    Keen.ready(function () {
      console.log('Bootstrapping Ng /w Keen');
      angular.bootstrap(document, ['app']);
    });
});
</script>
