import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Services = () => {
  return (
    <>
      <Navbar />
      <main className="container py-4" style={{ marginTop: '100px' }}>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm">
              <div className="card-body">
                <h1 className="card-title text-center mb-4">Our Services</h1>
                <p className="card-text text-center">
                  We offer a wide range of services to meet your needs. Our team of experts is dedicated to providing the highest quality of service and support.
                </p>
                <hr />

                <section className="mt-4">
                  <h2>Web Development</h2>
                  <p>
                    Our web development services include creating responsive and user-friendly websites. We use the latest technologies and frameworks to ensure your website is fast, secure, and scalable.
                  </p>
                </section>

                <hr />

                <section className="mt-4">
                  <h2>Mobile Application Development</h2>
                  <p>
                    We develop mobile applications that provide a seamless user experience across all devices. Our team is experienced in creating apps for both Android and iOS platforms.
                  </p>
                </section>

                <hr />

                <section className="mt-4">
                  <h2>Digital Marketing</h2>
                  <p>
                    Our digital marketing services help you reach a larger audience and grow your business online. We offer SEO, social media marketing, content marketing, email marketing, and more to increase your online presence.
                  </p>
                </section>

                <hr />

                <section className="mt-4">
                  <h2>Graphic Design</h2>
                  <p>
                    We provide creative graphic design services to enhance your brand's visual identity. Our designs are tailored to communicate your message effectively and attract your target audience.
                  </p>
                </section>

                <hr />

                <section className="mt-4">
                  <h2>E-commerce Solutions</h2>
                  <p>
                    We specialize in developing e-commerce solutions that are secure, scalable, and optimized for sales. Whether you're starting a new online store or improving an existing one, we can help you succeed in the digital marketplace.
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

export default Services;
