export default {
  /**
   * app credentials
   */
  app: {
    name: "CHATXBT",
  },

  /**
   * google credentials
   */
  google: {
    oauth: {
      clientId: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID,
      clientIdAuth: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    },
    captchaPublicKey: "6Ld6dr0kAAAAAAOIJZ8nNxgDW3t0CPWsTq4q2U9p",
    googleAnalytics: "G-VXG0VBFP39",
    googleTagManager: "GTM-5H6XPRK",
  },

  /**
   * Slack
   */
  slackWebhooks: {
    defaultLog: process.env.SLACK_WEBHOOK_URL,
    donations:
      "https://hooks.slack.com/services/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",
    errors: process.env.SLACK_WEBHOOK_URL,
    campaign:
      "https://hooks.slack.com/services/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",
  },
};
