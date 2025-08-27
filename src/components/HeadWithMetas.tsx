import React from "react";
import Head from "next/head";
import Safe from "react-safe";
import { MetaTags, Script } from "../functions/contentful";

interface HeadWithMetasProps extends MetaTags {
  title: string;
  description: string;
  image?: string;
  scripts?: Script[];
  noIndex?: boolean;
  canonical?: boolean;
  url?: string;
  children?: React.ReactNode;
  themeColor?: string;
}

const InBody = ({ children }) => ReactDOM.createPortal(children, document.body);

export const DynamicScripts = ({
  location,
  scriptUrl,
  inlineScript,
}: Script) => {
  const scripts = [
    scriptUrl && <script async url={scriptUrl}></script>,
    inlineScript && <Safe.script>{inlineScript}</Safe.script>,
  ];
  // location = Where to put the script.
  // true = head, false = body
  if (location) {
    return scripts;
  } else {
    return <InBody>{scripts}</InBody>;
  }
};

export const HeadWithMetas = ({
  title,
  description,
  url,
  image,
  scripts,
  noIndex,
  children,
  canonical,
  themeColor = "#6b21a8", // Tailwind purple-800
}: HeadWithMetasProps) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content={themeColor} />

      {noIndex && <meta name="googlebot" content="noindex" />}

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@labelbox" />
      <meta name="twitter:creator" content="@labelbox" />
      {url && <meta name="twitter:url" content={url} />}
      {image && <meta property="twitter:image" content={image} />}

      {canonical && <link rel="canonical" href={url} />}

      {children}

      {scripts && scripts.map(DynamicScripts)}
    </Head>
  );
};

export default HeadWithMetas;
