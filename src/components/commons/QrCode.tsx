import { QRCodeSVG } from "qrcode.react";
import { useAppContext } from 'AppContext';
import { Box } from "@mui/joy";
    
export default function QrCode() {
    const { companyData } = useAppContext();
    return (
        <Box alignItems="center" justifyContent="center" display="flex" height="100%">
            <QRCodeSVG
                value={companyData.website}
                title={companyData.name}
                size={200}
                bgColor={"#ffffff"}
                fgColor={companyData.config.strongColor}
                level={"L"}
                imageSettings={{
                    src: companyData.logo,
                    x: undefined,
                    y: undefined,
                    height: 80,
                    width: 80,
                    opacity: 0.9,
                    excavate: true,
                }}
                />
                <br />
        </Box>
    )
}
