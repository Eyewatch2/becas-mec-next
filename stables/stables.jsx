
const isDevelopment = process.env.NODE_ENV === 'development';
const ENV_API_URL = process.env.NEXT_PUBLIC_CMS_URL

const API_URL = /* isDevelopment ? "http://localhost:3000/" :*/  ENV_API_URL ;

export const stables = {
    API_URL: `${API_URL}api/`,
    BASE_URL: `${API_URL}media/`
}
