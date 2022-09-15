import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Componants/Navbar/Navbar";
import TelPlastic from "./Pages/TelPlastic/TelPlastic";
import Upload from "./Pages/Upload/Upload";
import Footer from "./Componants/Footer/Footer";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AuthProvider from "./Context/AuthProvider/AuthProvider";
import Cart from "./Pages/Cart/Cart";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import CheckOut from "./Pages/CheckOut/CheckOut";
import Payment from "./Pages/Payment/Payment";
import MyOrders from "./Pages/MyOrders/MyOrders";
import ProductProvider from "./Context/ProductProvider/ProductProvider";
import Dashboard from "./Pages/Dashboard/Dashboard/Dashboard";
import AllOrders from "./Pages/Dashboard/AllOrders/AllOrders";
import AllAdmins from "./Pages/Dashboard/AllAdmins/AllAdmins";
import UserRoutes from "./ProtectedRoutes/UserRoutes";
import GuestRoutes from "./ProtectedRoutes/guestRoute";
import AdminRoutes from "./ProtectedRoutes/AdminRoute";
import AllProducts from "./Pages/Dashboard/AllProducts/AllProducts";
import UpdateProduct from "./Pages/Dashboard/UpdateProduct/UpdateProduct";
import Unpaid from "./Pages/Dashboard/Unpaid/Unpaid";
import Paid from "./Pages/Dashboard/Paid/Paid";

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<Navigate to={"/tel-plastic"}></Navigate>}
            ></Route>
            <Route path="/tel-plastic" element={<TelPlastic />}></Route>
            <Route path="/login" element={<GuestRoutes><Login /></GuestRoutes>}></Route>
            <Route path="/register" element={<GuestRoutes><Register /></GuestRoutes>}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/productdetails/:id"
              element={<ProductDetails />}
            ></Route>
            <Route path="/checkout" element={<UserRoutes><CheckOut /></UserRoutes>}></Route>
            <Route path="/payment/:id" element={<UserRoutes><Payment /></UserRoutes>}></Route>
            <Route path="/myorders" element={<UserRoutes><MyOrders /></UserRoutes>}></Route>
            <Route path="/dashboard" element={<AdminRoutes><Dashboard /></AdminRoutes>}>
              <Route path="add-product" element={<Upload />}></Route>
              <Route path="" element={<AllOrders />}></Route>
              <Route path="unpaid-orders" element={<Unpaid />}></Route>
              <Route path="paid-orders" element={<Paid />}></Route>
              <Route path="all-admins" element={<AllAdmins/>}></Route>
              <Route path="all-products" element={<AllProducts/>}></Route>
              <Route path="update/:id" element={<UpdateProduct/>}></Route>
            </Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
