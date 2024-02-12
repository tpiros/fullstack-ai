'use client';

import Recommendations from '@/components/Recommendations';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [selectedTitle, setSelectedTitle] = useState('Star Wars');
  const handleChange = (event) => {
    setSelectedTitle(event.target.value);
  };

  return (
    <div className="container">
      <div className="imageWrapper">
        <Image
          src="/nextfliks.png"
          width={400}
          height={400}
          alt="NextFliks"
          priority="high"
        />
      </div>
      <h1 className="title">You watched {selectedTitle}</h1>
      <div className="dropdown">
        <label htmlFor="movieSelect">Choose a movie:</label>
        <select id="movieSelect" value={selectedTitle} onChange={handleChange}>
          <option value="Star Wars">Star Wars</option>
          <option value="Joker">Joker</option>
          <option value="Coco">Coco</option>
          <option value="The Avengers">The Avengers</option>
        </select>
      </div>
      <Recommendations title={selectedTitle} />
    </div>
  );
}
