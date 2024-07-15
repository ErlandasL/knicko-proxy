import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Profile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }

        const response = await axios.get('http://127.0.0.1:4000/profile', {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        setEmail(response.data.user.email);
      } catch (error) {
        setError('Failed to fetch user info.');
        router.push('/login');
      }
    };

    fetchData();
  }, [router]);

  return (
    <div>
      <h2>Profile</h2>
      {error ? <p>{error}</p> : <p>Email: {email}</p>}
    </div>
  );
};

export default Profile;