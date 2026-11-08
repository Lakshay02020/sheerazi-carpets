import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    return (
        <div className="policy-page container py-60">
            <div className="policy-header text-center">
                <h1 className="section-title">Privacy Policy</h1>
                <p className="last-updated">Last Updated: May 2026</p>
            </div>

            <div className="policy-content">
                <section className="policy-section">
                    <h2>1. Introduction</h2>
                    <p>
                        <strong>Fine and Art Carpets</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is dedicated to protecting the privacy and personal information of visitors and customers on <a href="https://fineandartcarpets.com">https://fineandartcarpets.com</a>. This Privacy Policy details how we collect, store, protect, and use your personal data when you interact with our website or make a purchase.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>2. Information We Collect</h2>
                    <p>When you visit our website, register an account, or make a purchase, we may collect:</p>
                    <ul>
                        <li><strong>Contact & Identity Details:</strong> Full name, email address, contact phone number, billing address, and delivery shipping address.</li>
                        <li><strong>Order Information:</strong> Products purchased, rug sizes, quantities, order totals, and transaction timestamps.</li>
                        <li><strong>Technical & Browsing Data:</strong> IP address, device type, browser information, pages visited, and cookies to ensure smooth site navigation and cart functionality.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>3. Payment Security & Third-Party Processors</h2>
                    <p>
                        We prioritize your financial safety. All online transactions are processed through verified, RBI-authorized, and PCI-DSS compliant payment gateways, specifically <strong>Razorpay</strong>.
                    </p>
                    <ul>
                        <li><strong>No Stored Financial Credentials:</strong> Fine and Art Carpets <strong>does not</strong> capture, store, or view your complete credit card numbers, CVVs, debit card PINs, or net banking passwords.</li>
                        <li>All payment sessions are encrypted using industry-standard 256-bit SSL encryption.</li>
                        <li>Payment information is handled strictly in accordance with Razorpay&rsquo;s privacy and security standards.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>4. How We Use Your Information</h2>
                    <p>We use your data solely for lawful business operations, including:</p>
                    <ul>
                        <li>Processing and delivering your carpet orders and sending tracking updates.</li>
                        <li>Communicating regarding customer support inquiries, returns, or order clarifications.</li>
                        <li>Improving our website performance, user experience, and catalogue presentation.</li>
                        <li>Complying with regulatory, tax, accounting, and legal requirements.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>5. Data Sharing & Third Parties</h2>
                    <p>
                        <strong>We never sell, rent, or trade your personal information to third-party marketers.</strong> We share necessary details only with trusted service partners required to fulfill your order:
                    </p>
                    <ul>
                        <li><strong>Logistics Partners:</strong> Sharing your name, delivery address, and phone number with courier companies (e.g. Blue Dart, Delhivery) for doorstep delivery.</li>
                        <li><strong>Payment Partners:</strong> Transmitting order values and customer details to Razorpay for secure checkout.</li>
                        <li><strong>Legal Authorities:</strong> Disclosing information only when mandated by law or court orders to protect our rights and prevent fraud.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>6. Cookies & Tracking Technologies</h2>
                    <p>
                        We use cookies and similar technologies to remember your shopping cart items, keep you signed in, and analyze site traffic patterns. You can choose to disable cookies through your browser settings, though doing so may limit certain checkout functionalities on our site.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>7. Data Retention & Your Rights</h2>
                    <p>
                        We retain your transaction and order data only for as long as necessary to fulfill the purposes outlined herein or as required by Indian commercial and tax laws. You have the right to access, review, or request deletion of your personal data by reaching out to our privacy team.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>8. Contact Our Privacy Officer</h2>
                    <p>
                        If you have questions, feedback, or concerns regarding your privacy or data protection practices, please contact us:
                    </p>
                    <div className="contact-card">
                        <p><strong>Fine and Art Carpets</strong></p>
                        <p>Privacy & Support Email: <a href="mailto:fineandarts96@gmail.com">fineandarts96@gmail.com</a></p>
                        <p>Phone / WhatsApp: <a href="tel:+919889747766">+91 9889747766</a></p>
                        <p>Website: <a href="https://fineandartcarpets.com">https://fineandartcarpets.com</a></p>
                        <p><Link to="/contact" className="contact-link">&rarr; Visit Contact Us Page</Link></p>
                    </div>
                </section>
            </div>

            <style>{`
                .policy-page {
                    max-width: 900px;
                    margin: 0 auto;
                    line-height: 1.7;
                    color: #333;
                }
                .policy-header {
                    margin-bottom: 40px;
                    border-bottom: 1px solid var(--border-color);
                    padding-bottom: 25px;
                }
                .last-updated {
                    color: var(--text-light);
                    font-size: 0.9rem;
                    margin-top: 8px;
                }
                .policy-section {
                    margin-bottom: 35px;
                }
                .policy-section h2 {
                    font-size: 1.35rem;
                    color: var(--text-dark);
                    margin-bottom: 12px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                }
                .policy-section p {
                    margin-bottom: 12px;
                    color: #444;
                    font-size: 0.98rem;
                }
                .policy-section ul {
                    padding-left: 24px;
                    margin-bottom: 12px;
                }
                .policy-section li {
                    margin-bottom: 8px;
                    color: #444;
                    font-size: 0.98rem;
                }
                .policy-section a {
                    color: var(--primary);
                    text-decoration: underline;
                }
                .contact-card {
                    background: var(--secondary);
                    padding: 20px 25px;
                    border-radius: 6px;
                    border: 1px solid var(--border-color);
                    margin-top: 15px;
                }
                .contact-card p {
                    margin-bottom: 6px;
                }
                .contact-link {
                    display: inline-block;
                    margin-top: 10px;
                    font-weight: 500;
                    text-decoration: none !important;
                }
            `}</style>
        </div>
    );
};

export default PrivacyPolicy;
