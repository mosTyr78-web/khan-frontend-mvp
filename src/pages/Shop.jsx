import { useState } from 'react';

// Amazon affiliate tag - replace with your actual Amazon Associates tag
const AMAZON_TAG = 'khanfitness-20';

// Product categories with Amazon affiliate links
const CATEGORIES = [
  { id: 'equipment', name: 'Equipment', icon: '🏋️' },
  { id: 'apparel', name: 'Apparel', icon: '👕' },
  { id: 'nutrition', name: 'Nutrition', icon: '🥤' },
  { id: 'tech', name: 'Tech', icon: '⌚' },
  { id: 'recovery', name: 'Recovery', icon: '💆' }
];

// Curated products - Amazon ASINs (replace with real ASINs)
const PRODUCTS = [
  // EQUIPMENT
  {
    id: 'resistance-bands',
    category: 'equipment',
    name: 'Resistance Bands Set',
    description: 'Complete set with 5 resistance levels',
    price: 29.99,
    rating: 4.5,
    reviews: 12500,
    asin: 'B07QHJZQXV',
    image: 'https://m.media-amazon.com/images/I/71qnHCrZJuL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'dumbbells',
    category: 'equipment',
    name: 'Adjustable Dumbbells 50lb',
    description: 'Space-saving adjustable weights',
    price: 299.99,
    rating: 4.7,
    reviews: 8900,
    asin: 'B071WSFSGR',
    image: 'https://m.media-amazon.com/images/I/61BF+y6l4OL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'pull-up-bar',
    category: 'equipment',
    name: 'Door Pull-Up Bar',
    description: 'No screws needed, fits most doors',
    price: 34.99,
    rating: 4.4,
    reviews: 45000,
    asin: 'B001EJMS6K',
    image: 'https://m.media-amazon.com/images/I/61nGqnS02GL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'yoga-mat',
    category: 'equipment',
    name: 'Premium Yoga Mat',
    description: 'Extra thick, non-slip surface',
    price: 24.99,
    rating: 4.6,
    reviews: 32000,
    asin: 'B01LP0V2CM',
    image: 'https://m.media-amazon.com/images/I/81+S+E7v9ZL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'kettlebell',
    category: 'equipment',
    name: 'Cast Iron Kettlebell 35lb',
    description: 'Perfect for HIIT workouts',
    price: 54.99,
    rating: 4.8,
    reviews: 15000,
    asin: 'B003J9L8NS',
    image: 'https://m.media-amazon.com/images/I/61KMqe9sHpL._AC_SL1500_.jpg',
    tier: 'FREE'
  },

  // APPAREL
  {
    id: 'compression-shorts',
    category: 'apparel',
    name: 'Compression Shorts 3-Pack',
    description: 'Moisture-wicking, anti-chafe',
    price: 32.99,
    rating: 4.5,
    reviews: 28000,
    asin: 'B07QHJZCXV',
    image: 'https://m.media-amazon.com/images/I/71S3v-x1HrL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'training-shoes',
    category: 'apparel',
    name: 'Cross Training Shoes',
    description: 'Stable base for lifting & cardio',
    price: 89.99,
    rating: 4.6,
    reviews: 12000,
    asin: 'B07RGGQXVZ',
    image: 'https://m.media-amazon.com/images/I/71WQOKbfZ5L._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'gym-gloves',
    category: 'apparel',
    name: 'Weightlifting Gloves',
    description: 'Wrist support, palm protection',
    price: 19.99,
    rating: 4.4,
    reviews: 18500,
    asin: 'B00QDRQ9BY',
    image: 'https://m.media-amazon.com/images/I/71JJqP6RWBL._AC_SL1500_.jpg',
    tier: 'FREE'
  },

  // NUTRITION
  {
    id: 'protein-powder',
    category: 'nutrition',
    name: 'Whey Protein Isolate 5lb',
    description: '25g protein per serving, low carb',
    price: 69.99,
    rating: 4.7,
    reviews: 95000,
    asin: 'B000QSNYGI',
    image: 'https://m.media-amazon.com/images/I/61X3rqwiVEL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'creatine',
    category: 'nutrition',
    name: 'Creatine Monohydrate 1kg',
    description: 'Pure micronized creatine',
    price: 29.99,
    rating: 4.8,
    reviews: 42000,
    asin: 'B00E9M4XEE',
    image: 'https://m.media-amazon.com/images/I/61LzTGCbg7L._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'pre-workout',
    category: 'nutrition',
    name: 'Pre-Workout Energy',
    description: 'Clean energy, no crash',
    price: 34.99,
    rating: 4.5,
    reviews: 28000,
    asin: 'B00SJBH6AC',
    image: 'https://m.media-amazon.com/images/I/71YLz3FNLbL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'shaker-bottle',
    category: 'nutrition',
    name: 'BlenderBottle Pro',
    description: 'Leak-proof, easy to clean',
    price: 14.99,
    rating: 4.8,
    reviews: 125000,
    asin: 'B00HE9DGH0',
    image: 'https://m.media-amazon.com/images/I/71G3pFZcLxL._AC_SL1500_.jpg',
    tier: 'FREE'
  },

  // TECH
  {
    id: 'apple-watch',
    category: 'tech',
    name: 'Apple Watch Series 9',
    description: 'Best for iOS - Tracks all metrics',
    price: 399.99,
    rating: 4.8,
    reviews: 15000,
    asin: 'B0CHX9N594',
    image: 'https://m.media-amazon.com/images/I/71tpDYRMSlL._AC_SL1500_.jpg',
    tier: 'FREE',
    featured: true
  },
  {
    id: 'galaxy-watch',
    category: 'tech',
    name: 'Samsung Galaxy Watch 6',
    description: 'Best for Android - Google Fit ready',
    price: 299.99,
    rating: 4.6,
    reviews: 8500,
    asin: 'B0C7B2MSRR',
    image: 'https://m.media-amazon.com/images/I/61dxXbvmRjL._AC_SL1500_.jpg',
    tier: 'FREE',
    featured: true
  },
  {
    id: 'fitbit',
    category: 'tech',
    name: 'Fitbit Charge 6',
    description: 'Budget-friendly fitness tracker',
    price: 159.99,
    rating: 4.4,
    reviews: 12000,
    asin: 'B0CCJV8ZT9',
    image: 'https://m.media-amazon.com/images/I/61h0Z9NsCEL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'wireless-earbuds',
    category: 'tech',
    name: 'Sports Wireless Earbuds',
    description: 'Sweat-proof, 8hr battery',
    price: 79.99,
    rating: 4.5,
    reviews: 45000,
    asin: 'B0BLF6BM6C',
    image: 'https://m.media-amazon.com/images/I/61ofG2gUjyL._AC_SL1500_.jpg',
    tier: 'FREE'
  },

  // RECOVERY
  {
    id: 'foam-roller',
    category: 'recovery',
    name: 'High-Density Foam Roller',
    description: 'Deep tissue massage',
    price: 24.99,
    rating: 4.6,
    reviews: 55000,
    asin: 'B00XM2MXK8',
    image: 'https://m.media-amazon.com/images/I/81LTTbkHUkL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'massage-gun',
    category: 'recovery',
    name: 'Percussion Massage Gun',
    description: 'Professional recovery tool',
    price: 129.99,
    rating: 4.7,
    reviews: 32000,
    asin: 'B07W57XKVC',
    image: 'https://m.media-amazon.com/images/I/61vQVhZe2cL._AC_SL1500_.jpg',
    tier: 'FREE'
  },
  {
    id: 'ice-bath',
    category: 'recovery',
    name: 'Portable Ice Bath Tub',
    description: 'Cold therapy at home',
    price: 89.99,
    rating: 4.3,
    reviews: 5500,
    asin: 'B0BLKM8GTY',
    image: 'https://m.media-amazon.com/images/I/71hK8SQq76L._AC_SL1500_.jpg',
    tier: 'FREE'
  }
];

