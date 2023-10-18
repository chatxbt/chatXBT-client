import React, {useState, useEffect} from "react";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { Router } from "next/router";

const PageLoadProgressIndicator = ({ children }: any) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])

  Router.events.on("routeChangeStart", (url) => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", (url) => {
    NProgress.done(false);
  });

  NProgress.configure({ showSpinner: false });
  return <>{mounted && children}</>;
};

export default PageLoadProgressIndicator;
