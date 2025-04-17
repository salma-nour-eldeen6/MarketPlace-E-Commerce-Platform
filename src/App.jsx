import { Routes, Route } from 'react-router-dom';
import './AppStyles.css';
import CustomerManager from './components/Customers/CustomerManager';
 
 
import Home from './components/Home';
import NavigationBar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import NotFound from './components/Pages/NotFound';
import AuthPage from './components/Pages/AuthPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
    return (
        <div className='app-container'>
 
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/AuthPage" element={<AuthPage />} />
                <Route path='/customers' element={<CustomerManager />} />
                <Route path='/customers/:id' element={<CustomerManager />} />
                {/* <Route path='/products' element={<ProductManager />} />
                <Route path='/products/:id' element={<ProductManager />} />
                <Route path='/orders' element={<OrderManager />} />
                <Route path='/orders/:id' element={<OrderManager />} /> */}
                <Route path='*' element={<NotFound />} />
            </Routes>
        </div>
    )
};

export default App;
