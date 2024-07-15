import { signOut } from 'next-auth/react';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    await signOut();
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;