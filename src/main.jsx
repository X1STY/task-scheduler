import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx';
import { AuthProvider } from './context/AuthProvider.jsx';

import './assets/global.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  <QueryClientProvider client={queryClient}>  

    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>    
    </BrowserRouter>
  </QueryClientProvider>
  </>
)


