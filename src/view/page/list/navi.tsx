import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import PaginationItem from '@mui/material/PaginationItem';
import {useAppSelector} from "lib/store";


const Navi = () => {
    const state = useAppSelector(state => state.list_page);

    return(
        <Pagination
            count={10}
            page={state.page? state.page : 1}
            size="large"
            color="primary"
            renderItem={(item) => (
                <Link href={`/list?lat=${state.map.lat}&lng=${state.map.lng}&page=${item.page}`}>
                    <PaginationItem
                        {...item}
                        sx={{ m: "0 2rem"}}
                    />
                </Link>
            )}
            sx={{m:'0 auto', mt:4}}/>
    )
}

export default Navi;
