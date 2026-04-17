import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Unions from './pages/Unions';
import UnionDetail from './pages/UnionDetail';
import Apply from './pages/Apply';
import MyMembership from './pages/MyMembership';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import ReportDispute from './pages/ReportDispute';
import MyDisputes from './pages/MyDisputes';
import DisputeDetail from './pages/DisputeDetail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/unions" element={<Unions />} />
        <Route path="/unions/:id" element={<UnionDetail />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/membership" element={<MyMembership />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report-dispute" element={<ReportDispute />} />
        <Route path="/my-disputes" element={<MyDisputes />} />
        <Route path="/disputes/:id" element={<DisputeDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
