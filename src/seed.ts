import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';
import { UserSchema } from './common/schemas/user.schema';
import { RoleSchema } from './common/schemas/role.schema';

const User = mongoose.model('User', UserSchema);
const Role = mongoose.model('Role', RoleSchema);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Berhasil terkoneksi ke MongoDB');

    await mongoose.connection.db.dropDatabase();
    console.log('Database berhasil dihapus');

    console.log('Role sebelum seeding:', await Role.find({}));

    const adminRole = await Role.create({
      name: 'Admin',
      permissions: ['*'],
    });


    await User.create({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: adminRole._id,
    });

    console.log('Seeder berhasil dijalankan');
  } catch (error) {
    console.error('Gagal melakukan seeding:', error);
  } finally {
    // Tutup koneksi MongoDB
    await mongoose.disconnect();
    console.log('Koneksi MongoDB ditutup');
  }
}

bootstrap();
