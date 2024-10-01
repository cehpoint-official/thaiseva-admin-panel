import { useEffect, useState } from "react";
import Dashboard from "../component/Dashboard";
import Sidebar from "../component/Sidebar";
import { useAuth } from "../../AuthContext";

const ResturantAdminHome = () => {
  const [show, setShow] = useState(window.innerWidth >= 600 ? true : false);
  const toggle = (e) => setShow(!show);
  const { currentUser } = useAuth();
  const userId = currentUser?.uid;
  useEffect(() => {
    document.title ='Thaiseva | Food Portal'
  }, [])
  return (
    <div className='flex items-start'>
      <Sidebar toggle={toggle} show={show} userId={userId} />
      <Dashboard toggle={toggle} show={show} />
    </div>
  );
};

export default ResturantAdminHome;
