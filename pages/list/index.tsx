import {InferGetServerSidePropsType} from "next";
import {wrapper} from "lib/store";
import {getStayLogin} from "handler/common/token";
import ListPage from "view/page/list";
import {ParsedUrlQuery} from "querystring";

interface ListPageQuery extends ParsedUrlQuery {
    lat?: string;
    lng?: string;
    page?: string;
}

export const getServerSideProps = wrapper.getServerSideProps(
    store =>
        async context => {
            let query: ListPageQuery = context.query;
            const _map = (query.lat && query.lng)? {
                lat: parseFloat(query.lat),
                lng: parseFloat(query.lng)
            }: {};
            const _page = query.page? parseInt(query.page) : 1
            await getStayLogin(store,context);
            return{
                props: {
                    map: _map,
                    page: _page
                },
            }
        }
);

const _ListPage = ({map, page}: InferGetServerSidePropsType<typeof getServerSideProps>) =>{
    return (
        <div className="App">
            <ListPage map={map} page={page} />
        </div>
    )
}

export default _ListPage;

