import React from 'react';
import '../css/AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1 className='about-us-title'>About CampusConnect</h1>
      <p className='about-us-section-text'>Welcome to CampusConnect, the leading platform for education management. We are dedicated to making education more accessible and manageable for everyone, from parents and students to school administrators.</p>
      <p className='about-us-section-text'>At CampusConnect, we believe that education is the key to a better future. That's why we've created a platform that streamlines the process of managing courses, teachers, and students, making it easier for everyone involved to focus on what matters most: learning.</p>
      <div className='about-us-section-container'>
      <h2 className='about-us-section-title'>Our Mission</h2>
      <p className='about-us-section'>Our mission is simple: to make education <strong><em>accessible</em></strong> and <strong><em>manageable</em></strong> for everyone. We believe that education is the key to unlocking human potential, and we're committed to making it easier for people of all ages to pursue their dreams.</p>
      </div>
      <div className='about-us-section-container'>
      <h2 className='about-us-section-title'>What We Do</h2>
      <ul className='about-us-section'>
        <li>For <strong>parents and guardians:</strong> Register your children for courses, view student information, and pay outstanding balances.</li>
        <li>For <strong>school administrators:</strong> Manage courses, teachers, and students, create new courses, and update information as needed.</li>
      </ul>
      </div>
      <div className='about-us-section-container'>
      <h2 className='about-us-section-title'>Our Team</h2>
      <p className='about-us-section'>Our team is made up of passionate individuals who are dedicated to making education more accessible and manageable for everyone. From our developers to our customer support team, everyone at CampusConnect is committed to providing the best possible experience for our users.</p>
      </div>
      <div className='about-us-section-container'>
      <h2 className='about-us-section-title'>Get in Touch</h2>
      <p className='about-us-section'>If you have any questions or feedback, we'd love to hear from you. You can reach us at <strong>joseangelfletes@gmail.com</strong>. Thank you for choosing CampusConnect.</p>
      </div>
    </div>
  )
}

export default AboutUs;
