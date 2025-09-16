import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from '@/context/AuthProvider'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/partials/Layout'
import NotFound from './pages/NotFound'
import LoginOrRegister from './pages/LoginOrRegister'
import Shared from './pages/Shared'
import About from './pages/About'
import Rabits from './pages/Rabits'
import { RabitProvider } from '@/context/RabitProvider'
import Toast from './components/Toast'
import Friends from './pages/Friends'
import Profile from './pages/Profile'

function Logout() {
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RabitProvider>
          <Toast />
          <Routes>
            {/* Layout-wrapped routes */}
            <Route element={<Layout />}>
              <Route
                path="/rabits"
                element={
                  <ProtectedRoute>
                    <Rabits />
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
              <Route
                path="/friends"
                element={
                  <ProtectedRoute>
                    <Friends />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Top-level routes */}
            <Route path="/logout" element={<Logout />} />
            <Route path="/login" element={<LoginOrRegister />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RabitProvider>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
