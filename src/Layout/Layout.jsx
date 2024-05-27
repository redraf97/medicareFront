import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../Routes/Routers";
const Layout = () => {
  return (
    <div className="hou">
      <Header />
      <main />
      <Routers />
      <main />
      <Footer />
    </div>
  );
};

export default Layout;

/*<Header />
<main />
<Routers />
<main />
<Footer />*/
