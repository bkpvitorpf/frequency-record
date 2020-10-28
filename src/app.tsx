import React from 'react';
import { Router } from 'react-router-dom';
import { AuthProvider } from './contexts/auth';
import history from './history';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;