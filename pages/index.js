import "bootstrap/dist/css/bootstrap.css";
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home({ posts }) {
  return (
    <div>
      <main>
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
            <h1>mindworks</h1>
            <h3>Comment manager</h3> 
            <p>Click on a posts to show more details</p>
            </div>
          </div>
          <h5>Posts</h5>
          <div>
          {
          posts.map((post) => (
          <Link href={`/post?id=${post.id}}`}>
            <a href={`/post?id=${post.id}`} target="new_window" className={styles.link}>
              <p key={post.id} className={styles.card} >{post.title}</p>
            </a>
          </Link>
          ))}
         </div>
        </div>
      </main>
    </div>
  )
}

//getstaticprops and getserverprops are used to fetch from an external API
export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  return {
    props: {
      posts,
    },
  }
}
