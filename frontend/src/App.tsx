import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from '@/context/auth/AuthProvider'
import ProtectedRoute from '@/components/ProtectedRoute'
import Layout from '@/partials/Layout'
import NotFound from './pages/NotFound'
import AuthPage from './pages/AuthPage'
import Shared from './pages/Shared'
import About from './pages/About'
import Habits from './pages/Habits'
import { HabitProvider } from '@/context/habit/HabitProvider'
import Toast from './components/Toast'
import Friends from './pages/Friends'
import Profile from './pages/Profile'
import { ToastProvider } from './context/toast/ToastProvider'
import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

function Logout() {
  const { logout } = useAuth()
  useEffect(() => {
    logout()
  }, [])
  return <Navigate to="/login" replace />
}

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
          <HabitProvider>
            <Toast />
            <Routes>
              {/* Layout-wrapped routes */}
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Habits />
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
              <Route path="/login" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HabitProvider>
        </BrowserRouter>
      </AuthProvider>
    </ToastProvider>
  )
}

export default App
