// Script de prueba para verificar las rutas de autenticación
const http = require('http');

const baseURL = 'http://localhost:3000';

function testRoute(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseURL);
    const options = {
      hostname: url.hostname,
      port: url.port || 3000,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: body, headers: res.headers });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function runTests() {
  console.log('🧪 Probando rutas de autenticación...\n');

  // Test 1: Login
  console.log('1. Probando POST /api/auth/login...');
  try {
    const result = await testRoute('POST', '/api/auth/login', {
      email: 'admin@cine.com',
      password: 'admin123'
    });
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log(`   ❌ Error:`, error.message);
  }

  console.log('\n2. Probando GET /api/auth/verify (sin token)...');
  try {
    const result = await testRoute('GET', '/api/auth/verify');
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log(`   ❌ Error:`, error.message);
  }

  console.log('\n3. Probando POST /api/auth/logout...');
  try {
    const result = await testRoute('POST', '/api/auth/logout');
    console.log(`   Status: ${result.status}`);
    console.log(`   Response:`, JSON.stringify(result.data, null, 2));
  } catch (error) {
    console.log(`   ❌ Error:`, error.message);
  }

  console.log('\n✅ Pruebas completadas');
}

runTests().catch(console.error);

