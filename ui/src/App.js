import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import Helmet from 'react-helmet';
import Dashboard from './components/BillDashboard';
 
import ThemeProviderWrapper from './components/ThemeProviderWrapper.js';
 

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProviderWrapper>
        <Helmet>
          <title>Bill Manager</title>
          <meta name="description" content="Manage your monthly bills with ease." />
        </Helmet>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/add-bill" element={<BillForm />} />
            <Route path="/edit-bill/:id" element={<BillForm />} />
            <Route path="/charts" element={<Charts />} /> */}
          </Routes>
        </Router>
      </ThemeProviderWrapper>
    </Provider>
  );
};

export default App;