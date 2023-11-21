import { v4 as uuidv4 } from "uuid";
import { credentials, envConfig } from "../../../config";
import SlackNotify from "slack-notify";

export const generateUUID = () => {
  let id = uuidv4();
  return id;
};

/**
 *
 * @param externalUrl
 * @returns shortened link
 */
export const shortenLinkT1 = (externalUrl: string) => {
  if (externalUrl) {
    return `${externalUrl.slice(0, 10)}...${externalUrl.slice(
      externalUrl.length - 10
    )}`;
  }
  return null;
};

// validate mail
export const validateMmailAddress = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// get number of days between two dates
export const daysDifference = (date_1: any, date_2: any) => {
  date_1 = new Date(date_1);
  date_2 = new Date(date_2);
  let difference = date_1.getTime() - date_2.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays;
};

export const customlocalStorage = (storageKey: string) => {
  const data: any = window?.localStorage.getItem(storageKey);
  return JSON.parse(data)?.state;
};

export const doesNotContainWord = (str: string, word: string) => {
  return str.indexOf(word) === -1;
};

// get bearer token
export const getAuthToken = () =>
  customlocalStorage("connection-storage")?.token;

// is user signed-in
export const isAuthed = () => !!customlocalStorage("connection-storage").token;

export const formatCurrency = (value: any) => {
  const trillion = 1000000000000; // 1 trillion
  if (value >= trillion) {
    const formattedValue = (value / trillion).toFixed(2); // Format to one decimal place
    return `$${formattedValue} Trillion`;
  } else {
    return `$${value.toFixed(2)} USD`;
  }
};

export const formatNumberWithMagnitude = (number: number) => {
  if (number >= 1e12) {
    return `$${(number / 1e12).toFixed(2)} Trillion`;
  } else if (number >= 1e9) {
    return `$${(number / 1e9).toFixed(2)} Billion`;
  } else if (number >= 1e6) {
    return `$${(number / 1e6).toFixed(2)} Million`;
  } else if (number >= 1e3) {
    return `$${(number / 1e3).toFixed(2)} Thousand`;
  } else {
    return `$${number.toFixed(2)}`;
  }
};

export const slackNotify = async ({
  message,
  channel,
}: {
  message: string;
  channel?: string;
}) => {
  const slack = SlackNotify(channel || credentials?.slackWebhooks?.defaultLog);
  await slack.send({
    channel: "#earnathon-support-telegram",
    text: `
    cfm-${envConfig.env} ===>>
    ${message}
    `,
    username: "ena-node-bot",
    icon_url: "https://earnathon.com/static/media/yellow-06.7e9ef266.svg",
  });
};
