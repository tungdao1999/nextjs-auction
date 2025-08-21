import axios from "axios";
import { getSession } from "./sessionStore";

export async function createServerAxios(request: Request) {

    const axiosInstance = axios.create(
        {
            baseURL: process.env.BACKEND_URL
        }
    );

    axiosInstance.interceptors.request.use(async config => {
        // Extract cookie from the original request, not from config.headers
        const cookieHeader = request.headers.get('cookie') as string | undefined;

        const cookie = cookieHeader?.split('; ').find(c => c.startsWith('sessionId='));

        if (!cookie) {
            // You can throw an error or handle unauthorized here
            return Promise.reject({ response: { status: 401, data: { error: "Not logged in" } } });
        }

        const sessionId = cookie.split("=")[1];
        const session = await getSession(sessionId);
        if (!session) {
            return Promise.reject({ response: { status: 401, data: { error: "Session expired" } } });
        }
        console.log("Session validated:", session);
        // Attach Authorization header
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${session.accessToken}`
            config.headers['Content-Type'] = 'application/json';
        }

        return config;
    });
    return axiosInstance;
}