#!/usr/bin/env node
/**
 * Database Seeding Script
 * Run with: npm run db:seed
 */

const mongoose = require('mongoose');
require('dotenv').config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await mongoose.connection.dropDatabase();

    // Seed users
    const User = require('../src/lib/models/User').default;
    const users = await User.insertMany([
      {
        email: 'alice@example.com',
        username: 'alice',
        name: 'Alice Johnson',
        bio: 'Travel enthusiast exploring the world',
        isPublic: true,
      },
      {
        email: 'bob@example.com',
        username: 'bob',
        name: 'Bob Smith',
        bio: 'Adventure seeker and photographer',
        isPublic: true,
      },
    ]);

    console.log('✓ Seeded users');

    // Seed collections
    const Collection = require('../src/lib/models/Collection').default;
    const collections = await Collection.insertMany([
      {
        name: 'Japan Dream Trip',
        description: 'My dream visit to Japan - Tokyo, Kyoto, and Hiroshima',
        owner: users[0]._id,
        isPublic: true,
        tags: ['asia', 'adventure'],
        stats: {
          totalPlaces: 0,
          visited: 0,
          planned: 0,
          wantToVisit: 0,
        },
      },
      {
        name: 'European Summer',
        description: 'Summer road trip across Europe',
        owner: users[1]._id,
        isPublic: true,
        tags: ['europe', 'summer'],
        stats: {
          totalPlaces: 0,
          visited: 0,
          planned: 0,
          wantToVisit: 0,
        },
      },
    ]);

    console.log('✓ Seeded collections');

    // Seed places
    const Place = require('../src/lib/models/Place').default;
    await Place.insertMany([
      {
        title: 'Tokyo Skytree',
        description: 'Iconic landmark with panoramic views',
        latitude: 35.7101,
        longitude: 139.8107,
        country: 'Japan',
        city: 'Tokyo',
        placeType: 'landmark',
        tags: ['must-see', 'views'],
        status: 'want_to_visit',
        priority: 'high',
        createdBy: users[0]._id,
        collection: collections[0]._id,
      },
      {
        title: 'Fushimi Inari Shrine',
        description: 'Famous red torii gates shrine',
        latitude: 34.9674,
        longitude: 135.7629,
        country: 'Japan',
        city: 'Kyoto',
        placeType: 'landmark',
        tags: ['spiritual', 'photography'],
        status: 'planned',
        priority: 'high',
        createdBy: users[0]._id,
        collection: collections[0]._id,
      },
    ]);

    console.log('✓ Seeded places');

    console.log('\n✅ Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
