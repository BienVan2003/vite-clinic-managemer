/* eslint-disable react/prop-types */
import Nav from '../components/Nav';
import Footer from '../components/Footer';
function UserLayout(props) {
  return (
    <div>
      <Nav />
      {props.children}
      <Footer/>
    </div>
  );
}

export default UserLayout;
