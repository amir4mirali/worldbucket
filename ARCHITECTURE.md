# ARCHITECTURE.md

## WorldBucket Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Client Layer                          │
│  (Next.js 15, React, TypeScript, TailwindCSS)          │
│  - Pages & Layouts                                      │
│  - React Components                                     │
│  - Client Hooks (useState, useSession, etc.)           │
│  - Framer Motion Animations                            │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              API Layer (Next.js Routes)                 │
│  /api/auth - NextAuth authentication                   │
│  /api/collections - Collection CRUD                    │
│  /api/places - Place management                        │
│  /api/users - User profiles                            │
│  /api/collaborators - Collaboration                    │
│  /api/notifications - Notifications                    │
│  /api/upload - File uploads                            │
│  /api/explore - Public maps                            │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│          Business Logic Layer                           │
│  - Authentication (NextAuth.js)                         │
│  - Authorization & Permissions                         │
│  - Data Validation                                      │
│  - Error Handling                                       │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│             Data Access Layer                           │
│  - Mongoose ODM                                         │
│  - MongoDB Connection Pool                             │
│  - Database Transactions                               │
│  - Query Optimization                                  │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│            External Services                            │
│  - MongoDB (Database)                                   │
│  - Mapbox (Maps)                                        │
│  - Cloudinary (CDN/Media)                              │
│  - Google OAuth (Auth)                                  │
└─────────────────────────────────────────────────────────┘
```

### Directory Structure Deep Dive

```
src/
├── app/                           # Next.js App Router
│   ├── api/                      # API routes (backend)
│   │   ├── auth/                 # NextAuth routes
│   │   ├── collections/          # Collection endpoints
│   │   ├── places/              # Place endpoints
│   │   ├── users/               # User profile endpoints
│   │   ├── collaborators/        # Collaboration endpoints
│   │   ├── upload/              # File upload endpoint
│   │   ├── notifications/        # Notifications endpoint
│   │   └── explore/             # Public maps endpoint
│   │
│   ├── auth/                     # Auth pages
│   │   ├── signin/              # Sign in page
│   │   └── signup/              # Sign up page
│   │
│   ├── dashboard/                # User dashboard
│   │   ├── layout.tsx           # Dashboard layout
│   │   └── page.tsx             # Collections list
│   │
│   ├── map/                      # Interactive map
│   │   └── page.tsx             # Map viewer
│   │
│   ├── collections/              # Collection pages
│   │   └── [id]/                # Collection detail
│   │
│   ├── explore/                  # Explore public maps
│   │   └── page.tsx             # Browse maps
│   │
│   ├── profile/                  # User profiles
│   │   └── [username]/          # Profile page
│   │
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
│
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   └── badge.tsx
│   │
│   ├── map/                     # Map-related components
│   │   └── Map.tsx
│   │
│   ├── place/                   # Place-related components
│   │   ├── PlaceCard.tsx
│   │   └── AddPlaceModal.tsx
│   │
│   ├── collections/             # Collection components
│   │   └── CreateCollectionModal.tsx
│   │
│   ├── Header.tsx               # Main header
│   ├── ProtectedRoute.tsx        # Auth guard component
│   ├── LoadingSpinner.tsx        # Loading state
│   └── providers.tsx             # Auth provider
│
├── lib/                         # Utilities and helpers
│   ├── db/
│   │   ├── connection.ts        # MongoDB connection
│   │   ├── index.ts             # DB cache
│   │   └── mongodb-client.ts    # MongoDB client
│   │
│   ├── models/                  # Mongoose schemas
│   │   ├── User.ts
│   │   ├── Place.ts
│   │   ├── Collection.ts
│   │   ├── Notification.ts
│   │   └── CollaborationInvite.ts
│   │
│   ├── api/                     # API utilities
│   │   ├── error.ts
│   │   └── middleware.ts
│   │
│   └── utils/
│       ├── helpers.ts           # General utilities
│       └── cloudinary.ts        # Cloudinary integration
│
├── hooks/                       # Custom React hooks
│   ├── useToast.ts
│   └── useCollections.ts
│
├── types/                       # TypeScript types
│   └── index.ts
│
├── styles/
│   └── globals.css              # Global styles
│
└── middleware.ts                # Auth middleware
```

### Data Models

#### User Schema
```typescript
{
  email: string (unique)
  username: string (unique)
  name: string
  avatar?: string
  bio?: string
  isPublic: boolean
  followers: ObjectId[]
  following: ObjectId[]
  createdAt: Date
  updatedAt: Date
}
```

#### Collection Schema
```typescript
{
  name: string
  description?: string
  coverImage?: string
  owner: ObjectId (User)
  collaborators: [{
    user: ObjectId (User)
    role: 'viewer' | 'editor' | 'admin'
  }]
  isPublic: boolean
  places: ObjectId[] (Place)
  tags: string[]
  comments: [{
    user: ObjectId (User)
    text: string
    createdAt: Date
  }]
  stats: {
    totalPlaces: number
    visited: number
    planned: number
    wantToVisit: number
  }
  createdAt: Date
  updatedAt: Date
}
```

#### Place Schema
```typescript
{
  title: string
  description?: string
  latitude: number
  longitude: number
  country: string
  city?: string
  address?: string
  placeType: 'city' | 'restaurant' | 'landmark' | 'hidden_spot' | 'custom' | 'country'
  tags: string[]
  priority: 'low' | 'medium' | 'high'
  rating?: number
  status: 'want_to_visit' | 'planned' | 'visited'
  budget?: { currency: string, amount: number }
  bestSeason?: string[]
  images: string[]
  videos?: string[]
  urls?: {
    youtube?: string[]
    instagram?: string[]
    tiktok?: string[]
    external?: string[]
  }
  notes?: string
  createdBy: ObjectId (User)
  collection: ObjectId (Collection)
  createdAt: Date
  updatedAt: Date
}
```

### API Routes

#### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signup` - Sign up
- `GET /api/auth/[...nextauth]` - NextAuth provider

