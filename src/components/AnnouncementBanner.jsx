import React from 'react';

const AnnouncementBanner = () => {
    const announcements = [
        "Get In Touch with Our Sales Agent : +91 0000000000",
        "Customisation Available",
        "Additional 10% Off On Prepaid Orders",
        "Get 50% Off On All Products",
        "International Shipping Available"
    ];

    return (
        <div className="announcement-bar">
            <div className="announcement-content">
                {/* Double the list to create a seamless loop */}
                {[...announcements, ...announcements].map((text, index) => (
                    <span key={index} className="announcement-item">
                        {index % 2 === 0 ? '📞' : index % 3 === 0 ? '🎁' : index % 4 === 0 ? '✂️' : '✈️'} {text}
                    </span>
                ))}
            </div>
            <style>{`
                .announcement-bar {
                    background-color: #f0f0f0;
                    color: #333;
                    padding: 10px 0;
                    font-size: 0.85rem;
                    font-family: var(--font-sans);
                    overflow: hidden;
                    white-space: nowrap;
                    border-bottom: 1px solid #e0e0e0;
                }
                .announcement-content {
                    display: inline-block;
                    animation: marquee 30s linear infinite;
                }
                .announcement-item {
                    display: inline-flex;
                    align-items: center;
                    margin-right: 50px;
                    font-weight: 500;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .announcement-bar:hover .announcement-content {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};

export default AnnouncementBanner;
