---
layout: app
title: Search
published: true
---

<div ui-view class="bs-loading-container" bs-loading-overlay-reference-id="layout" bs-loading-overlay></div>

<script>
angular.element(document).ready(function () {
  Keen.ready(function () {
    console.log('Bootstrapping Ng /w Keen kk');
    angular.bootstrap(document, ['app']);
  });
});
</script>
