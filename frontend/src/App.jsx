import { Routes, Route,useLocation} from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Home from './pages/home';
import './App.css';
import Navbar from './components/navbar'
import Footer from './components/footer.jsx'
import ProductDetails from './pages/productDetails';
import CategoryProducts from './pages/categoryProducts';
import Cart from './pages/cartItem';
import BuyNow from './pages/buyNow.jsx';
import OrderConfirmed from './pages/orderConfirmed';
import MyOrders from './pages/myOrder.jsx';
import AdminProducts from "./pages/admin";
import AdminLogin from './pages/adminLogin';
import AdminDashboard from './pages/adminDashboard';
import About from './pages/about'

function App() {
  const location = useLocation();
  const hideNavFooter = location.pathname.startsWith('/admin');

  return (
    <>
      
        <div className="flex flex-col min-h-screen">
            {!hideNavFooter && <Navbar />}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/category/:categoryName" element={<CategoryProducts />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/buy-now" element={<BuyNow />} />
                <Route path="/order-confirmed" element={<OrderConfirmed />} />
                <Route path="/my-orders" element={<MyOrders />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/about" element={<About/>}/>
              </Routes>
            </main>
            {!hideNavFooter && <Footer />}
        </div>
    </>
  );
}

export default App;
