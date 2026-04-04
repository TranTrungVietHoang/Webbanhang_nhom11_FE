import { useState, useEffect } from 'react';

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          console.error('Error parsing user data:', e);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    // Lấy user khi component mount
    updateUser();

    // Listen for storage changes (khi đăng nhập/đăng xuất từ tab khác)
    window.addEventListener('storage', updateUser);

    return () => window.removeEventListener('storage', updateUser);
  }, []);

  return user;
};
