import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Protectedroute = ({ children }) => {
   const { user } = useSelector((store) => store.auth);
   const navigate = useNavigate();

   useEffect(() => {
       if (!user) {
           navigate('/login'); // Redirect to login if user is null
       }
   }, [user, navigate]); // Add user and navigate as dependencies

   if (!user) {
       return null; // Prevent rendering children if user is null
   }

   return <>{children}</>;
};

export default Protectedroute;