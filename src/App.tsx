import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/:slug" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
