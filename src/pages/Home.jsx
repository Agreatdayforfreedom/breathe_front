import PreviewPost from '../components/PreviewPost';
import usePost from '../hooks/usePost';
import styles from '../styles/Home.module.css';

function Home() {
  const { posts } = usePost();
  if (posts.length === 0) {
    return <p className={styles.noposts}>no hay posts</p>;
  }
  return (
    <div>
      <div className={`container ${styles.section}`}>
        {posts.map((post) => (
          <PreviewPost key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
