import React, { useState } from 'react';
import { FaCreditCard, FaLock, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer.jsx';
import '../../Style/Payment.css';

const Payment = () => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    name: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment details submitted successfully!');
  };

  return (
    <div className="payment-page">
        <Navbar />
      {/* Hero Section */}
      <section className="payment-hero">
        <div className="hero-content">
          <h1>Secure Payment</h1>
          <p>Complete your purchase in a few simple steps</p>
        </div>
      </section>

      {/* Payment Process Section */}
      <section className="payment-process-section">
        <div className="container">
          <div className="payment-process-content">
           
            
            <div className="payment-process-steps">
              <div className="step-item">
                <FaCreditCard className="step-icon" />
                <h3>Step 1: Choose Payment Method</h3>
                <p>Select your preferred payment method from the options available.</p>
              </div>
              <div className="step-item">
                <FaLock className="step-icon" />
                <h3>Step 2: Secure Payment</h3>
                <p>Your payment details are securely encrypted to protect your privacy.</p>
              </div>
              <div className="step-item">
                <FaCheckCircle className="step-icon" />
                <h3>Step 3: Confirmation</h3>
                <p>Once your payment is processed, you will receive a confirmation email.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Form Section */}
      <section className="payment-form-section">
        <div className="container">
         
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9101 1121"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="expirationDate">Expiration Date</label>
              <input
                type="month"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Cardholder Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Billing Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St, City, Country"
                required
              />
            </div>
            <button type="submit" className="cta-button22">
              Complete Payment <FaArrowRight />
            </button>
          </form>
        </div>
      </section>
      <Footer /> 
    </div>
  );
};

export default Payment;
