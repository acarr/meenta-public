---
layout: search
title: Search
published: true
---

<script src="https://www.gstatic.com/firebasejs/4.8.0/firebase.js"></script>

<script>
var config = {
  apiKey: "AIzaSyDevLM4q4OFtIS2KvxuPUm4vE_1T_-f9NY",
  authDomain: "meenta-development.firebaseapp.com",
  databaseURL: "https://meenta-development.firebaseio.com",
  projectId: "meenta-development",
  storageBucket: "meenta-development.appspot.com",
  messagingSenderId: "521551258641"
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

<!-- Setup the view -->
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
