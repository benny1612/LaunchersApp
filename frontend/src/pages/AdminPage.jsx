import { Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex justify-center p-8">
      <nav >
        <Link 
          to="/RegisterPage" 
          className="px-6 py-2 hover:bg-gray-100 "
        >
          Register Page
        </Link>
        
        <Link 
          to="/UsersPage" 
          className="px-6 py-2 hover:bg-gray-100"
        >
          UsersPage
        </Link>
      </nav>
    </div>
  );
}
