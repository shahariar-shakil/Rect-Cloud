import React, { useState } from 'react';
import { auth, db } from '../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let isValid = true;

    if (!nameRegex.test(name)) {
      setNameMessage('Name should contain only letters and spaces.');
      isValid = false;
    } else {
      setNameMessage('Name is valid.');
    }

    if (!emailRegex.test(email)) {
      setEmailMessage('Invalid email format.');
      isValid = false;
    } else {
      setEmailMessage('Email is valid.');
    }

    if (!passwordRegex.test(password)) {
      setPasswordMessage('Password must be at least 8 characters long and contain both letters and numbers.');
      isValid = false;
    } else {
      setPasswordMessage('Password is valid.');
    }

    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: name, // Store the name
        email: user.email,
      });

      navigate('/signin');
    } catch (error) {
      console.error('Error signing up', error);
      setError('Failed to sign up. Please try again later.');
    }
  };

  const getValidationStyle = (message) => {
    return message.includes('valid') ? { color: 'green' } : { color: 'red' };
  };

  return (
    <>
      <Navbar />
      <main className="container" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Sign Up</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignUp}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      pattern="[a-zA-Z\s]+"
                      title="Name should contain only letters and spaces."
                    />
                    <small style={getValidationStyle(nameMessage)}>{nameMessage}</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <small style={getValidationStyle(emailMessage)}>{emailMessage}</small>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                      title="Password must be at least 8 characters long and contain both letters and numbers."
                    />
                    <small style={getValidationStyle(passwordMessage)}>{passwordMessage}</small>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignUp;
