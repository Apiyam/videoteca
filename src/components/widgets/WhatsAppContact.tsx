import { WhatsApp } from "@mui/icons-material";
import { Button } from "@mui/joy";

export default function WhatsAppContact() {
  return (
    <Button variant="solid" color="success" sx={{ bgcolor: '#25D366', zIndex: 1000, position: 'fixed', bottom: 20, right: 20, borderRadius: '50%', padding: 1 }}>
      <WhatsApp sx={{ fontSize: 85 }} />
    </Button>
  );
}
