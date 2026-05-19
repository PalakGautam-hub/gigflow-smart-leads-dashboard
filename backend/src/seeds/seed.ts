import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/user.model';
import { Lead } from '../models/lead.model';
import { UserRole, LeadStatus, LeadSource } from '../types';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gigflow';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gigflow.com',
    password: 'admin123',
    role: UserRole.ADMIN,
  },
  {
    name: 'Sales User',
    email: 'sales@gigflow.com',
    password: 'sales123',
    role: UserRole.SALES,
  },
];

const leads = [
  { name: 'Alice Johnson', email: 'alice@example.com', status: LeadStatus.NEW, source: LeadSource.WEBSITE },
  { name: 'Bob Smith', email: 'bob@example.com', status: LeadStatus.CONTACTED, source: LeadSource.INSTAGRAM },
  { name: 'Charlie Brown', email: 'charlie@example.com', status: LeadStatus.QUALIFIED, source: LeadSource.REFERRAL },
  { name: 'Diana Prince', email: 'diana@example.com', status: LeadStatus.LOST, source: LeadSource.WEBSITE },
  { name: 'Edward Norton', email: 'edward@example.com', status: LeadStatus.NEW, source: LeadSource.INSTAGRAM },
  { name: 'Fiona Green', email: 'fiona@example.com', status: LeadStatus.CONTACTED, source: LeadSource.REFERRAL },
  { name: 'George Lucas', email: 'george@example.com', status: LeadStatus.QUALIFIED, source: LeadSource.WEBSITE },
  { name: 'Hannah Montana', email: 'hannah@example.com', status: LeadStatus.NEW, source: LeadSource.INSTAGRAM },
  { name: 'Isaac Newton', email: 'isaac@example.com', status: LeadStatus.LOST, source: LeadSource.REFERRAL },
  { name: 'Julia Roberts', email: 'julia@example.com', status: LeadStatus.CONTACTED, source: LeadSource.WEBSITE },
  { name: 'Kevin Hart', email: 'kevin@example.com', status: LeadStatus.NEW, source: LeadSource.INSTAGRAM },
  { name: 'Laura Palmer', email: 'laura@example.com', status: LeadStatus.QUALIFIED, source: LeadSource.REFERRAL },
  { name: 'Michael Scott', email: 'michael@example.com', status: LeadStatus.CONTACTED, source: LeadSource.WEBSITE },
  { name: 'Nina Simone', email: 'nina@example.com', status: LeadStatus.NEW, source: LeadSource.INSTAGRAM },
  { name: 'Oscar Wilde', email: 'oscar@example.com', status: LeadStatus.LOST, source: LeadSource.REFERRAL },
  { name: 'Patricia Arquette', email: 'patricia@example.com', status: LeadStatus.QUALIFIED, source: LeadSource.WEBSITE },
  { name: 'Quincy Jones', email: 'quincy@example.com', status: LeadStatus.CONTACTED, source: LeadSource.INSTAGRAM },
  { name: 'Rachel Green', email: 'rachel@example.com', status: LeadStatus.NEW, source: LeadSource.REFERRAL },
  { name: 'Steve Rogers', email: 'steve@example.com', status: LeadStatus.QUALIFIED, source: LeadSource.WEBSITE },
  { name: 'Tina Turner', email: 'tina@example.com', status: LeadStatus.LOST, source: LeadSource.INSTAGRAM },
  { name: 'Uma Thurman', email: 'uma@example.com', status: LeadStatus.NEW, source: LeadSource.REFERRAL },
  { name: 'Victor Hugo', email: 'victor@example.com', status: LeadStatus.CONTACTED, source: LeadSource.WEBSITE },
  { name: 'Wendy Williams', email: 'wendy@example.com', status: LeadStatus.QUALIFIED, source: LeadSource.INSTAGRAM },
  { name: 'Xavier Charles', email: 'xavier@example.com', status: LeadStatus.NEW, source: LeadSource.REFERRAL },
  { name: 'Yara Shahidi', email: 'yara@example.com', status: LeadStatus.LOST, source: LeadSource.WEBSITE },
];

const seed = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Lead.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed users
    await User.create(users);
    console.log('👤 Users seeded');

    // Seed leads
    await Lead.insertMany(leads);
    console.log('📋 Leads seeded');

    console.log('\n✅ Seed completed successfully!');
    console.log('\n📧 Demo Accounts:');
    console.log('   Admin: admin@gigflow.com / admin123');
    console.log('   Sales: sales@gigflow.com / sales123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
};

seed();