export default function Shop({ goTo, userTier }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const featuredProducts = PRODUCTS.filter(p => p.featured);

  const getAmazonUrl = (asin) => {
    return `https://www.amazon.com/dp/${asin}?tag=${AMAZON_TAG}`;
  };

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span className="text-yellow-400">
        {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => goTo('home')} className="text-2xl">←</button>
          <h1 className="text-xl font-bold">KHAN Shop</h1>
          <div className="text-xs px-2 py-1 rounded-full bg-green-500">
            FREE
          </div>
        </div>
      </div>

      {/* Amazon Partner Notice */}
      <div className="mx-4 mt-4 p-3 rounded-xl bg-orange-500/20 border border-orange-500/30">
        <p className="text-xs text-orange-300">
          As an Amazon Associate, KHAN earns from qualifying purchases. Shopping supports the app!
        </p>
      </div>

      {/* Featured: Watches for Challenge Tracking */}
      <div className="p-4">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span>⌚</span> Track Your Challenges
        </h2>
        <p className="text-xs text-gray-400 mb-4">
          Connect a smartwatch to automatically track steps, distance, and workouts for KHAN challenges
        </p>
        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map(product => (
            <a
              key={product.id}
              href={getAmazonUrl(product.asin)}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30"
            >
              <div className="aspect-square bg-white rounded-lg mb-2 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Watch'}
                />
              </div>
              <h3 className="font-bold text-sm">{product.name}</h3>
              <p className="text-xs text-gray-400">{product.description}</p>
              <p className="text-lg font-bold text-green-400 mt-1">${product.price}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-green-500 text-white'
              : 'bg-white/10 text-gray-400'
          }`}
        >
          All
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedCategory === cat.id
                ? 'bg-green-500 text-white'
                : 'bg-white/10 text-gray-400'
            }`}
          >
            <span>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 p-4">
        {filteredProducts.map(product => (
          <a
            key={product.id}
            href={getAmazonUrl(product.asin)}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-white/10 bg-gray-900/50 overflow-hidden hover:border-green-500/50 transition-all"
          >
            <div className="aspect-square bg-white flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain"
                onError={(e) => e.target.src = 'https://via.placeholder.com/150?text=Product'}
              />
            </div>
            <div className="p-3">
              <h3 className="font-bold text-sm line-clamp-2">{product.name}</h3>
              <div className="flex items-center gap-1 mt-1">
                {renderStars(product.rating)}
                <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
              </div>
              <p className="text-lg font-bold text-green-400 mt-1">${product.price}</p>
            </div>
          </a>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-4 mt-4 text-center">
        <p className="text-gray-400 text-sm mb-2">
          Can't find what you need?
        </p>
        <a
          href={`https://www.amazon.com/s?k=fitness+equipment&tag=${AMAZON_TAG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-orange-500 rounded-full font-bold"
        >
          Browse All on Amazon
        </a>
      </div>
    </div>
  );
}
