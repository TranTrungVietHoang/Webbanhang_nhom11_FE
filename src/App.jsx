import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DiscountCodesPage from './pages/DiscountCodes/DiscountCodesPage';
import CustomerSupportChatPage from './pages/Chat/CustomerSupportChatPage';

function App() {
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<DiscountCodesPage />} />
        <Route path="/chat" element={<CustomerSupportChatPage />} />
      </Routes>
    </>
  );
}

export default App;
