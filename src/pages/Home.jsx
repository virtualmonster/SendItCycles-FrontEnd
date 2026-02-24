import React from 'react';
import { heroImage } from '../utils/bikeImages';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Hero Section with Background Image */}
      <section
        className="relative h-96 md:h-screen flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(17, 24, 39, 0.75) 0%, rgba(88, 28, 135, 0.65) 100%), url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Send It with <span className="text-fuchsia-500">SendIt Cycles</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto">
            Premium mountain bikes for every terrain. From cross-country racing to gravity-defying
            downhill thrills, we have the perfect bike for your adventure.
          </p>
          <a
            href="/shop"
            className="inline-block bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-lg transition text-lg"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Bike Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { name: 'XC', emoji: '⚡', desc: 'Cross-country racing' },
              { name: 'Trail', emoji: '🛤️', desc: 'All-purpose trails' },
              { name: 'Downcountry', emoji: '🏔️', desc: 'Lightweight descending' },
              { name: 'Enduro', emoji: '🚵', desc: 'Long-travel aggression' },
              { name: 'Downhill', emoji: '🔥', desc: 'Gravity-focused extreme' },
            ].map((type) => (
              <a
                key={type.name}
                href={`/shop?category=${type.name}`}
                className="bg-slate-900 p-6 rounded-lg text-center hover:bg-slate-700 transition cursor-pointer"
              >
                <div className="text-5xl mb-4">{type.emoji}</div>
                <h3 className="text-xl font-bold mb-2 text-fuchsia-400">{type.name}</h3>
                <p className="text-slate-300 text-sm">{type.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-2 text-fuchsia-400">Premium Quality</h3>
            <p className="text-slate-300">Hand-selected bikes from top manufacturers worldwide.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">🚚</div>
            <h3 className="text-xl font-bold mb-2 text-fuchsia-400">Free Shipping</h3>
            <p className="text-slate-300">Fast and free delivery on all orders.</p>
          </div>
          <div className="text-center">
            <div className="text-5xl mb-4">💬</div>
            <h3 className="text-xl font-bold mb-2 text-fuchsia-400">Expert Support</h3>
            <p className="text-slate-300">Get help from cycling enthusiasts any time.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-fuchsia-600 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Send It?</h2>
        <a
          href="/shop"
          className="inline-block bg-white text-fuchsia-600 font-bold py-3 px-8 rounded-lg hover:bg-slate-100 transition"
        >
          Start Shopping
        </a>
      </section>
    </div>
  );
}
