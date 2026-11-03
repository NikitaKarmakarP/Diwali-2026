import React from 'react';

// Deities gallery – displays Laxmi, Ganesh, and Ma Kali (and any additional deity images)
// Replace the placeholder URLs with your own assets if you have local files.
const deities = [
  {
    name: 'Goddess Laxmi',
    src: 'https://i.imgur.com/4bJw2kX.jpg', // placeholder – update with real image
  },
  {
    name: 'Lord Ganesh',
    src: 'https://i.imgur.com/7Q9Kf9c.jpg', // placeholder – update with real image
  },
  {
    name: 'Goddess Kali',
    src: 'https://i.pinimg.com/736x/73/a0/4c/73a04c66e9762afc04ba504cc3641df9.jpg',
  },
];

export const DeityGallery: React.FC = () => {
  return (
    <section className="my-12">
      <h2 className="text-center text-3xl font-serif font-black text-galaxy-ivory mb-8 animate-fade-in">
        Divine Gallery
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {deities.map((d) => (
          <figure
            key={d.name}
            className="relative rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-galaxy-amber/10 via-galaxy-gold/5 to-galaxy-amber/10 animate-pulse-slow"
          >
            {/* glowing border */}
            <div className="absolute inset-0 border-2 border-galaxy-gold/30 rounded-xl pointer-events-none" />
            <img
              src={d.src}
              alt={d.name}
              className="w-full h-64 object-cover transition-transform duration-500 ease-out hover:scale-105"
            />
            <figcaption className="absolute bottom-0 left-0 right-0 bg-galaxy-midnight/60 text-galaxy-ivory text-center py-2 font-medium">
              {d.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
