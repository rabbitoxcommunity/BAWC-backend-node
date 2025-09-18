import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyToken } from '../redux/actionCreator';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // VERIFY


  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        dispatch(verifyToken((res) => {
          if (!res.ok) {
            localStorage.removeItem("token");
            navigate("/login");
          }
        }))
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verify();
  }, [navigate]);
  
  return (
    <div></div>
  )
}
