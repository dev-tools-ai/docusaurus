// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const FaBeer = require("react-icons/fa");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Your E2E Automation Assistant",
  tagline:
    "Dev Tools uses visual AI to locate elements on the screen, without the need to dig into the code.",
  url: "https://dev-tools.ai",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "dev-tools-ai", // Usually your GitHub org/user name.
  projectName: "code",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  scripts: [
    {
      src: "/js/api_key.js",
      defer: true,
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve("./sidebars.js"),
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-Y1658XRC4L",
        },
        googleAnalytics: {
          trackingID: "UA-228116717-1",
          anonymizeIP: true,
        },
        blog: {
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "",
        logo: {
          alt: "DevTools Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "dropdown",
            position: "left",
            label: "Docs",
            to: "/",
            items: [
              {
                label: "Web UI",
                to: "/webui",
              },
              {
                label: "Cypress.io",
                to: "/category/tutorial---cypressio",
              },
              {
                label: "Selenium",
                to: "/category/tutorial---selenium",
              },
              {
                label: "Appium",
                to: "/category/tutorial---appium",
              },
              {
                label: "Playwright",
                to: "/category/tutorial---playwright",
              },
              {
                label: "Webdriver.io",
                to: "/category/tutorial---webdriverio",
              },
              {
                label: "API",
                to: "/api",
              },
            ],
          },
          {
            to: "blog",
            label: "Blog",
            position: "left",
          },
          {
            href: "https://github.com/dev-tools-ai",
            label: "GitHub",
            position: "left",
          },
          {
            position: "right",
            href: "https://smartdriver.dev-tools.ai",
            className: "button button--secondary button--lg",
            html: "SignUp/Login",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Get Started",
                to: "/",
              },
              {
                label: "Cypress.io",
                to: "/category/tutorial---cypressio",
              },
              {
                label: "Selenium",
                to: "/category/tutorial---selenium",
              },
              {
                label: "Appium",
                to: "/category/tutorial---appium",
              },
              {
                label: "Webdriver.io",
                to: "/category/tutorial---webdriverio",
              },
              {
                label: "API",
                to: "/api",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                to: "https://discord.gg/2J9WEYdq5C",
              },
              {
                label: "LinkedIn",
                to: "https://www.linkedin.com/company/dev-tools-ai",
              },
              {
                label: "Twitter",
                to: "https://twitter.com/DevToolsAI",
              },
              {
                label: "YouTube",
                to: "https://www.youtube.com/channel/UCuWA4yupjJ5YzMzEC-tUJfw",
              },
            ],
          },
        ],
        copyright: `Built in San Francisco, California<br>Backed By<br><img src="/img/y-combinator-logo-vector.svg" />`,
      },
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      prism: {
        //theme: require('prism-react-renderer/themes/dracula'),
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["java"],
      },
      metadata: [
        {
          name: "keywords",
          content:
            "developer tools, testing, test tools, test sdk, selenium, python selenium, broken selectors, fix css path, ai sdk, test ai, cypress.io, cypress testing",
        },
      ],
    }),
};

module.exports = config;
