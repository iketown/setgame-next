/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
require("dotenv").config();
const withSourceMaps = require("@zeit/next-source-maps")();
// On production, variables are set with `now secrets`. On development, they use the .env file

const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const {
  NEXT_PUBLIC_SENTRY_DSN: SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
  VERCEL_GITHUB_COMMIT_SHA,
  VERCEL_GITLAB_COMMIT_SHA,
  VERCEL_BITBUCKET_COMMIT_SHA,
} = process.env;

const COMMIT_SHA =
  VERCEL_GITHUB_COMMIT_SHA ||
  VERCEL_GITLAB_COMMIT_SHA ||
  VERCEL_BITBUCKET_COMMIT_SHA;

process.env.SENTRY_DSN = SENTRY_DSN;

module.exports = withSourceMaps({
  pageExtensions: ["js", "jsx", "md", "mdx", "tsx"],
  webpack: (config, options) => {
    // sentry config
    if (!options.isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }
    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      COMMIT_SHA &&
      NODE_ENV === "production"
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".next",
          ignore: ["node_modules"],
          urlPrefix: "~/_next",
          release: COMMIT_SHA,
        })
      );
    }

    // svg loader
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack", "url-loader"],
    });

    return config;
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
  },
});
