import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';

const CustomerManager = () => {
    const { id } = useParams();
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/customers`);
            setCustomers(response.data);
        }
        catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    return (
        <div>
            <CustomerForm customers={customers} customerId={id} onUpdateCustomerList={fetchCustomers} />
            <CustomerList customers={customers} onDeleteCustomer={fetchCustomers} />
        </div>
    );
}

export default CustomerManager;