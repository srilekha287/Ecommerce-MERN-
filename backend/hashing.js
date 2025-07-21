import bcrypt from 'bcryptjs';

const plainPassword = 'admin@2025';
bcrypt.hash(plainPassword, 10).then(hash => {
  console.log('Hashed password:', hash);
});