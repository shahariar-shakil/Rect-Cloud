import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">About Us</h1>
                <p className="card-text text-center">
                  Welcome to Shahariar's website! Our mission is to provide the best services to our users.
                </p>
                <hr />

                <section className="mt-4">
                  <h2>Our Mission</h2>
                  <p>
                    We are a team of dedicated professionals committed to delivering high-quality solutions. Our website offers a variety of services designed to meet your needs.
                  </p>
                </section>

                <hr />

                <section className="mt-4">
                  <h2>Our Vision</h2>
                  <p>
                    With years of experience in the industry, we have built a reputation for excellence and reliability. We continuously strive to improve and innovate, ensuring that our users have the best possible experience.
                  </p>
                </section>

                <hr />

                <section className="mt-4">
                  <h2>Why Choose Us?</h2>
                  <p>
                    Thank you for visiting our site. We look forward to serving you and helping you achieve your goals.
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

export default About;
