import React, { useEffect } from "react";
import Script from "next/script";
import TagManager from 'react-gtm-module';
import { credentials } from "@chatxbt-sdk/config";

const GoogleAnalytics = () => {
    const { googleAnalytics, googleTagManager } = credentials.google;

    useEffect(() => {
        TagManager.initialize({ gtmId: `${googleTagManager}` });
    }, []);
    
    return (
        <>
            <Script
                strategy="afterInteractive"
                id="analytics-url"
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`}
            />

            <Script
                strategy="afterInteractive"
                id="load-analytics"
                dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', '${googleAnalytics}', {
                        page_path: window.location.pathname,
                      });
                    `
                }}
            />
        </>
    );
};

export default GoogleAnalytics;