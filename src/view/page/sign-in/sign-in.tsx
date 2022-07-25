import Link from "next/link";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {useAppSelector} from "lib/store";
import {getPayloadProps} from "lib/store/reducer";
import {getUser} from "handler/common/user";
import {patchUser} from "state/common/user";

const SignIn = () => {
    const user = useAppSelector(state=> state.user);
    const dispatch = useDispatch();
    const router = useRouter();

    return(
        <Box sx={{
            width:"30rem",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Avatar sx={{ m: "1rem" , bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box
                component="form"
                noValidate
                sx={{ mt: 1, marginLeft:0, textAlign:'left' }}
                onSubmit={ (event: any) =>
                    getUser(event,user,dispatch,router)}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={user.email}
                    onChange={e => dispatch(patchUser(
                        getPayloadProps("email", e.currentTarget.value)))}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={user.password}
                    onChange={e => dispatch(patchUser(
                        getPayloadProps("password", e.currentTarget.value)))}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Box sx={{display:'flex', justifyContent:"space-between", mt:2 }}>
                    <Link href="" >
                        <Typography variant="body1" sx={{cursor: "pointer", textDecoration:"underline"}}>
                            {"Forgot password?"}
                        </Typography>
                    </Link>
                    <Link href='/sign-up'>
                        <Typography variant="body1" sx={{cursor: "pointer", textDecoration:"underline"}}>
                            {"Don't have an account? Sign Up"}
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    )
}

export default SignIn;