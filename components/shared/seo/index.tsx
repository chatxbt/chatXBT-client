import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

interface SEOProps {
  title: string;
  description: string;
  image?: any;
}

const AppSeo = ({ title, description, image }: SEOProps) => {
  const router = useRouter();
  const domain = "https://www.chatxbt.com";
  const url = router && router.asPath ? router.asPath : undefined;
  // const canonical = url && url === "/" ? domain : domain + url;
  const canonical = domain + url;
  const type = "website";
  const appAddress = "";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:title" content={title} key="ogtitle" />
        <meta
          property="og:image"
          itemProp="image"
          content={image}
          key="ogimage"
        />
        <meta property="og:image:alt" content={title} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:type" content={type} key="ogtype" />
        <meta property="og:description" content={description} key="ogdesc" />
        <meta property="og:url" content={canonical} key="ogurl" />
        <meta name="og:site_name" content={domain} key="ogsitename" />
        <meta name="robots" content="index, follow" />
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:title" content={title} key="twitter:title" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:description"
        />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:url" content={canonical} />
        <meta
          name="twitter:site"
          content={`${appAddress}`}
          key="twitter:site"
        />
        <meta
          name="twitter:creator"
          content={`${appAddress}`}
          key="twitter:title"
        />
        <link href={canonical} rel="canonical" />
        {/* <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" /> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css"
        /> */}
      </Head>
    </>
  );
};

export default AppSeo;
