import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Footer() {
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container bg-transparent">
                <div className="row">
                    {/* Logo and Company Info */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3">Book Your Journey</h5>
                        <p>
                            Your trusted partner in travel. Book your next adventure with us and explore the world in comfort and style.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3">Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="#" className="text-white text-decoration-none">Home</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Destinations</a></li>
                            <li><a href="#" className="text-white text-decoration-none">Special Offers</a></li>
                            <li><a href="#" className="text-white text-decoration-none">FAQs</a></li>
                        </ul>
                    </div>

                    {/* Social Media & Contact */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3">Get in Touch</h5>
                        <p>Email: support@bookyourjourney.com</p>
                        <p>Phone: +123 456 7890</p>
                        <h5 className="mt-4 mb-3">Follow Us</h5>
                        <div>
                            <a href="#" className="text-white me-2" style={{ fontSize: '1.2rem' }}><i className="fab fa-facebook"></i></a>
                            <a href="#" className="text-white me-2" style={{ fontSize: '1.2rem' }}><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-white me-2" style={{ fontSize: '1.2rem' }}><i className="fab fa-instagram"></i></a>
                            <a href="#" className="text-white" style={{ fontSize: '1.2rem' }}><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="col-md-3 mb-4">
                        <h5 className="mb-3">FEEDBACK</h5>
                        <p>Drop your feedback here.</p>
                        <form>
                            <div className="input-group">
                                <textarea className="form-control"></textarea>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-4">
                    <p>&copy; 2024 Book Your Journey. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
