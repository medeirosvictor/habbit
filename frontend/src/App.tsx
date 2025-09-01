import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from '@/context/AuthProvider'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/partials/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import LoginOrRegister from './pages/LoginOrRegister'
import Shared from './pages/Shared'
import About from './pages/About'

function Logout() {
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<Layout />}>
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shared"
              element={
                <ProtectedRoute>
                  <Shared />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/signin" element={<LoginOrRegister />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
