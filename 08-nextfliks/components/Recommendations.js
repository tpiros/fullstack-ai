import useSWR from 'swr';
import Loading from './Loading';
import styles from './recommendations.module.css';
const fetcher = async (props) => {
  const [url, payload] = props;
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return fetch(url, options).then((r) =>
    r.json().catch((e) => console.error(e))
  );
};

const Recommendations = ({ title }) => {
  const { data } = useSWR(
    [
      '/films',
      {
        title,
      },
    ],
    fetcher,
    { suspense: true, fallbackData: [] }
  );
  return (
    <div className={styles.youMayBeInterestedIn}>
      <h1 className={styles.youMayBeInterestedIn}>You May Be Interested In</h1>
      <ul>
        {data.length === 0 && <Loading />}
        {data &&
          data.map((d, index) => (
            <li key={d.id} style={{ '--animation-delay': `${index * 100}ms` }}>
              {d.metadata.title}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Recommendations;
