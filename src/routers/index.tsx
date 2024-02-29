import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "shared/Footer/Footer";
import PageHome from "containers/PageHome/PageHome";
import SiteHeader from "containers/SiteHeader";
import FooterNav from "components/FooterNav";
import useWindowSize from "hooks/useWindowResize";
import ListingStayDetailPage from "containers/ListingDetailPage/listing-stay-detail/ListingStayDetailPage";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import ForgetLogin from "containers/ForgetPassword/ForgetPassword";
import SetOtp from "containers/ForgetPassword/otp";
import AccountPage from "containers/AccountPage/AccountPage";
import AccountPass from "containers/AccountPage/AccountPass";
import AccountBilling from "containers/AccountPage/AccountBilling";
import AccountSavelists from "containers/AccountPage/AccountSavelists";


export const pages: Page[] = [
  { path: "/detail", component: ListingStayDetailPage },
  { path: "/account", component: AccountPage },

  { path: "/account-savelists", component: AccountSavelists },

  { path: "/account-password", component: AccountPass },
  { path: "/account-billing", component: AccountBilling },

  { path: "/", component: PageHome },
  { path: "/login", component: PageLogin },
  { path: "/signup", component: PageSignUp },
  { path: "/verify", component: ForgetLogin },
  { path: "/verifyotp", component: SetOtp },
];

const MyRoutes = () => {
  let WIN_WIDTH = useWindowSize().width;
  if (typeof window !== "undefined") {
    WIN_WIDTH = WIN_WIDTH || window.innerWidth;
  }
  const isToken = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {pages.map(({ component, path }) => {
          const Component = component;
          return (
            <Route
              key={path}
              element={
                <>
                  <SiteHeader />
                  <Component />

                  <Footer />
                </>
              }
              path={path}
            />
          );
        })}
      </Routes>

      {WIN_WIDTH < 768 && <FooterNav />}
    </BrowserRouter>
  );
};

export default MyRoutes;
