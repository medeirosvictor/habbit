import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from '@/context/AuthProvider'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/partials/Layout'
import NotFound from './pages/NotFound'
import LoginOrRegister from './pages/LoginOrRegister'
import Shared from './pages/Shared'
import About from './pages/About'
import Activities from './pages/Activities'
import { ActivityProvider } from '@/context/ActivityProvider'

function Logout() {
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ActivityProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/activities"
                element={
                  <ProtectedRoute>
                    <Activities />
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
            </Route>
          </Routes>
        </ActivityProvider>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<LoginOrRegister />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
