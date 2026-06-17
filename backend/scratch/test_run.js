const http = require('http');

const request = (path, method, body, token = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: `/api/v1${path}`,
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

const runTest = async () => {
  try {
    console.log("--- 1. Registering Admin User ---");
    const username = `admin_${Date.now()}`;
    const email = `admin_${Date.now()}@example.com`;
    const reg = await request('/auth/register', 'POST', {
      username,
      email,
      password: "password123",
      role: "ADMIN"
    });
    console.log('Status:', reg.status, 'Message:', reg.body.message);

    console.log("\n--- 2. Logging In ---");
    const login = await request('/auth/login', 'POST', {
      email,
      password: "password123"
    });
    const token = login.body.data.accessToken;
    console.log('Login Success! Token received.');

    console.log("\n--- 3. Testing Protected Analytics (Dashboard) ---");
    const dashboard = await request('/analytics/dashboard-summary', 'GET', null, token);
    console.log('Status:', dashboard.status);
    console.log('Overview:', JSON.stringify(dashboard.body.data.overview, null, 2));

    console.log("\n--- 4. Testing Unauthorized Access (No Token) ---");
    const unauthorized = await request('/analytics/overview', 'GET', null);
    console.log('Status:', unauthorized.status, 'Body:', unauthorized.body.message);

    console.log("\n--- TEST RUN COMPLETE ---");
    process.exit(0);
  } catch (err) {
    console.error('Test failed:', err.message);
    process.exit(1);
  }
};

runTest();
