import React from "react";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { Router } from "next/router";

const PageLoadProgressIndicator = ({ children }: any) => {
  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done(false);
  });

  NProgress.configure({ showSpinner: false });
  return <>{children}</>;
};

export default PageLoadProgressIndicator;
