/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://udayvatti.com",
  generateRobotsTxt: false, // We manage robots.txt manually
  exclude: ["/demo"],
  changefreq: "monthly",
  priority: 0.7,
  sitemapSize: 5000,
};
