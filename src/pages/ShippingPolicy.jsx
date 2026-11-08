import React from 'react';
import { Link } from 'react-router-dom';

const ShippingPolicy = () => {
    return (
        <div className="policy-page container py-60">
            <div className="policy-header text-center">
                <h1 className="section-title">Shipping & Delivery Policy</h1>
                <p className="last-updated">Last Updated: May 2026</p>
            </div>

            <div className="policy-content">
                <section className="policy-section">
                    <h2>1. Free Nationwide Shipping</h2>
                    <p>
                        <strong>Fine and Art Carpets</strong> provides <strong>Free Shipping across India</strong> on all orders, with no minimum cart value required. Every carpet is carefully packed in multi-layer water-resistant wrapping to ensure it arrives in pristine, showroom condition.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>2. Processing & Dispatch Timelines</h2>
                    <ul>
                        <li><strong>Ready-to-Ship Products:</strong> Orders are processed and dispatched within <strong>1 to 3 business days</strong> following payment confirmation.</li>
                        <li><strong>Custom / Made-to-Order Rugs:</strong> Handcrafted carpets woven to custom dimensions typically require <strong>2 to 4 weeks</strong> for artisanal weaving, finishing, and quality inspection before dispatch. We will keep you updated throughout the crafting process.</li>
                        <li>Orders are not dispatched on Sundays or national holidays.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>3. Estimated Delivery Times</h2>
                    <p>
                        Once dispatched, transit times across India generally range between:
                    </p>
                    <ul>
                        <li><strong>Metro Cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai):</strong> 4 to 7 business days.</li>
                        <li><strong>Tier 2 & Tier 3 Cities / Rest of India:</strong> 6 to 10 business days.</li>
                        <li><strong>Remote or North-East Areas:</strong> 8 to 12 business days.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>4. Trusted Logistics Partners & Real-Time Tracking</h2>
                    <p>
                        We partner with reputable express courier services across India (including Blue Dart, Delhivery, DTDC, and SafeXpress) to handle your rugs safely.
                    </p>
                    <p>
                        Once your order is picked up by the courier, you will receive a dispatch notification via email or SMS containing your <strong>AWB / Tracking Number</strong> and tracking link to monitor your shipment in real time.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>5. Delivery Address & Unsuccessful Delivery</h2>
                    <p>
                        Please ensure accurate delivery address details (including street address, landmarks, and 6-digit postal PIN code) along with an active phone number at checkout.
                    </p>
                    <p>
                        Our courier partner will attempt delivery up to 3 times before returning the parcel to our facility. If an order is returned due to an incorrect address or customer unavailability, our support team will reach out to schedule re-delivery.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>6. Transit Insurance & Damaged Packages</h2>
                    <p>
                        Every shipment from Fine and Art Carpets is <strong>100% insured in transit</strong>. If the outer packaging appears severely damaged, tampered with, or opened upon delivery, please:
                    </p>
                    <ul>
                        <li>Refuse the delivery, or mention &ldquo;Package Received Damaged&rdquo; on the courier proof-of-delivery slip.</li>
                        <li>Take clear photographs of the package and notify us within <strong>48 hours</strong> at <a href="mailto:fineandarts96@gmail.com">fineandarts96@gmail.com</a> or <a href="tel:+919889747766">+91 9889747766</a> so we can expedite a replacement.</li>
                    </ul>
                </section>

                <section className="policy-section">
                    <h2>7. International Shipping</h2>
                    <p>
                        We also ship globally! For international orders outside India, please contact our support team at <a href="mailto:fineandarts96@gmail.com">fineandarts96@gmail.com</a> or via WhatsApp at <a href="tel:+919889747766">+91 9889747766</a> for custom freight quotes, import duties, and transit timelines.
                    </p>
                </section>

                <section className="policy-section">
                    <h2>8. Contact Us</h2>
                    <p>
                        For tracking assistance or any shipping inquiries, get in touch with our customer team:
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

export default ShippingPolicy;
