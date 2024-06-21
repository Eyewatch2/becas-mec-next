
const isDevelopment = process.env.NODE_ENV === 'development';
const ENV_API_URL = process.env.NEXT_PUBLIC_CMS_URL

const API_URL = isDevelopment ? ENV_API_URL : ENV_API_URL;

export const stables = {
    API_URL: API_URL,
    BASE_URL: "https://becasmeccms.onrender.com/media/"
}
