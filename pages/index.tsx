import {wrapper} from "lib/store";
import {getStayLogin} from "handler/common/token";
import HomePage from "view/page/home";

export const getServerSideProps = wrapper.getServerSideProps(
    store =>
        async context => {
            await getStayLogin(store,context);
            return{
                props: {},
            }
        }
)

const _HomePage = () =>{
    return (
        <div className="App">
            <HomePage />
        </div>
    )
}

export default _HomePage;

