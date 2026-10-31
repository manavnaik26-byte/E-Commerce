import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <main className="empty-state-page not-found-page">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="primary-button">Return home</Link>
    </main>
  );
}

export default NotFound;