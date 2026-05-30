---
title: How to make a fixed header with scrollable content
description: A minimal HTML structure for fixed headers with a scrollable content area underneath.
date: 2025-02-17
tags: [css, html, layout, frontend]
---
Usually we need a header that stays fixed at the top of the HTML page and below it a scrollable space.
```html
<div class="m-3 h-100 d-flex flex-column">
  <div id="header">
  <div>
  <div class="overflow-auto" id="app-site-administration-container-content-body">
    <router-outlet></router-outlet>
  </div>
</div>
```
