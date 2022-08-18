import AddProduct from "product/components/AddProduct";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <AddProduct />
      <Outlet />
    </>
  );
};

export default AppLayout;
