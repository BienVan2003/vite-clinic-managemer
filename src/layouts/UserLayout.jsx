/* eslint-disable react/prop-types */
import Nav from '../components/common/Nav';
import Footer from '../components/common/Footer';
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
