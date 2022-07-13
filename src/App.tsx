import { ROUTES } from "configs/routes";
import Login from "modules/auth/pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import HOCLayout from "HOCLayout/HOCLayout";
import ManageUser from "modules/adminUser/pages/ManageUserPage/ManageUserPage";
import NewUser from "modules/adminUser/pages/NewUserPage/NewUserPage";
import DetailUser from "modules/adminUser/pages/DetailUserPage/DetailUserPage";
import ManageProductPage from "modules/adminProduct/pages/ManageProductPage/ManageProductPage";
import NewProductPage from "modules/adminProduct/pages/NewProductPage/NewProductPage";
import DetailProductPage from "modules/adminProduct/pages/DetailProductPage/DetailProductPage";
import PrivateRoute from "PrivateRoute/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.login} element={<Login />} />
      <Route
        path={ROUTES.manageUser}
        element={
          <PrivateRoute>
            <HOCLayout>
              <ManageUser />
            </HOCLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.newUser}
        element={
          <PrivateRoute>
            <HOCLayout>
              <NewUser />
            </HOCLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={`${ROUTES.detailUser}/:id`}
        element={
          <PrivateRoute>
            <HOCLayout>
              <DetailUser />
            </HOCLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.manageProduct}
        element={
          <PrivateRoute>
            <HOCLayout>
              <ManageProductPage />
            </HOCLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.newProduct}
        element={
          <PrivateRoute>
            <HOCLayout>
              <NewProductPage />
            </HOCLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={`${ROUTES.detailProduct}/:id`}
        element={
          <PrivateRoute>
            <HOCLayout>
              <DetailProductPage />
            </HOCLayout>
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
