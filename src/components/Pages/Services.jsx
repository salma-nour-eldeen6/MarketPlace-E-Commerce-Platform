import React from 'react';
import { FaTruck, FaHeadset, FaMoneyBillWave } from 'react-icons/fa';
import '../../Style/Services.css';  

const Services = () => {
  return (
    <section className="services-section">
      <div className="services-container">
        
        <div className="service-card">
          <div className="service-icon">
            <FaTruck className="icon" />
          </div>
          <h3>FREE AND FAST DELIVERY</h3>
          <p>Free delivery for all orders over $140</p>
        </div>

       
        <div className="service-card">
          <div className="service-icon">
            <FaHeadset className="icon" />
          </div>
          <h3>24/7 CUSTOMER SERVICE</h3>
          <p>Friendly 24/7 customer support</p>
        </div>

         
        <div className="service-card">
          <div className="service-icon">
            <FaMoneyBillWave className="icon" />
          </div>
          <h3>MONEY BACK GUARANTEE</h3>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
