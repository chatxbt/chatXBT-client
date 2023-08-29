import { v4 as uuidv4 } from 'uuid';

export const generateUUID = () => {
    let id = uuidv4();
    return id;
};

/**
 * 
 * @param externalUrl 
 * @returns shortened link
 */
 export const shortenLinkT1 = ( externalUrl: string ) => {
    if(externalUrl) {
      return `${externalUrl.slice(0, 10)}...${externalUrl.slice(externalUrl.length-10)}`
    }
    return null;
}

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
}

export const customlocalStorage = (storageKey: string) => {
  const data: any = window?.localStorage.getItem(storageKey);
  return JSON.parse(data)?.state;
}

export const doesNotContainWord = (str: string, word: string) => {
  return str.indexOf(word) === -1;
}

// get bearer token
export const getAuthToken = () => customlocalStorage('connection-storage')?.token

// is user signed-in
export const isAuthed = () => !!customlocalStorage('connection-storage').token;
