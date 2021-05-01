import { Navbar } from 'components/organisms';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default Layout;
