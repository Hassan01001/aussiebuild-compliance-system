const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const User = require('./models/User');

const seedUsers = async () => {
  try {
    // Delete existing users
    await User.deleteMany({});
    console.log('Existing users deleted');

    // Create each user individually so pre-save hook runs
    const dave = new User({
      name: 'Dave Mitchell',
      email: 'dave.mitchell@aussiebuild.com.au',
      password: 'password123',
      role: 'supervisor',
      siteCode: 'PAR',
      siteName: 'Parramatta Site',
      avatar: 'DM',
      isActive: true
    });
    await dave.save();
    console.log('Dave Mitchell created');

    const sarah = new User({
      name: 'Sarah Rahman',
      email: 'sarah.rahman@aussiebuild.com.au',
      password: 'password123',
      role: 'manager',
      siteCode: 'HO',
      siteName: 'Head Office',
      avatar: 'SR',
      isActive: true
    });
    await sarah.save();
    console.log('Sarah Rahman created');

    const kyle = new User({
      name: 'Kyle Nguyen',
      email: 'kyle.nguyen@aussiebuild.com.au',
      password: 'password123',
      role: 'worker',
      siteCode: 'BLA',
      siteName: 'Blacktown Site',
      avatar: 'KN',
      isActive: true
    });
    await kyle.save();
    console.log('Kyle Nguyen created');

    console.log('All users seeded successfully');
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();