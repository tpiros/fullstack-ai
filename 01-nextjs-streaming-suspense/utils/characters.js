import { delay } from './delay';

const getAllCharacters = async ({ filter = 'all' }) => {
  const starWarsCharacters = [
    {
      id: 1,
      name: 'Luke Skywalker',
      homeplanet: 'Tatooine',
      affiliation: 'Rebellion',
    },
    {
      id: 2,
      name: 'Princess Leia',
      homeplanet: 'Alderaan',
      affiliation: 'Rebellion',
    },
    {
      id: 3,
      name: 'Han Solo',
      homeplanet: 'Corellia',
      affiliation: 'Rebellion',
    },
    {
      id: 4,
      name: 'Chewbacca',
      homeplanet: 'Kashyyyk',
      affiliation: 'Rebellion',
    },
    {
      id: 5,
      name: 'Darth Vader',
      homeplanet: 'Tatooine',
      affiliation: 'Galactic Empire',
    },
    {
      id: 6,
      name: 'Emperor Palpatine',
      homeplanet: 'Naboo',
      affiliation: 'Galactic Empire',
    },
    {
      id: 7,
      name: 'Obi-Wan Kenobi',
      homeplanet: 'Stewjon',
      affiliation: 'Rebellion',
    },
    { id: 8, name: 'Yoda', homeplanet: 'Unknown', affiliation: 'Rebellion' },
    { id: 9, name: 'R2-D2', homeplanet: 'Naboo', affiliation: 'Rebellion' },
    { id: 10, name: 'C-3PO', homeplanet: 'Tatooine', affiliation: 'Rebellion' },
  ];

  if (filter === 'all') {
    await delay(1000);
    return starWarsCharacters;
  }

  if (filter === 'empire') {
    return starWarsCharacters.filter(
      (swc) => swc.affiliation === 'Galactic Empire'
    );
  }
  if (filter === 'rebellion') {
    return starWarsCharacters.filter((swc) => swc.affiliation === 'Rebellion');
  }

  return starWarsCharacters;
};

export default getAllCharacters;
