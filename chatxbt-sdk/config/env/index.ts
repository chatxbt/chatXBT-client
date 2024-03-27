import Joi from 'joi';

const schema = Joi.object({
  ENV: Joi.string().valid('development', 'production').default('development'),
  DEBUG: Joi.boolean().default(false),
  NEXT_PUBLIC_CHATXBT_GAMIFY_BASE_URL: Joi.string(),
  NEXT_PUBLIC_CHATXBT_BASE_URL: Joi.string(),
})
  .unknown()
  .required();

const { error, value } = schema.validate({
  NEXT_PUBLIC_CHATXBT_GAMIFY_BASE_URL: process.env.NEXT_PUBLIC_CHATXBT_GAMIFY_BASE_URL,
  NEXT_PUBLIC_CHATXBT_BASE_URL: process.env.NEXT_PUBLIC_CHATXBT_GAMIFY_BASE_URL,
});

if (error) throw error;

export const env = value.ENV;
export const debug = env === 'development' || value.DEBUG;
export const chatXbtApiBaseUrl = value.NEXT_PUBLIC_CHATXBT_GAMIFY_BASE_URL;
export const aiChatBotUrl = value.NEXT_PUBLIC_CHATXBT_GAMIFY_BASE_URL;
export const referralUrl = 'https://missions.chatxbt.com?referral_code='