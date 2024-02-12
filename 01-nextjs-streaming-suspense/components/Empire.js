import getAllCharacters from '../utils/characters';
import { delay } from '../utils/delay';

const empire = await getAllCharacters({ filter: 'empire' });
const Empire = async () => {
  await delay(2000);

  return (
    <>
      <ul>
        {empire.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Empire;
