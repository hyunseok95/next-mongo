const ENV_BACK = {
    HOST: process.env.KOTYPE_BACK_HOST? process.env.KOTYPE_BACK_HOST : "localhost",
    PORT: process.env.KOTYPE_BACK_PORT? process.env.KOTYPE_BACK_PORT : 8080
}

const ENV_SESSION = {
    HOST: process.env.KOTYPE_SESSION_HOST? process.env.KOTYPE_SESSION_HOST : "localhost",
    PORT: process.env.KOTYPE_SESSION_PORT? process.env.KOTYPE_SESSION_PORT : 8080,
    USER: process.env.KOTYPE_SESSION_USER? process.env.KOTYPE_SESSION_USER: "root",
    PASSWORD: process.env.KOTYPE_SESSION_PASSWORD? process.env.KOTYPE_SESSION_PASSWORD: 1234,
}

export const BACK_API = `http://${ENV_BACK.HOST}:${ENV_BACK.PORT}`
export const SESSION_API = `mongodb://${ENV_SESSION.USER}:${ENV_SESSION.PASSWORD}@${ENV_SESSION.HOST}:${ENV_SESSION.PORT}/?authSource=admin`
export const AWS_S3_API = `http://${process.env.NEXT_PUBLIC_AWS_S3_HOST}`
export const MAP_APIKEY = `${process.env.NEXT_PUBLIC_MAP_APIKEY}`
export const IS_DEV = process.env.NODE_ENV !== "production";

