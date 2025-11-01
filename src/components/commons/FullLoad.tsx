import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { LinearProgress } from "@mui/joy";

const FullLoad = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                width: '100vw',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <div>
            <Typography variant="h4">Cargando información, espera un momento...</Typography>
            <br />
            <LinearProgress  size="md" />
            </div>
            
            
        </Box>
    )
}

export default FullLoad;
