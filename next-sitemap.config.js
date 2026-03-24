/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com",
  generateRobotsTxt: false,
  exclude: ["/dashboard/*", "/dashboard"],
  generateIndexSitemap: false,
};
