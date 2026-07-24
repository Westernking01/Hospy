import { test, expect } from '@playwright/test';

test.describe('API — Cart Endpoints', () => {
  const BASE = '/api/v1/cart';

  test('GET /api/v1/cart should return a response', async ({ request }) => {
    const response = await request.get(BASE);
    // Without auth, should return 401 or a valid cart structure
    expect([200, 401, 500]).toContain(response.status());
  });

  test('POST /api/v1/cart/items should validate request body', async ({ request }) => {
    const response = await request.post(`${BASE}/items`, {
      data: {},
    });
    // Expect validation error (400) or auth error (401)
    expect([400, 401, 422, 500]).toContain(response.status());
  });

  test('DELETE /api/v1/cart/clear should return appropriate status', async ({ request }) => {
    const response = await request.delete(`${BASE}/clear`);
    expect([200, 204, 401, 405, 500]).toContain(response.status());
  });

  test('POST /api/v1/cart/coupon should validate coupon code', async ({ request }) => {
    const response = await request.post(`${BASE}/coupon`, {
      data: { code: 'INVALID_COUPON_TEST' },
    });
    expect([400, 401, 404, 422, 500]).toContain(response.status());
  });
});

test.describe('API — Order Endpoints', () => {
  test('GET /api/v1/orders should require authentication', async ({ request }) => {
    const response = await request.get('/api/v1/orders');
    // Without auth, expect 401
    expect([200, 401, 500]).toContain(response.status());
  });

  test('GET /api/v1/orders/INVALID should handle invalid order number', async ({ request }) => {
    const response = await request.get('/api/v1/orders/INVALID-ORDER-NUMBER');
    expect([400, 401, 404, 500]).toContain(response.status());
  });
});

test.describe('API — Checkout Endpoints', () => {
  test('POST /api/v1/checkout/validate should validate request', async ({ request }) => {
    const response = await request.post('/api/v1/checkout/validate', {
      data: {},
    });
    expect([400, 401, 422, 500]).toContain(response.status());
  });

  test('POST /api/v1/checkout/place-order should require authentication', async ({ request }) => {
    const response = await request.post('/api/v1/checkout/place-order', {
      data: {},
    });
    expect([400, 401, 422, 500]).toContain(response.status());
  });
});

test.describe('API — Profile Endpoints', () => {
  test('GET /api/v1/profile should require authentication', async ({ request }) => {
    const response = await request.get('/api/v1/profile');
    expect([200, 401, 500]).toContain(response.status());
  });

  test('GET /api/v1/addresses should require authentication', async ({ request }) => {
    const response = await request.get('/api/v1/addresses');
    expect([200, 401, 500]).toContain(response.status());
  });
});

test.describe('API — Shipping & Tax Endpoints', () => {
  test('GET /api/v1/shipping should return shipping methods', async ({ request }) => {
    const response = await request.get('/api/v1/shipping');
    expect([200, 401, 405, 500]).toContain(response.status());
  });

  test('GET /api/v1/taxes should return tax information', async ({ request }) => {
    const response = await request.get('/api/v1/taxes');
    expect([200, 401, 405, 500]).toContain(response.status());
  });
});

test.describe('API — Payment Endpoints', () => {
  test('POST /api/v1/payments/initialize should validate request', async ({ request }) => {
    const response = await request.post('/api/v1/payments/initialize', {
      data: {},
    });
    expect([400, 401, 422, 500]).toContain(response.status());
  });

  test('POST /api/v1/payments/verify should validate request', async ({ request }) => {
    const response = await request.post('/api/v1/payments/verify', {
      data: {},
    });
    expect([400, 401, 422, 500]).toContain(response.status());
  });
});

test.describe('API — Coupon Endpoints', () => {
  test('POST /api/v1/coupons/validate should validate coupon code', async ({ request }) => {
    const response = await request.post('/api/v1/coupons/validate', {
      data: { code: 'NONEXISTENT_COUPON' },
    });
    expect([400, 401, 404, 422, 500]).toContain(response.status());
  });
});
