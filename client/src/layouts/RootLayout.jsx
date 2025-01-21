import { Outlet } from "react-router-dom";
import { Footer, Header, ScrollToTop } from "../components";

const RootLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default RootLayout;