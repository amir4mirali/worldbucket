# WorldBucket - Travel Wishlist Platform

A modern, full-stack web application where users can save and organize places they want to visit around the world. Mix of Google Maps, Pinterest, Notion, and collaborative travel planning.

## Features

### Core Features
- **Interactive World Map**: Click anywhere to save locations
- **Personal Collections**: Organize places into themed collections (trips, buckets lists, etc.)
- **Place Details**: Rich metadata including images, videos, budget, season, notes
- **Collaboration**: Invite friends to collaborate on travel plans
- **Social Sharing**: Share maps publicly and explore others' maps
- **User Profiles**: Public profiles with travel stats and collections

### Advanced Features
- Real-time collaboration on maps
- Activity notifications
- Bookmarks and likes system
- Dark mode support
- Mobile-responsive design
- Offline support (PWA ready)

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **TailwindCSS**: Utility-first CSS
- **Framer Motion**: Smooth animations
- **Lucide Icons**: Beautiful icon library

### Backend
- **Next.js API Routes**: Serverless backend
- **Node.js + Express**: Optional dedicated server

### Database
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB

### Authentication
- **NextAuth/Auth.js**: Authentication framework
- **Google OAuth**: Social login

### External Services
- **Mapbox/Google Maps**: Map visualization
- **Cloudinary**: Image and video uploads

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MongoDB database
- Environment variables configured

### Installation

1. **Clone and Install**
```bash
npm install
```

2. **Configure Environment Variables**
```bash
cp .env.example .env.local
```

Fill in your environment variables:
- `MONGODB_URI`: MongoDB connection string
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GOOGLE_ID` & `GOOGLE_SECRET`: Google OAuth credentials
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Mapbox public token
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY` & `CLOUDINARY_API_SECRET`: Cloudinary credentials

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
worldbucket/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── auth/              # Auth pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── map/               # Interactive map
│   │   ├── explore/           # Public maps explorer
│   │   ├── profile/           # User profiles
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── ui/               # Base UI components
│   │   ├── map/              # Map components
│   │   ├── place/            # Place components
│   │   └── collections/      # Collection components
│   ├── lib/
│   │   ├── db/               # Database connection
│   │   ├── models/           # MongoDB schemas
│   │   ├── api/              # API utilities
│   │   └── utils/            # Helper functions
│   ├── hooks/                # Custom React hooks
│   ├── types/                # TypeScript types
│   └── styles/               # Global styles
├── public/                    # Static files
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .env.example
```

## API Endpoints

### Collections
- `GET /api/collections` - Get user's collections
- `POST /api/collections` - Create collection
- `GET /api/collections/[id]` - Get collection details
- `PUT /api/collections/[id]` - Update collection
- `DELETE /api/collections/[id]` - Delete collection

### Places
- `GET /api/places/[id]` - Get places in collection
- `POST /api/places/[id]` - Add place to collection
- `PUT /api/places/[id]/[placeId]` - Update place
- `DELETE /api/places/[id]/[placeId]` - Delete place

### Users
- `GET /api/users/[username]` - Get user profile
- `PUT /api/users/[username]` - Update user profile

### Collaboration
- `POST /api/collaborators/[id]` - Add collaborator
- `DELETE /api/collaborators/[id]` - Remove collaborator

### Other
- `GET /api/explore` - Get public maps
- `POST /api/upload` - Upload media
- `GET /api/notifications` - Get notifications

## Database Schemas

### User
```typescript
- email: string (unique)
- username: string (unique)
- name: string
- avatar?: string
- bio?: string
- isPublic: boolean
- followers: ObjectId[]
- following: ObjectId[]
```

### Collection
```typescript
- name: string
- description?: string
- coverImage?: string
- owner: ObjectId
- collaborators: [{user: ObjectId, role: enum}]
- isPublic: boolean
- places: ObjectId[]
- stats: {totalPlaces, visited, planned, wantToVisit}
```

### Place
```typescript
- title: string
- latitude: number
- longitude: number
- country: string
- placeType: enum
- tags: string[]
- status: enum (want_to_visit | planned | visited)
- images: string[]
- budget?: {currency, amount}
- createdBy: ObjectId
- collection: ObjectId
```

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Other Platforms
Works with any Node.js hosting (Railway, Render, Heroku, AWS, etc.)

**Don't forget to:**
1. Set environment variables in your hosting platform
2. Configure MongoDB for production
3. Enable HTTPS
4. Set `NEXTAUTH_URL` to your domain

## Development Roadmap

### Phase 1 (Current)
- Core map and collections functionality
- Basic collaboration
- User profiles

### Phase 2
- Advanced filters and search
- Travel statistics dashboard
- Itinerary planning
- Real-time collaboration improvements

### Phase 3
- Mobile app (React Native)
- AI trip planner
- Offline support (PWA)
- Advanced analytics

### Phase 4
- Community features
- Marketplace for travel guides
- Integration with booking platforms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub or contact support.

---

**Built with ❤️ by the WorldBucket team**
