import {useState} from 'react';
import {alpha, styled} from "@mui/material/styles";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useAppSelector} from "lib/store";

interface CustomButtonProps {
    state?: string;
}
const CustomButton = styled(Button)<CustomButtonProps>(({theme, state}) => ({
    fontSize: "1rem",
    color: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: `${state === "home" ? alpha(theme.palette.primary.main, 0.25) :
            alpha(theme.palette.secondary.main, 0.25)}`,
    }
}))

const HostMenu = () => {
    const navbar = useAppSelector(state => state.navbar);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box component="span">
            <CustomButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                state={ navbar.state}
            >
                호스트
            </CustomButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>메뉴 1</MenuItem>
                <MenuItem onClick={handleClose}>메뉴 2</MenuItem>
                <MenuItem onClick={handleClose}>메뉴 3</MenuItem>
            </Menu>
        </Box>
    );
}

export default HostMenu;

