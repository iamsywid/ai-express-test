const assert = require('assert');
const request = require('supertest');
const express = require('express');
const app = require('../index');

let server;

beforeAll((done) => {
  server = app.listen(4000, done); // Start the server on port 4000
});

afterAll((done) => {
  server.close(done); // Close the server after tests are done
});

describe('GET /hello', () => {
  it('should return Hello World!', async () => {
    const response = await request(app).get('/hello');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});

describe('Security Headers', () => {
  it('should have the correct security headers', async () => {
    const response = await request(app).get('/hello');
    expect(response.headers['cache-control']).toBe('no-store, max-age=0');
    expect(response.headers['clear-site-data']).toBe('"cache","cookies","storage"');
    expect(response.headers['content-security-policy']).toBe("default-src 'self'; form-action 'self'; object-src 'none'; frame-ancestors 'none'; upgrade-insecure-requests; block-all-mixed-content");
    expect(response.headers['cross-origin-embedder-policy']).toBe('require-corp');
    expect(response.headers['cross-origin-opener-policy']).toBe('same-origin');
    expect(response.headers['cross-origin-resource-policy']).toBe('same-origin');
    expect(response.headers['permissions-policy']).toBe("accelerometer=(), autoplay=(), camera=(), cross-origin-isolated=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(self), usb=(), web-share=(), xr-spatial-tracking=(), clipboard-read=(), clipboard-write=(), gamepad=(), hid=(), idle-detection=(), interest-cohort=(), serial=(), unload=()");
    expect(response.headers['referrer-policy']).toBe('no-referrer');
    expect(response.headers['strict-transport-security']).toBe('max-age=31536000; includeSubDomains');
    expect(response.headers['x-content-type-options']).toBe('nosniff');
    expect(response.headers['x-frame-options']).toBe('deny');
    expect(response.headers['x-permitted-cross-domain-policies']).toBe('none');
  });
});
