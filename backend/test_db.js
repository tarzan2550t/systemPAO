import conn from './db/db.js';
async function test() {
  const roles = await conn('user_role').select('*');
  console.log('Roles:', roles);
  const users = await conn('users').select('*').limit(2);
  console.log('Users:', users);
  process.exit(0);
}
test();
