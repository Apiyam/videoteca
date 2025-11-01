import React, { useState } from "react";
import { IconButton, Box, Typography, Button, Sheet } from "@mui/joy";
import { ShareRounded, Facebook, LinkedIn, WhatsApp, Twitter } from "@mui/icons-material";
import { useAppContext } from "AppContext";

export const ShareThis = () => {
  const { companyData } = useAppContext();
  const [open, setOpen] = useState(false);
  const [anchorPosition, setAnchorPosition] = useState<{ top: number; left: number } | null>(null);
  const shareUrl = companyData.apiyamUrl;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setAnchorPosition({ top: rect.bottom + 8, left: rect.left });
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
    setAnchorPosition(null);
  };

  const socialLinks = [
    {
      icon: <Facebook />,
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: <WhatsApp />,
      label: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: <LinkedIn />,
      label: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    },
    {
      icon: <Twitter />,
      label: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`
    }
  ];

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          backgroundColor: "#ddd",
          borderRadius: "50%",
          zIndex: 1000,
          width: '70px',
          height: '70px',
        }}
      >
        <ShareRounded sx={{ fontSize: '30px' }} />
      </IconButton>

      {open && anchorPosition && (
        <Sheet
          variant="outlined"
          sx={{
            position: "absolute",
            top: anchorPosition.top,
            right: 0,
            zIndex: 1500,
            p: 2,
            width: '30%',
            borderRadius: 'md',
            boxShadow: 'lg',
            bgcolor: 'background.surface',
          }}
          onClick={handleClose}
        >
          <Typography level="body-sm" mb={1}>
            Compartir en:
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {socialLinks.map(({ icon, label, url }) => (
              <Button
                key={label}
                startDecorator={icon}
                variant="outlined"
                size="sm"
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(url, "_blank");
                  handleClose();
                }}
              >
                {label}
              </Button>
            ))}
          </Box>
        </Sheet>
      )}
    </>
  );
};