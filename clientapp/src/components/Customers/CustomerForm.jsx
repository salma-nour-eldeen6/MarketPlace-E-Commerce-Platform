import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerForm = ({ onUpdateCustomerList }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:5000/customers/${id}`)
                .then(response => {
                    const customerData = response.data;
                    setName(customerData.name);
                    setEmail(customerData.email);
                    setPhone(customerData.phone);
                    setAddress(customerData.address);
                    setUsername(customerData.username);
                    setPassword(customerData.password);
                    console.log('Customer data:', customerData);
                })
                .catch(error => {
                    console.error('Error fetching customer data:', error);
                });
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'phone':
                setPhone(value);
                break;
            case 'address':
                setAddress(value);
                break;
            case 'username':
                setUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        if (!phone) errors.phone = 'Phone is required';
        if (!address) errors.address = 'Address is required';
        if (!id) {
            if (!username) errors.username = 'Username is required';
            if (!password) errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            const customerData = {
                name: name.trim(),
                email: email.trim(),
                phone: phone.trim(),
                address: address.trim(),
                username: id ? undefined : username.trim(),
                password: id ? undefined : password.trim()
            };
            const apiUrl = id
                ? `http://127.0.0.1:5000/customers/${id}`
                : 'http://127.0.0.1:5000/customers';

            const httpMethod = id ? axios.put : axios.post;

            httpMethod(apiUrl, customerData)
                .then(response => {
                    setName('');
                    setEmail('');
                    setPhone('');
                    setAddress('');
                    setUsername('');
                    setPassword('');
                    onUpdateCustomerList();
                    navigate('/customers');
                })
                .catch(error => {
                    console.error('Error submitting customer data:', error);
                });
        } else {
            setErrors(errors);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className='mb-3 border p-3 bg-light text-dark'>
                <h3 className='mb-3'>{id ? 'Edit Customer' : 'Add Customer'}</h3>
                <label className="form-label">
                    Name:
                    <input type='text' name="name" value={name} onChange={handleChange} className='form-control' />
                    {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
                </label>
                <br />
                <label className="form-label">
                    Email:
                    <input type='email' name="email" value={email} onChange={handleChange} className='form-control' />
                    {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                </label>
                <br />
                <label className="form-label">
                    Phone:
                    <input type='tel' name="phone" value={phone} onChange={handleChange} className='form-control' />
                    {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
                </label>
                <br />
                <label className="form-label">
                    Address:
                    <input type='text' name="address" value={address} onChange={handleChange} className='form-control' />
                    {errors.address && <span style={{ color: 'red' }}>{errors.address}</span>}
                </label>
                <br />
                <label className="form-label">
                    Username:
                    <input type='text' name="username" value={username} onChange={handleChange} className='form-control' disabled={!!id} />
                    {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
                </label>
                <br />
                <label className="form-label">
                    Password:
                    <input type='password' name="password" value={password} onChange={handleChange} className='form-control' disabled={!!id} />
                    {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                </label>
                <br />
                <button className="btn btn-primary" type='submit'>{id ? 'Edit' : 'Add Customer'}</button>
            </form>
        </div>
    );
};

export default CustomerForm;