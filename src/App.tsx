import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Admin from "./pages/Admin";
import AdminLogin from "./pages/Adminlogin";
import UserDetail from "./pages/UserDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
   <Router basename="/LinkTreeApp/">

      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/:slug" element={<UserDetail />} />
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </Router>
  );
}

export default App;
