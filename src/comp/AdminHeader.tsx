import { MdEmail } from "react-icons/md";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";

function AdminHeader() {

  const handleLogout = async () => {
    await getAuth().signOut();
    window.location.href = "/auth/login";
  };;



  return (
    <div>
      <div className="relative">
        <header className="flex items-center justify-between h-[5rem] bg-gray-200 text-white px-2 lg:px-7">
          <Link to="/auth/dashboard/admin">
            <div className="flex items-center">
              <img
                src="/image/logo.png"
                alt="Logo"
                className=" w-[10rem] mr-1"
              />
            </div>
          </Link>
          <div className="flex items-center">
            <button className="rounded-full p-2 text-[1.4rem] text-black hover:text-gray-900">
              <MdEmail />
            </button>
            <button
              className="ml-4 text-black hover:text-gray-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default AdminHeader;
