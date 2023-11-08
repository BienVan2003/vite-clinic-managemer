/* eslint-disable react/prop-types */
import Sidebar from "../components/Sidebar";
function AdminLayout(props) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="p-4 flex-1">
      {props.children}
      </div>
    </div>
  );
}


export default AdminLayout;
