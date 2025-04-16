import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='container bg-light text-dark border p-3'>
            <h2>404 Not Found</h2>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to='/'>Go back to the home page</Link>
        </div>
    );
};

export default NotFound;