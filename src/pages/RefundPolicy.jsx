import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
    return (
        <div className="policy-page container py-60">
            <div className="policy-header text-center">
                <h1 className="section-title">Return, Refund & Cancellation Policy</h1>
                <p className="last-updated">Last Updated: May 2026</p>
            </div>

            <div className="policy-content">
                <section className="policy-section">
                    <h2>1. Overview</h2>
                    <p>
                        At <strong>Fine and Art Carpets</strong>, we take immense pride in crafting premium handmade, tufted, and artisan rugs. We want you to be completely delighted with your purchase. If for any reason you are not satisfied, we offer a transparent return, exchange, and refund process outlined below.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>2. Cancellation Policy</h2>
                    <ul>
                        <li><strong>Before Dispatch:</strong> You may cancel your order at any time before it has been dispatched from our facility. To request a cancellation, please contact us immediately at <a href="mailto:fineandarts96@gmail.com">fineandarts96@gmail.com</a> or call/WhatsApp <a href="tel:+919889747766">+91 9889747766</a> with your order number. A 100% full refund will be processed back to your original payment method.</li>
                        <li><strong>After Dispatch:</strong> Once an order has been shipped and handed to the courier partner, it cannot be canceled in transit. You may initiate a return upon delivery in accordance with our return guidelines below.</li>
                        <li><strong>Custom / Bespoke Carpets:</strong> Orders for custom-dimension, personalized, or commissioned rugs cannot be canceled once manufacturing has commenced.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>3. 7-Day Return Window</h2>
                    <p>
                        We offer a <strong>7-day return policy</strong> from the date of delivery for all standard catalogue carpets.
                    </p>
                    <p>To be eligible for a return:</p>
                    <ul>
                        <li>The carpet must be unused, unwashed, unstained, and in the exact condition received.</li>
                        <li>It must be in its original packaging with all labels, authenticity tags, and documentation intact.</li>
                        <li>Proof of purchase (order confirmation email or receipt) must be provided.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>4. Damaged, Defective, or Incorrect Items</h2>
                    <p>
                        Every carpet undergoes rigorous quality inspection before leaving our workshop. In the rare event that your product arrives damaged, defective, or different from what you ordered:
                    </p>
                    <ul>
                        <li>Please notify us within <strong>48 hours</strong> of delivery by emailing photos or a short video of the damage/defect along with your order ID to <a href="mailto:fineandarts96@gmail.com">fineandarts96@gmail.com</a>.</li>
                        <li>Our team will arrange a free reverse pickup and offer you an immediate free replacement or a 100% full refund, per your preference.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>5. Return Process & Reverse Pickup</h2>
                    <ol>
                        <li><strong>Initiate:</strong> Send a return request with your order ID and reason for return to <a href="mailto:fineandarts96@gmail.com">fineandarts96@gmail.com</a> or message us on WhatsApp at <a href="tel:+919889747766">+91 9889747766</a>.</li>
                        <li><strong>Verification:</strong> Our team will verify your request within 24 business hours and guide you through the return steps.</li>
                        <li><strong>Pickup / Shipping:</strong> We will arrange a door-step reverse pickup through our logistics partners. Please ensure the carpet is securely wrapped in its original packaging.</li>
                    </ol>
                </section>

                <section className="policy-section">
                    <h2>6. Refund Processing & Timelines</h2>
                    <p>
                        Once your returned carpet is received at our facility and passes quality inspection:
                    </p>
                    <ul>
                        <li>We will notify you via email regarding the approval of your refund.</li>
                        <li>Upon approval, your refund will be initiated immediately through our payment gateway (<strong>Razorpay</strong>).</li>
                        <li>Refunds are credited back to your <strong>original payment method</strong> (credit card, debit card, net banking, or UPI) within <strong>5 to 7 business days</strong>, depending on your card issuer or bank&rsquo;s processing schedule.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>7. Contact Us</h2>
                    <p>
                        For any questions regarding cancellations, returns, or refunds:
                    </p>
                    <div className="contact-card">
                        <p><strong>Fine and Art Carpets</strong></p>
                        <p>Email: <a href="mailto:fineandarts96@gmail.com">fineandarts96@gmail.com</a></p>
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
                .policy-section ul, .policy-section ol {
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

export default RefundPolicy;
