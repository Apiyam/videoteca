import { Link, Typography, Box, Stack, Button } from "@mui/joy";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000",
        color: "white",
        py: 6,
        px: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
      }}
    >
      {/* Logo / Marca */}
      <img src="/logo-burlesqa.jpg" alt="logo" style={{ width: '200px', filter: 'invert(1)' }} />

      {/* Mensaje + CTA */}
      <Stack spacing={2} alignItems="center">
        <Typography sx={{ fontSize: "1rem", color: "#eee", maxWidth: 400 }}>
          Desata tu potencial femenino, conecta con tu sensualidad y forma parte de nuestra tribu Burlesqa.
        </Typography>
        <Button
          variant="solid"
          size="lg"
          sx={{
            background: "linear-gradient(90deg, #e91e63, #ff4081)",
            color: "#fff",
            borderRadius: "2rem",
            px: 4,
            py: 1.5,
            textTransform: "uppercase",
            fontWeight: "bold",
            boxShadow: "0 4px 20px rgba(233,30,99,0.5)",
            "&:hover": {
              background: "linear-gradient(90deg, #ff4081, #f50057)",
            },
          }}
        >
          Agenda tu clase aquí
        </Button>
      </Stack>

      {/* Créditos */}
      <Typography sx={{ fontSize: "0.9rem", mt: 3, color: "#aaa" }}>
        Desarrollado por{" "}
        <Link sx={{ color: "yellow" }} href="https://apiyam.com">
          Apiyam © {new Date().getFullYear()}
        </Link>
      </Typography>
    </Box>
  );
}