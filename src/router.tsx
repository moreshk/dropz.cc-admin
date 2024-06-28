import { SignIn } from "./page/sign-In";
import { Signup } from "./page/sign-up";
import { Dashboard } from "./page/dashboard";
import { ProtectedRoute } from "./components/providers/protected-route";
import { UnprotectedRoute } from "./components/providers/unprotected-route";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Token } from "./page/tokens/tokens";
import { Widget } from "./page/widget";
import { SideBar } from "./components/layout/sidebar";
import { Referral } from "./page/referral";

export const RouterRouterDom = () => (
  <Router>
    <Routes>
      <Route
        path="sign-in"
        element={
          <UnprotectedRoute>
            <SignIn />
          </UnprotectedRoute>
        }
      />
      <Route
        path="sign-up"
        element={
          <UnprotectedRoute>
            <Signup />
          </UnprotectedRoute>
        }
      />
      <Route
        index
        element={
          <UnprotectedRoute>
            <SignIn />
          </UnprotectedRoute>
        }
      />
      <Route path="/" element={<SideBar />}>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="tokens"
          element={
            <ProtectedRoute>
              <Token />
            </ProtectedRoute>
          }
        />
        <Route
          path="widgets"
          element={
            <ProtectedRoute>
              <Widget />
            </ProtectedRoute>
          }
        />
        <Route
          path="referral"
          element={
            <ProtectedRoute>
              <Referral />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  </Router>
);
