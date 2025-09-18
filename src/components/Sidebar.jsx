import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Image, LayoutList, ShoppingCart, Target } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const menuItems = [
    {
      name: 'Banner',
      icon: <Image width={18} />,
      routes: [
        { path: '/manage-banners', label: 'Manage Banners' },
        { path: '/add-banner', label: 'Add Banner' },
      ],
    },
    {
      name: 'Category',
      icon: <LayoutList width={18} />,
      routes: [
        { path: '/manage-category', label: 'Manage Category' },
        { path: '/add-category', label: 'Add Category' },
      ],
    },
    {
      name: 'Brands',
      icon: <Target width={18} />,
      routes: [
        { path: '/manage-brands', label: 'Manage Brands' },
        { path: '/add-brand', label: 'Add Brand' },
      ],
    },
        {
      name: 'Products',
      icon: <ShoppingCart width={18} />,
      routes: [
        { path: '/manage-products', label: 'Manage Products' },
        { path: '/add-product', label: 'Add Product' },
      ],
    },
  ];

  useEffect(() => {
    const activeMenu = menuItems.find((menu) =>
      menu.routes.some((route) => route.path === location.pathname)
    );
    if (activeMenu) {
      setOpenDropdown(activeMenu.name);
    }
  }, [location.pathname]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <aside className="w-80 h-screen overflow-y-auto p-5 border-1 fixed bg-white text-white flex flex-col mb-5 z-999 border-gray-100 border-l-1 x-translate">
      {/* Logo */}
      <div className="pb-10 mb-10 text-2xl font-bold border-b border-gray-100 text-center">
        <img src="/assets/img/logo.avif" alt="Logo" className="mx-auto h-15 mb-3 filter-black" />
      </div>

      <nav className="sidebar flex-1 overflow-y-auto space-y-2">
        {menuItems.map((menu) => {
          const isActive = menu.routes.some((route) => location.pathname === route.path);
          return (
            <div key={menu.name}>
              <button
                onClick={() => toggleDropdown(menu.name)}
                className={`sidebarBtn w-full text-gray-800 text-right flex items-center justify-between p-2 hover:bg-gray-200 ${isActive ? 'active' : ''
                  }`}
              >
                <span>{menu.icon} {menu.name}</span>
                {openDropdown === menu.name ? <ChevronUp className='arrow' size={18} /> : <ChevronDown className='arrow' size={18} />}
              </button>
              {openDropdown === menu.name && (
                <ul className="pl-4 pr-2 space-y-1 sidemenuLists">
                  {menu.routes.map((route) => (
                    <NavLink key={route.path} to={route.path}>
                      <li
                        className={`text-gray-800 cursor-pointe`}
                      >
                        {route.label}
                      </li>
                    </NavLink>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;