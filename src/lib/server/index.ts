import nc, {NextHandler, Options} from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import {Session} from "next-session/lib/types";
import {MongoClient} from "mongodb";
import nextSession from "next-session";
import {promisifyStore} from "next-session/lib/compat";
import MongoStore from "connect-mongo";
import {SESSION_API} from "lib/env";


async function getMongoClient() {
    const mongoClient = new MongoClient(SESSION_API);
    await mongoClient.connect().catch(e => console.error(e));
    return mongoClient
}

const getSession = nextSession({
    store: promisifyStore(MongoStore.create({
        clientPromise: getMongoClient(),
        stringify: false,
    })),
    cookie: {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
        maxAge: 2 * 7 * 24 * 60 * 60
    },
    touchAfter: 1 * 7 * 24 * 60 * 60
});

async function getSessionWithMongo(
    req: NextApiRequest & {session?: Session},
    res: NextApiResponse,
    next: NextHandler
){
    try{
        await getSession(req,res).catch(e => console.log(e));
    } catch (e) {
        console.error(e)
    }
    next();
}

function onError(
    err: any,
    req: NextApiRequest & {session?: Session},
    res: NextApiResponse,
    next: NextHandler
) {
    console.error(err);
    res.status(500).end(err.toString());
}

function onNoMatch(
    req: NextApiRequest & {session?: Session},
    res: NextApiResponse
) {
    res.status(404).end("page is not found... or is it");
}

const nextConnectorOptions
    : Options<NextApiRequest & {session?: Session}, NextApiResponse> = {
    onError: onError,
    onNoMatch: onNoMatch,
    attachParams: true
}

const nextServerApiHandler = nc<NextApiRequest & {session?: Session}, NextApiResponse>(nextConnectorOptions);

nextServerApiHandler.use(getSessionWithMongo)


export default nextServerApiHandler