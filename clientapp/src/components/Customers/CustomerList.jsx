import React, { useState } from 'react';
import '../../AppStyles.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CustomerList = ({ customers, onDeleteCustomer }) => {
    const [customerList, setCustomers] = useState(customers);

    const handleDeleteCustomer = (customerId, customerName) => {
        if (window.confirm(`Are you sure you want to delete ${customerName}?`))
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(response => {
                console.log('Customer deleted:', response.data);
                setCustomers(customers.filter(customer => customer.id !== customerId));
                onDeleteCustomer();
            })
            .catch(error => {
                alert('This is the catch in handleDeleteCustomer.');
                console.error('Error deleting customer:', error.response ? error.response.data : error.message);
            });
    };

    return (
        <div className="container bg-white border">
            <h2 className='mt-2 mb-3 ms-4'>Customers</h2>
            <ul>
                {customers.map(customer => (
                    <li key={customer.id} className="row column-gap-3 text-dark text-decoration-none me-4">
                        <div className="col-md-4">{customer.name}</div>

                        <Link to={`/customers/${customer.id}`} className="btn btn-primary col-md-2">
                            Edit
                        </Link>
                        
                        <button className="btn btn-danger col-md-2"
                                onClick={() => handleDeleteCustomer(customer.id, customer.name)
                        }>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

CustomerList.propTypes = {
    onCustomerSelect: PropTypes.func,
    onDeleteCustomer: PropTypes.func
};

CustomerList.defaultProps = {
    onCustomerSelect: () => {},
    onDeleteCustomer: () => {}
};

export default CustomerList;