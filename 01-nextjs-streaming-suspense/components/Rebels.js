import getAllCharacters from '../utils/characters';
import { Suspense } from 'react';
import { delay } from '../utils/delay';

const rebellion = await getAllCharacters({ filter: 'rebellion' });
const Rebels = async () => {
  await delay(2500);
  return (
    <>
      <ul>
        {rebellion.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Rebels;
