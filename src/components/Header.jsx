import { ChartNoAxesGantt, LogOut, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../redux/actionCreator';

export default function Header() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [logout, setLogout] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLogout(false);
      }
    }

    if (logout) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logout]);

  const handleMenu = () => {
    document.body.classList.toggle('expand');
    setIsExpanded(prev => !prev);
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  }




  return (
    <div className='main__header main__expanded'>
      <div className="menu">
        {isExpanded ? (
          <X onClick={handleMenu} size={24} />
        ) : (
          <ChartNoAxesGantt onClick={handleMenu} size={24} />
        )}
        <h4>Welcome back BAWC</h4>

      </div>
      <div className="leftItems relative" ref={dropdownRef}>
        <div className="logout" onClick={() => setLogout(!logout)}>
          <span></span>
          <img src="/assets/img/profile.jpg" alt="" />
        </div>

        {logout && (
          <div className="dropdown">
            <ul>
              <li onClick={handleLogout}>
                <LogOut size={18} /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