#### Collections
- `GET /api/collections` - Get user's collections
- `POST /api/collections` - Create collection
- `GET /api/collections/[id]` - Get collection details
- `PUT /api/collections/[id]` - Update collection
- `DELETE /api/collections/[id]` - Delete collection

#### Places
- `GET /api/places/[id]` - Get places in collection
- `POST /api/places/[id]` - Add place
- `GET /api/places/[id]/[placeId]` - Get place details
- `PUT /api/places/[id]/[placeId]` - Update place
- `DELETE /api/places/[id]/[placeId]` - Delete place

#### Users
- `GET /api/users/[username]` - Get user profile
- `PUT /api/users/[username]` - Update profile

#### Collaboration
- `POST /api/collaborators/[id]` - Add collaborator
- `DELETE /api/collaborators/[id]` - Remove collaborator

#### Other
- `GET /api/explore` - Get public maps
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications` - Mark notification as read
- `POST /api/upload` - Upload media file

### Authentication Flow

```
User Visit
    ↓
Check Session (NextAuth middleware)
    ↓
├─ Authenticated → Load Protected Routes
└─ Not Authenticated → Redirect to /auth/signin
    ↓
Sign In Options
├─ Google OAuth → Get Google Credentials
│   ↓
│   Create/Update User in MongoDB
│   ↓
│   Generate JWT Token
│   └─ Redirect to Dashboard
│
└─ Email/Password → Verify Credentials
    ↓
    Validate with MongoDB
    ↓
    Generate JWT Token
    └─ Redirect to Dashboard
```

### Data Flow

#### Create Collection
```
User Form Submit
    ↓
POST /api/collections
    ↓
Authenticate User (NextAuth)
    ↓
Validate Input
    ↓
Create Collection Document
    ↓
Save to MongoDB
    ↓
Return Created Collection
    ↓
Update UI State
```

#### Add Place to Collection
```
User Clicks Map or Form Submit
    ↓
POST /api/places/[collectionId]
    ↓
Authenticate User
    ↓
Check Permissions (Owner/Editor)
    ↓
Validate Place Data
    ↓
Create Place Document
    ↓
Update Collection Stats
    ↓
Return Place
    ↓
Update Map & List
```

#### Collaboration
```
Owner Invites User
    ↓
POST /api/collaborators/[collectionId]
    ↓
Verify Owner
    ↓
Add Collaborator to Collection
    ↓
Create Notification
    ↓
Send Email (optional)
    ↓
Invitee Sees Notification
    ↓
Access Collection with Permissions
```

### Deployment Architecture

#### Development
```
Localhost:3000
    ↓
Next.js Dev Server
    ↓
MongoDB Local/Atlas
```

#### Production (Vercel)
```
User Browser
    ↓
Vercel CDN
    ↓
Serverless Functions (API Routes)
    ↓
MongoDB Atlas
    ↓
Mapbox/Cloudinary APIs
```

### Performance Optimizations

1. **Database**
   - Connection pooling
   - Query indexes on frequently filtered fields
   - Lean queries where possible

2. **Frontend**
   - Code splitting (automatic with Next.js)
   - Image optimization (next/image)
   - Lazy loading for modals and components

3. **Caching**
   - Next.js static generation
   - Revalidation strategies
   - Cloudinary CDN for images

4. **Rendering**
   - Server-side rendering for public pages
   - Client-side rendering for interactive features
   - Incremental static regeneration

### Security Measures

1. **Authentication**
   - NextAuth.js with JWT tokens
   - Secure session management
   - Google OAuth integration

2. **Authorization**
   - Role-based access control
   - Collection permission checks
   - User isolation

3. **Data Protection**
   - Environment variables for secrets
   - Password hashing (bcryptjs)
   - HTTPS only in production

4. **Rate Limiting**
   - API request limits (optional: Vercel middleware)
   - File upload size limits
   - Query pagination

### Scalability Considerations

1. **Database**
   - MongoDB indexing
   - Horizontal scaling ready
   - Transaction support

2. **Backend**
   - Serverless functions auto-scale
   - No state persistence needed
   - Stateless API design

3. **Frontend**
   - Component reusability
   - Easy to split into multiple apps
   - Progressive enhancement

4. **Future Enhancements**
   - Caching layer (Redis)
   - Background jobs (Bull Queue)
   - WebSocket for real-time collaboration
   - Microservices architecture

### Monitoring & Analytics

- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- User analytics (Mixpanel/Segment)
- Database monitoring (MongoDB Atlas)
- Uptime monitoring (UptimeRobot)
