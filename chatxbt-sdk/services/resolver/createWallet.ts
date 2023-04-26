export const createWalletIntents = [
  {
    match:
      '(create|generate|make) a (new|fresh) wallet for me (now|immediately)',
  },
  {
    match:
      'i (want|need) you to (create|generate|make) (new|fresh) wallet for me',
  },
  {
    match: `if i {don't} have wallet before (create|generate|make) one for me`,
  },
  {
    match: `make new wallet for me`,
  },
  {
    match: `i want to create a new wallet`,
  },
  {
    match: `generate my wallet`,
  },
  {
    match: `create wallet`,
  },
  {
    match: `create new wallet`,
  },
];