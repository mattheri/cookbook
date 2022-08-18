import AuthLayout from "auth/components/AuthLayout";
import AppLayout from "common/components/AppLayout";
import MainLayout from "common/components/MainLayout";
import SuspenseWithLoading from "common/components/SuspenseWithLoading";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import StorageLayout from "storage/components/StorageLayout";
import routes from "./routes";

const LoginPage = lazy(() => import("auth/page/LoginPage"));
const LogoutPage = lazy(() => import("auth/page/LogoutPage"));
const RedirectToLogin = lazy(() => import("auth/page/RedirectToLogin"));
const SignupPage = lazy(() => import("auth/page/SignupPage"));
const StoragesPage = lazy(() => import("storage/page/StoragesPage"));

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path={routes.catchAll}
          element={
            <SuspenseWithLoading>
              <RedirectToLogin />
            </SuspenseWithLoading>
          }
        />
        <Route element={<AuthLayout />}>
          <Route
            path={routes.login}
            element={
              <SuspenseWithLoading>
                <LoginPage />
              </SuspenseWithLoading>
            }
          />
          <Route
            path={routes.logout}
            element={
              <SuspenseWithLoading>
                <LogoutPage />
              </SuspenseWithLoading>
            }
          />
          <Route
            path={routes.signup}
            element={
              <SuspenseWithLoading>
                <SignupPage />
              </SuspenseWithLoading>
            }
          />
        </Route>
        <Route element={<AppLayout />}>
          <Route element={<StorageLayout />}>
            <Route
              path={routes.storage}
              element={
                <SuspenseWithLoading>
                  <StoragesPage />
                </SuspenseWithLoading>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
