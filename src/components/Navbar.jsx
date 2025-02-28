import { useState, useContext, useRef, useEffect } from 'react'; // Add useRef and useEffect
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/auth.context';
import bag from '../assets/bag-2.png';
import search from '../assets/search-normal.png';
import userIcon from '../assets/user.png';
import logo2 from '../assets/logo2.png';
import Cart from "../pages/Cart";
import { SearchBar } from './SearchBar';

function Navbar({ onClick, transparent }) {
  const [showSearch, setShowSearch] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartQuantity } = useContext(CartContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  // Ref for the search bar container
  const searchBarRef = useRef(null);

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
        setShowSearch(false); // Close the search bar
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="p-4 relative">
      {/* Logo */}
      <Link
        to="/"
        className="absolute left-1/2 transform -translate-x-1/2 text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 hover:text-orange-600 z-10"
      >
        <div className="flex items-center gap-2">
          <img src={logo2} alt="FloralBouquet logo" className="w-auto h-10 sm:h-14 md:h-16" />
          <h1>FloralBouquet</h1>
          <img src={logo2} alt="FloralBouquet logo2" className="w-auto h-10 sm:h-14 md:h-16" />
        </div>
      </Link>

      {/* Icons */}
      <div className="absolute right-4 sm:right-8 md:right-10 flex gap-3 sm:gap-5 md:gap-6 z-10">
        {/* Search Icon */}
        <img
          src={search}
          alt="search"
          onClick={() => setShowSearch(!showSearch)}
          className="cursor-pointer w-6 sm:w-7 md:w-8"
        />

        {/* User Icon */}
        <Link to={isLoggedIn ? "/account" : "/login"}>
          <img
            src={user?.photoURL || userIcon}
            alt="user"
            className="cursor-pointer w-6 sm:w-7 md:w-8"
          />
        </Link>

        {/* Cart Icon */}
        <div className="relative">
          <img
            src={bag}
            alt="cart"
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="cursor-pointer w-6 sm:w-7 md:w-8"
          />

          {/* Cart Badge */}
          {cartQuantity > 0 && (
            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartQuantity}
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div
          ref={searchBarRef}
          className="absolute right-4 sm:right-8 md:right-10 top-16 shadow-md rounded-lg p-2 w-64 sm:w-80 md:w-96 z-50 bg-white"
        >
          <SearchBar onResultClick={() => setShowSearch(false)} />
        </div>
      )}

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Navbar Links */}
      <ul className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 md:gap-5 list-none p-2 text-lg mt-12 sm:mt-14 md:mt-16 z-20 absolute left-0 right-0">
        <li>
          <Link to="/AllBouquet" className="text-gray-800 hover:text-orange-600">
            Bouquet
          </Link>
        </li>
        <li>
          <Link to="/Valentine-bouquet" className="text-gray-800 hover:text-orange-600">
            Valentine's Day
          </Link>
        </li>
        <li>
          <Link to="/Wedding-bouquet" className="text-gray-800 hover:text-orange-600">
            Wedding
          </Link>
        </li>
        <li>
          <Link to="/Gift-bouquet" className="text-gray-800 hover:text-orange-600">
            Gift
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;