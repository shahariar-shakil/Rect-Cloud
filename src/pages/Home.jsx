import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../firebase/firebase'; // Import your Firebase auth instance

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        // If user is not authenticated, navigate to sign in page
        navigate('/signin');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="container" style={{ marginTop: '100px' }}> {/* Add margin-top to account for the navbar */}
        <div className="row justify-content-center mt-4">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Welcome to Shahariar's Website</h1>
                <p className="card-text">
                  This is the home page where you can find an overview of our services and latest updates. Our goal is to provide you with the best user experience.
                </p>
                <hr />
                <section className="mt-4">
                  <h2>Our Services</h2>
                  <p>
                    We offer a variety of services to cater to your needs. Whether you are looking for web development, mobile application development, or digital marketing, we have got you covered.
                  </p>
                </section>
                <hr />
                <section className="mt-4">
                  <h2>Latest News</h2>
                  <p>
                    Stay tuned for the latest updates and news from our team. We are constantly working on new projects and initiatives to serve you better.
                  </p>
                </section>
                <hr />
                <section className="mt-4">
                  <h2>Contact Us</h2>
                  <p>
                    If you have any questions or need further information, feel free to <a href="/contact">contact us</a>. We are here to help you.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
