import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import DetailsPage from './pages/DetailsPage';
import Layout from './components/Layout';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/movies/:id" element={<DetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
