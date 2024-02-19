// pages/api/fetchLogo.js

import type { NextApiRequest, NextApiResponse } from "next";
type Data = {
  url?: string;
  error?: string;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) => {
  const { url } = req.query;
  console.log(url);
  // if (!url) {
  //   return res.status(400).json({ error: 'URL parameter is required' });
  // }

  // try {
  //   const response = await fetch(url);
  //   const html = await response.text();
  //   res.setHeader('Content-Type', 'text/html');
  //   res.status(200).send(html);
  // } catch (error) {
  //   console.error('Error fetching logo:', error);
  //   res.status(500).send('Error fetching logo');
  // }
  res.status(200).json({ url: url });
};
