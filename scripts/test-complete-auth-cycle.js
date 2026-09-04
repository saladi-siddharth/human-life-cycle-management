const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log('Testing Reset Password with code 375052...');
  const resetRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/reset-password',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    email: 'saladisiddharth@gmail.com',
    otp: '375052',
    newPassword: 'BioversePassword123!'
  });
  console.log('Reset response:', resetRes.status, resetRes.data);

  console.log('\nTesting Login with new reset password...');
  const loginRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    email: 'saladisiddharth@gmail.com',
    password: 'BioversePassword123!'
  });
  console.log('Login response:', loginRes.status, loginRes.data);

  console.log('\nTesting Verify OTP Registration with code 987393...');
  const verifyRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/verify-otp',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    email: 'testuser_1788514944646@example.com',
    otp: '987393',
    name: 'Verified User',
    password: 'NewUserSecure123!',
    identity: 'developer'
  });
  console.log('Verify OTP response:', verifyRes.status, verifyRes.data);

  console.log('\nTesting Login with newly registered user...');
  const regLoginRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    email: 'testuser_1788514944646@example.com',
    password: 'NewUserSecure123!'
  });
  console.log('New user login response:', regLoginRes.status, regLoginRes.data);
}

run().catch(console.error);
