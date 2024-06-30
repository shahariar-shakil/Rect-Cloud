import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { db } from '../firebase/firebase';
import { collection, addDoc } from 'firebase/firestore';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    file: null,
  });
  const [messages, setMessages] = useState({
    name: '',
    phone: '',
    email: '',
    file: '',
  });
  const [submissionMessage, setSubmissionMessage] = useState('');

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const phoneRegex = /^\d{11}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid = true;

    if (!nameRegex.test(formData.name)) {
      setMessages(prev => ({ ...prev, name: 'Name should contain only letters and spaces.' }));
      isValid = false;
    } else {
      setMessages(prev => ({ ...prev, name: 'Name is valid.' }));
    }

    if (!phoneRegex.test(formData.phone)) {
      setMessages(prev => ({ ...prev, phone: 'Phone number should be 11 digits.' }));
      isValid = false;
    } else {
      setMessages(prev => ({ ...prev, phone: 'Phone number is valid.' }));
    }

    if (!emailRegex.test(formData.email)) {
      setMessages(prev => ({ ...prev, email: 'Invalid email format.' }));
      isValid = false;
    } else {
      setMessages(prev => ({ ...prev, email: 'Email is valid.' }));
    }

    if (!formData.file) {
      setMessages(prev => ({ ...prev, file: 'Please upload a file.' }));
      isValid = false;
    } else {
      setMessages(prev => ({ ...prev, file: 'File is selected.' }));
    }

    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Prepare the data to be sent to Firestore
      const contactData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        fileName: formData.file ? formData.file.name : null, // Add file name to Firestore
        timestamp: new Date(), // Add a timestamp field
      };

      // Add the contact data to the 'contacts' collection in Firestore
      await addDoc(collection(db, 'contacts'), contactData);

      console.log('Form submitted', contactData);
      setSubmissionMessage('Form submitted successfully');
      setTimeout(() => setSubmissionMessage(''), 2000);

      // Reset the form data after submission
      setFormData({
        name: '',
        phone: '',
        email: '',
        file: null,
      });
      setMessages({
        name: '',
        phone: '',
        email: '',
        file: '',
      });
    } catch (error) {
      console.error('Error submitting form', error);
      setSubmissionMessage('Error submitting form');
      setTimeout(() => setSubmissionMessage(''), 2000);
    }
  };

  const getValidationStyle = (message) => {
    if (message === 'Email is valid.' || message === 'File is selected.') {
      return { color: 'green' };
    } else if (message === 'Invalid email format.' || message.includes('should')) {
      return { color: 'red' };
    } else if (message.includes('valid')) {
      return { color: 'green' };
    } else {
      return {};
    }
  };

  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Contact Us</h1>
                <p className="card-text text-center">
                  We would love to hear from you! If you have any questions, suggestions, or feedback, feel free to get in touch with us using the form below.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <small style={getValidationStyle(messages.name)}>{messages.name}</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone:</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <small style={getValidationStyle(messages.phone)}>{messages.phone}</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <small style={getValidationStyle(messages.email)}>{messages.email}</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="file" className="form-label">Upload File:</label>
                    <input
                      type="file"
                      className="form-control"
                      id="file"
                      name="file"
                      onChange={handleChange}
                      required
                    />
                    <small style={getValidationStyle(messages.file)}>{messages.file}</small>
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {submissionMessage && (
                  <div className="mt-3" style={{ color: submissionMessage.includes('successfully') ? 'green' : 'red' }}>
                    {submissionMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
