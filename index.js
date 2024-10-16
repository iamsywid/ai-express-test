// Hello World Express Server
const express = require('express');
const app = express();
const port = 8080;

// Middleware to set security headers
app.use((req, res, next) => {
  res.setHeader('cache-control', 'no-store, max-age=0');
  res.setHeader('clear-site-data', '"cache","cookies","storage"');
  res.setHeader('content-security-policy', "default-src 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; block-all-mixed-content");
  res.setHeader('cross-origin-embedder-policy', 'require-corp');
  res.setHeader('cross-origin-opener-policy', 'same-origin');
  res.setHeader('cross-origin-resource-policy', 'same-origin');
  res.setHeader('permissions-policy', "accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), unload=()");
  res.setHeader('referrer-policy', 'no-referrer');
  res.setHeader('strict-transport-security', 'max-age=31536000; includeSubDomains');
  res.setHeader('x-content-type-options', 'nosniff');
  res.setHeader('x-frame-options', 'deny');
  res.setHeader('x-permitted-cross-domain-policies', 'none');
  next();
});

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = app;