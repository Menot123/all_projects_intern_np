import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  // const apiUrlPagination = import.meta.env.VITE_API_URL + `?_page=${page}&_limit=${limit}`

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


  const indexOfLastPost = page * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
    console.log(pageNumber)
  }

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / limit); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <h2>Post from <code>{apiUrl}</code></h2>
      <div class="container">
        <div class="row">
          <div class="table-responsive" data-pattern="priority-columns">
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <td>User ID</td>
                  <td>Post ID</td>
                  <td>Title</td>
                  <td>Body</td>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map(post => (
                  <tr>
                    <td>{post.userId}</td>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <br />

          <div class="center">
            <div class="pagination">
              <a onClick={() => paginate(page - 1)} href="#">&laquo;</a>
              {pageNumbers.map(number => (
                <a key={number} onClick={() => paginate(number)} href="#" class={number == page ? 'active' : ''}>{number}</a>
              ))}
              <a onClick={() => paginate(page + 1)} href="#">&raquo;</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
