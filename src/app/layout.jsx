import Header from '../components/Header';
import Footer from '../components/Footer';
import '@/app/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ToastContainer } from 'react-toastify';

export const metadata = {
  title: 'سامانه نوبت‌دهی آرایشگاه',
  description: 'سامانه آنلاین برای رزرو نوبت آرایشگاه',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </body>
    </html>
  );
}