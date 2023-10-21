/* eslint-disable react/prop-types */
import Sidebar from "../components/admin/Sidebar";
function AdminLayout(props) {
  return (
    <div className="flex">
      <Sidebar />
      {props.children}
    </div>
  );
}


export default AdminLayout;
