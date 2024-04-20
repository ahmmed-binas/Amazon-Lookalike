import React from 'react';
import './ProductGuidesSection.css';

const guides = {
    "Fashion": [
        { title: "Essential Wardrobe Pieces", description: "Must-have clothing items for every wardrobe.", link: "https://www.vogue.com/article/vogue-wardrobe-essentials-guide" },
        { title: "Choosing the Right Accessories", description: "Tips for accessorizing your outfits like a pro.", link: "https://haydenhill.co/blogs/journal/matching-accessories?utm_source=geolocation&utm_medium=website&utm_content=relocated-from-us" },
        { title: "Mixing Patterns and Textures", description: "How to create stylish outfits with pattern and texture combinations.", link: "https://thehomestylist.org/home-styling-101-mixing-patterns-and-textures/" },
        { title: "Dressing for Your Body Type", description: "Flattering fashion tips tailored to your unique body shape.", link: "https://www.stitchfix.com/women/blog/fashion-tips/find-fit-for-your-body-type/" }
    ],
    "Hair Care": [
        { title: "Hair Care Basics", description: "Essential tips for maintaining healthy hair.", link: "https://gisou.com/blogs/blog/hair-care-routine-steps" },
        { title: "Styling Techniques for Different Hair Types", description: "How to style your hair based on its texture and length.", link: "https://www.lorealparisusa.com/beauty-magazine/hair-care/all-hair-types/best-hair-care-tips" },
        { title: "DIY Hair Masks for Nourished Locks", description: "Natural hair mask recipes to promote hair health and shine.", link: "https://theorganibrands.com/blogs/news/diy-hair-masks-for-natural-hair-nourish-strengthen-and-revitalize-your-locks" },
        { title: "Preventing Common Hair Problems", description: "Tips to prevent split ends, breakage, and other hair issues.", link: "https://www.bing.com/search?q=Preventing+Common+Hair+Problems&cvid=26aa3d674b3443a1aeec17889bd8ea82&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBBzQyMmowajSoAgCwAgA&FORM=ANAB01&PC=U531" }
    ],
 
};

function ProductGuidesSection() {
    return (
        <div className="product-guides-section">
            <h2 className="section-title">Product Guides</h2>
            <div className="guides-container">
                {Object.keys(guides).map(category => (
                    <div key={category}>
                        <h3 className="category-title">{category}</h3>
                        <div className="guide-list">
                            {guides[category].map((guide, index) => (
                                <div key={index} className="guide-item">
                                    <h4 className="guide-title">{guide.title}</h4>
                                    <p className="guide-description">{guide.description}</p>
                                    <a href={guide.link} className="guide-link">Read Guide</a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductGuidesSection;
