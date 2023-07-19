import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { useAuthStore } from './store/auth';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashBoard } from './pages/product/DashBoard';
import AddProduct from './pages/product/AddProduct';
import { ProductsDelete } from './pages/product/ProductsDelete';
import { ParamsDelete } from './pages/param/ParamsDelete';
import EditProduct from './pages/product/EditProduct';
import { Params } from './pages/param/Params';
import AddParam from './pages/param/AddParam';
import EditParam from './pages/param/EditParam';
import { Sells } from './pages/sells/Sells';
import { AddSell } from './pages/sells/AddSell';
import { DeleteSells } from './pages/sells/DeleteSells';
import { Stores } from './pages/store/Stores';
import AddStore from './pages/store/AddStore';
import { DeleteStore } from './pages/store/DeleteStore';
import EditStore from './pages/store/EditStore';
import EditSells from './pages/sells/EditSells';
import { CssBaseline } from '@mui/material';
import { Navigation } from './components/Navigation';

function App() {
  const isAuth = useAuthStore(state => state.isAuth);

  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />

          <Route element={<><Navigation/> <ProtectedRoute isAllowed={isAuth} /></>}>
            <Route path='/products' element={<DashBoard />} />
            <Route path='/products/add' element={<AddProduct />} />
            <Route path='/products/delete/:id' element={<ProductsDelete />} />
            <Route path='/products/edit/:id' element={<EditProduct />} />

            <Route path='/categories' element={<Params />} />
            <Route path='/categories/add' element={<AddParam />} />
            <Route path='/categories/delete/:id' element={<ParamsDelete />} />
            <Route path='/categories/edit/:id' element={<EditParam />} />

            <Route path='/stores' element={<Stores />} />
            <Route path='/stores/add' element={<AddStore />} />
            <Route path='/stores/delete/:id' element={<DeleteStore />} />
            <Route path='/stores/edit/:id' element={<EditStore />} />

            <Route path='/sells' element={<Sells />} />
            <Route path='/sells/add' element={<AddSell />} />
            <Route path='/sells/delete/:id' element={<DeleteSells />} />
            <Route path='/sells/edit/:id' element={<EditSells />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
