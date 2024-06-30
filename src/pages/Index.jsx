import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ marginTop: '100px' }}>
        <section className="text-center">
          <h1>Welcome to Shahariar's Website</h1>
          <p className="lead">This is the index page. Please sign up or sign in to continue.</p>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Sign Up</h5>
                  <p className="card-text">Create an account to access exclusive features.</p>
                  <a href="/signup" className="btn btn-primary">Sign Up</a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Sign In</h5>
                  <p className="card-text">Already have an account? Sign in here.</p>
                  <a href="/signin" className="btn btn-outline-primary">Sign In</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Index;
