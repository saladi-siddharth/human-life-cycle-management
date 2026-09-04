// Verification script for all Auth & OTP flows
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
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting Auth & OTP Verification Suite...\n');
  const targetEmail = 'saladisiddharth@gmail.com';
  let passed = 0;
  let failed = 0;

  // 1. Test Health Endpoint
  try {
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/health',
      method: 'GET'
    });
    console.log('✅ /api/health:', res.data);
    passed++;
  } catch (err) {
    console.error('❌ /api/health failed:', err.message);
    failed++;
  }

  // 2. Test Forgot Password OTP Request
  let forgotOtpCode = null;
  try {
    console.log('\n--- Testing /api/auth/forgot-otp ---');
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/forgot-otp',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: targetEmail });
    
    console.log('Response:', res.status, res.data);
    if (res.data && res.data.success) {
      console.log('✅ /api/auth/forgot-otp succeeded!');
      // For testing, retrieve OTP from server memory if exposed or check server log
      passed++;
    } else {
      throw new Error(res.data?.error || 'Unknown error');
    }
  } catch (err) {
    console.error('❌ /api/auth/forgot-otp failed:', err.message);
    failed++;
  }

  // 3. Test Sign Up Registration OTP Request
  const testRegEmail = 'testuser_' + Date.now() + '@example.com';
  try {
    console.log('\n--- Testing /api/auth/send-otp ---');
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/send-otp',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, { email: testRegEmail });

    console.log('Response:', res.status, res.data);
    if (res.data && res.data.success) {
      console.log('✅ /api/auth/send-otp succeeded!');
      passed++;
    } else {
      throw new Error(res.data?.error || 'Unknown error');
    }
  } catch (err) {
    console.error('❌ /api/auth/send-otp failed:', err.message);
    failed++;
  }

  // 4. Test Google Auth Endpoint
  try {
    console.log('\n--- Testing /api/auth/google ---');
    const res = await request({
      hostname: 'localhost',
      port: 3000,
      path: '/api/auth/google',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'siddharth.google@gmail.com',
      name: 'Siddharth Google User',
      googleId: 'google-uid-12345'
    });

    console.log('Response:', res.status, res.data);
    if (res.data && res.data.success && res.data.token) {
      console.log('✅ /api/auth/google succeeded! Token issued:', res.data.token.slice(0, 20) + '...');
      passed++;
    } else {
      throw new Error(res.data?.error || 'Unknown error');
    }
  } catch (err) {
    console.error('❌ /api/auth/google failed:', err.message);
    failed++;
  }

  console.log(`\n========================================`);
  console.log(`Results: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================`);
}

runTests();
