import React from "react";
import Head from "next/head";

const SITE_URL = "https://udayvatti.com";

interface HeadWithMetasProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
  url?: string;
  children?: React.ReactNode;
  themeColor?: string;
}

export const HeadWithMetas = ({
  title,
  description,
  url,
  image,
  noIndex,
  children,
  themeColor = "#0a0a0a",
}: HeadWithMetasProps) => {
  const absoluteUrl = url ? (url.startsWith("http") ? url : `${SITE_URL}${url}`) : SITE_URL;
  const absoluteImage = image
    ? image.startsWith("http")
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}/images/uv-port.png`;

  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content={themeColor} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <link rel="canonical" href={absoluteUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Uday Vatti" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={absoluteUrl} />
      <meta name="twitter:image" content={absoluteImage} />

      {children}
    </Head>
  );
};

export default HeadWithMetas;
