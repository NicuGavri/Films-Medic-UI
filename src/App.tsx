import {
  Home,
  SignIn,
  SignUp,
  ForgotPassword,
  VerifyEmail,
  ResetPassword,
} from "./pages/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./context/theme/ThemeProvider";
import NotificationProvider from "./context/notification/NotificationProvider";
import AuthProvider from "./context/auth/AuthProvider";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <NotificationProvider>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route
                  path="/reset-password"
                  element={<ResetPassword />}
                ></Route>
                <Route path="*" element={<div>Not found</div>} />
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </NotificationProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
