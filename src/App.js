import './App.css';
import Header from './Pages/Shared/Header';
import Footer from './Pages/Shared/Footer';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Blogs from './Pages/Blogs/Blogs';
import Login from './Pages/Login/Login';
import NotFound from './Pages/NotFound/NotFound';
import Signup from './Pages/Signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UpdateProduct from './Pages/UpdateProduct/UpdateProduct';
import RequireAuth from './Utilities/RequireAuth';
import MyPortfolio from './Pages/MyPortfolio/MyPortfolio';
import AddProduct from './Pages/AddProduct/AddProduct';
import AllProducts from './Pages/AllProducts/AllProducts';
import ManageProducts from './Pages/ManageProducts/ManageProducts';
import Dashboard from './Pages/Dashboard/Dashboard';
import MyOrders from './Pages/MyOrders/MyOrders';
import Purchase from './Pages/Purchase/Purchase';
import EditProfile from './Pages/EditProfile/EditProfile';
import MyProfile from './Pages/MyProfile/MyProfile';
import AddReview from './Pages/AddReview/AddReview';
import ManageUser from './Pages/ManageUser/ManageUser';
import Welcome from './Pages/Dashboard/Welcome';
import ManageOrder from './Pages/ManageOrder/ManageOrder';
import Payment from './Pages/Payment/Payment';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/myPortfolio' element={<MyPortfolio />}></Route>
        <Route path='/allProducts' element={<AllProducts />}></Route>
        <Route path='/editProfile' element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }></Route>
        {/* dashboard===================== */}
        <Route path='/dashboard' element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }>
          <Route path='' element={
            <RequireAuth>
              <Welcome />
            </RequireAuth>
          }></Route>
          <Route path='manageProducts' element={
            <RequireAuth>
              <ManageProducts />
            </RequireAuth>
          }></Route>
          <Route path='addProduct' element={
            <RequireAuth>
              <AddProduct />
            </RequireAuth>
          }></Route>
          <Route path='updateProduct/:id' element={
            <RequireAuth>
              <UpdateProduct />
            </RequireAuth>
          }></Route>
          <Route path='manageUser' element={
            <RequireAuth>
              <ManageUser />
            </RequireAuth>
          }></Route>
          <Route path='manageOrder' element={
            <RequireAuth>
              <ManageOrder />
            </RequireAuth>
          }></Route>
          {/* customer------------------------ */}
          <Route path='myOrders' element={
            <RequireAuth>
              <MyOrders />
            </RequireAuth>
          }></Route>
          <Route path='payment/:id' element={
            <RequireAuth>
              <Payment />
            </RequireAuth>
          }></Route>
          <Route path='addReview' element={
            <RequireAuth>
              <AddReview />
            </RequireAuth>
          }></Route>
          <Route path='myProfile' element={
            <RequireAuth>
              <MyProfile />
            </RequireAuth>
          }></Route>
        </Route>

        <Route path='/product/:id' element={
          <RequireAuth>
            <Purchase />
          </RequireAuth>
        }></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/*' element={<NotFound />}></Route>
      </Routes>

      <Footer />

      <ToastContainer />
    </div>
  );
}

export default App;
