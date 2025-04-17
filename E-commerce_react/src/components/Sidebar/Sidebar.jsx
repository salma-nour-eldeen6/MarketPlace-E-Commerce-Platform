import { FiChevronRight } from "react-icons/fi";
import "./Sidebar.css"; // تأكد أن المسار صحيح

const Sidebar = () => {
  const categories = [
    { name: "Woman's Fashion", id: "womens-fashion" },
    { name: "Men's Fashion", id: "mens-fashion" },
    { name: "Electronics", id: "electronics" },
    { name: "Home & Lifestyle", id: "home-lifestyle" },
    { name: "Medicine", id: "medicine" },
    { name: "Sports & Outdoor", id: "sports-outdoor" },
    { name: "Babys & Toys", id: "babys-toys" },
    { name: "Groceries & Pets", id: "groceries-pets" },
    { name: "Health & Beauty", id: "health-beauty" }
  ];

  const deals = [
    {
      title: "iPhone 14 Series",
      discount: "Up to 10% off Voucher",
      cta: "Shop Now →",
      link: "/products/iphone-14" // Example product link
    }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-menu">
        <h3 className="sidebar-title">Categories</h3>
        
        <ul className="category-list">
          {categories.map((category, index) => (
            <li 
              key={index}
              className="category-item"
              onClick={() => scrollToSection(category.id)}
            >
              <span>{category.name}</span>
              <FiChevronRight className="chevron-icon" />
            </li>
          ))}
        </ul>
      </div>

      {/* <div className="sidebar-deals">
        <h3 className="deals-title">Hot Deals</h3>
        
        {deals.map((deal, index) => (
          <a key={index} href={deal.link} className="deal-card">
            <h4 className="deal-title">{deal.title}</h4>
            <p className="deal-discount">{deal.discount}</p>
            <span className="deal-button">
              {deal.cta}
            </span>
          </a>
        ))}
      </div> */}
    </div>
  );
};

export default Sidebar;