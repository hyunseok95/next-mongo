import {InferGetServerSidePropsType} from "next";
import wrapper from "lib/store";
import {getStayLogin} from "handler/common/token";
import RoomPage from "view/page/room";
import {ParsedUrlQuery} from "querystring";

interface RoomPageQuery extends ParsedUrlQuery {
    roomId?: string;
}

export const getServerSideProps = wrapper.getServerSideProps(
    store =>
        async context => {
            let query: RoomPageQuery = context.query;
            const _roomId = query.roomId? parseInt(query.roomId) : undefined
            await getStayLogin(store,context);
            return{
                props: {
                    roomId: _roomId
                },
            }
        }
)

const _RoomPage = ({ roomId }: InferGetServerSidePropsType<typeof getServerSideProps>) =>{
    return (
        <div className="App">
            <RoomPage roomId={roomId} />
        </div>
    )
}

export default _RoomPage;

