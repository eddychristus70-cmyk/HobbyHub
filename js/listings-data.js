/* ============================================
   HobbyHub — Shared Listings Data
   ============================================
   Seed data + localStorage-backed store so listings
   submitted on submit.html persist and show up on
   browse.html / index.html.
*/

const STORAGE_KEY = 'hobbyhub_listings';

const CATEGORY_LABELS = {
  plants: '🌱 Plants',
  games: '🎲 Board Games',
  books: '📚 Books',
  crafts: '🧶 Crafts',
  music: '🎸 Music',
  sports: '⚽ Sports Gear'
};

const SEED_LISTINGS = [
  {
    id: 'seed-1',
    title: 'Pothos cutting, ready to root',
    category: 'plants',
    description: 'Healthy golden pothos cutting, about 6 inches. Looking to trade for any succulent cutting.',
    imageUrl: 'images/hero-plant.jpeg',
    email: 'plantlover@example.com',
    dateAvailable: '2026-08-10',
    condition: 'new',
    createdAt: '2026-08-10T09:00:00Z'
  },
  {
    id: 'seed-2',
    title: 'Catan — base game',
    category: 'games',
    description: 'Complete set, all pieces included. A few box corners are soft but everything plays fine.',
    imageUrl: 'images/hero-games.jpeg',
    email: 'boardgamer@example.com',
    dateAvailable: '2026-08-05',
    condition: 'used',
    createdAt: '2026-08-05T14:30:00Z'
  },
  {
    id: 'seed-3',
    title: 'Atomic Habits (paperback)',
    category: 'books',
    description: 'Barely-read copy, no highlighting. Happy to swap for any other self-improvement or productivity book.',
    imageUrl: 'images/hero-books.jpeg',
    email: 'reader@example.com',
    dateAvailable: '2026-08-12',
    condition: 'used',
    createdAt: '2026-08-12T11:15:00Z'
  },
  {
    id: 'seed-4',
    title: 'Beginner crochet hook set',
    category: 'crafts',
    description: '9-piece ergonomic hook set, used for one project only. Great for anyone just starting out.',
    imageUrl: 'images/hero-craft.jpeg',
    email: 'yarncrafter@example.com',
    dateAvailable: '2026-08-08',
    condition: 'well-loved',
    createdAt: '2026-08-08T16:45:00Z'
  },
  {
    id: 'seed-5',
    title: 'Acoustic guitar (3/4 size)',
    category: 'music',
    description: 'Great starter guitar for a smaller player. New strings put on last month. Comes with a soft case.',
    imageUrl: 'images/hero-music.jpeg',
    email: 'musicmaker@example.com',
    dateAvailable: '2026-08-01',
    condition: 'used',
    createdAt: '2026-08-01T08:20:00Z'
  },
  {
    id: 'seed-6',
    title: 'Size 9 football boots',
    category: 'sports',
    description: 'Worn for one season, still lots of grip left on the studs. Cleaned and ready to go.',
    imageUrl: 'images/hero-sport.jpeg',
    email: 'ballsport@example.com',
    dateAvailable: '2026-08-13',
    condition: 'used',
    createdAt: '2026-08-13T19:10:00Z'
  }
];

function getListings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Could not read stored listings, falling back to seed data.', e);
  }
  saveListings(SEED_LISTINGS);
  return SEED_LISTINGS;
}

function saveListings(listings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listings));
  } catch (e) {
    console.warn('Could not save listings to localStorage.', e);
  }
}

function addListing(listing) {
  const listings = getListings();
  listings.unshift(listing);
  saveListings(listings);
  return listings;
}
