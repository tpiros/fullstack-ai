import styles from './loading.module.css';
const Loading = () => (
  <>
    <ul>
      {[...Array(4)].map((_, idx) => (
        <li key={idx} className={styles.li}></li>
      ))}
    </ul>
  </>
);

export default Loading;
