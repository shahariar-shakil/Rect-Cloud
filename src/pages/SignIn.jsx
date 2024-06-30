import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../firebase/firebase';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return false;
    }

    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and contain both letters and numbers.');
      return false;
    }

    setError('');
    return true;
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      // Sign in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Navigate to home page after successful sign-in
      if (user) {
        navigate('/home');
      }
    } catch (error) {
      setError('Failed to sign in. Please check your credentials and try again.');
      console.error('Error signing in', error);
    }
  };

  return (
    <>
      <Navbar />
      <main className="container" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center mt-4">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Sign In</h1>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSignIn}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
                      title="Password must be at least 8 characters long and contain both letters and numbers."
                    />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
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

export default SignIn;
