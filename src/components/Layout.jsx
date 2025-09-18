import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="grid-container">
      <Sidebar />
      <main className="main__expanded w-[calc(100%-24rem)] ml-auto mr-8">
        <Header />
        <div className="main__tab">
          <Outlet />
        </div>

      </main>
    </div>
  );
};

export default Layout;
