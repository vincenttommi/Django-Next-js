import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/common/Header';

export const metadata = {
  title: "Hotel Management System",
  description: "Hotel Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Header/>
        {children}
      </body>
    </html>
  );
}
