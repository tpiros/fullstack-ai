import { Suspense } from 'react';
import getAllCharacters from '../utils/characters';
import Empire from '../components/Empire';
import Rebels from '../components/Rebels';
import Loading from '../components/Loading';

const Home = async () => {
  const allCharacters = await getAllCharacters({ filter: 'all' });

  return (
    <section>
      <h1>Star Wars</h1>
      <ul>
        {allCharacters.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
      <h1>Galactic Empire</h1>
      {/* <Suspense fallback={<Loading />}> */}
      <Empire />
      {/* </Suspense> */}

      <h1>Rebellion</h1>
      {/* <Suspense fallback={<Loading />}> */}
      <Rebels />
      {/* </Suspense> */}
    </section>
  );
};
export default Home;
