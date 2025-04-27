import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { FaGem, FaRocket, FaHandshake, FaHeart, FaUsers, FaChartLine, FaAward } from 'react-icons/fa';
import { GiAbstract024 } from 'react-icons/gi';
import '../../Style/About.css';

const About = () => {
  return (
    <div className="about-page">
        <Navbar />
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>Our Story</h1>
          <p>Discover the passion behind Exclusive</p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At Exclusive, we're redefining online shopping by curating only the finest products 
              from around the world. Our mission is to deliver exceptional quality with 
              unparalleled service.
            </p>
            <div className="mission-stats">
              <div className="stat-item">
                <FaUsers className="stat-icon" />
                <h3>10K+</h3>
                <p>Happy Customers</p>
              </div>
              <div className="stat-item">
                <FaChartLine className="stat-icon" />
                <h3>500+</h3>
                <p>Brand Partners</p>
              </div>
              <div className="stat-item">
                <FaAward className="stat-icon" />
                <h3>100%</h3>
                <p>Satisfaction Guarantee</p>
              </div>
            </div>
          </div>
          <div className="mission-image">
            <GiAbstract024 className="abstract-icon" />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <FaGem className="value-icon" />
            <h3>Quality</h3>
            <p>We meticulously select only the finest products for our customers.</p>
          </div>
          <div className="value-card">
            <FaRocket className="value-icon" />
            <h3>Innovation</h3>
            <p>Constantly pushing boundaries to enhance your shopping experience.</p>
          </div>
          <div className="value-card">
            <FaHandshake className="value-icon" />
            <h3>Integrity</h3>
            <p>Honest and transparent in all our business practices.</p>
          </div>
          <div className="value-card">
            <FaHeart className="value-icon" />
            <h3>Passion</h3>
            <p>Driven by our love for delivering exceptional service.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <h2>Ready to Experience Exclusive?</h2>
        <Link to="/" className="cta-button">Start Shopping</Link>
      </section>
    </div>
  );
};

export default About;
