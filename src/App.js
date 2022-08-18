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
import Products from './Pages/Products/Products';
import About from './Pages/About/About';

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/product/:id' element={
          <RequireAuth>
            <UpdateProduct />
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
