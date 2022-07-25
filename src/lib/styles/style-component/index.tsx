import Image from "next/image";
import {CSSProperties, ReactNode} from "react";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";

type CustomImageProps = {
    src: string,
    width: string,
    height?: string,
    sx?: { [key: string]: string | number },
    style?: CSSProperties,
    children?: ReactNode;
    priority?: boolean
}

export const CustomImage = ({src, width, height, sx, style, children, priority}: CustomImageProps) => {

    const Body = styled(Box)(({theme})=>({
        display: "flex",
        width:width,
        height:height,
    }))

    const baseStyle = {
        borderRadius: "2rem",
    }

    return (
        <Body sx={sx}>
            <Image
                width={2000}
                height={2000}
                src={src}
                style={style? style : baseStyle}
                priority = { priority?  priority : false}
            />
            {children}
        </Body>
    )
}
