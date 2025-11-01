"use client";
import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Button from "@mui/joy/Button";

import HeadingText from "../../components/commons/HeadingText";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { createPayment } from "../api/entities";
import { Link } from "@mui/joy";

export default function PagoExitosoPage() {
  const [checkoutSession, setCheckoutSession] = useState<any>(null);
  const [purchaseId, setPurchaseId] = useState<string | null>(null);
  const { user } = useUser();

  const createPaymentData = async () => {
    console.log(checkoutSession);
    if(checkoutSession && checkoutSession.payment_status === "paid" && user) {
      const objPayment = {
        type: checkoutSession.metadata?.type,
        amount: checkoutSession.amount_total,
        id_element: checkoutSession.metadata.id,
        payment_date: new Date().toISOString(),
        email_billing: checkoutSession.customer_details.email,
        reference: checkoutSession.payment_intent,
        user: user?.id || '',
        payment_id: checkoutSession.id,
        status: 1,
      }
      console.log(objPayment);
      const payment = await createPayment(objPayment);
      if(payment) {
        localStorage.removeItem("burlesqa_purchase_id");
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("burlesqa_purchase_id");
      setPurchaseId(id);

      if (id) {
        fetch(`https://n8n.srv912585.hstgr.cloud/webhook/checkout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "session", id }),
        })
          .then((res) => res.json())
          .then((data) => {
            setCheckoutSession(data);
            createPaymentData();
          })
          .catch((err) => console.error("Error fetching session:", err));
      }
    }
  }, []);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />

      <Box
        component="main"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 10,
        }}
      >
        <Card>
          <CardContent>
            <Stack
              sx={{
                backgroundColor: "background.body",
                px: { xs: 2, md: 4 },
                py: 2,
                gap: 2,
                overflow: "auto",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <img
                  src="/burlesqa.png"
                  alt="Burlesqa"
                  style={{ width: "100px", height: "100px" }}
                />
                <HeadingText
                  title="Muchas gracias por tu compra"
                  description="Ya puedes acceder a tu contenido."
                />
              </Box>

              <Typography level="title-lg">
                Tu contenido estará disponible en tu panel de control.
              </Typography>
              <Typography level="body-sm">
                Si tienes alguna pregunta, no dudes en contactarnos.
              </Typography>
              <Typography level="body-sm">Gracias por tu compra.</Typography>
              <Link href="/escuela/mis-cursos-videos" style={{ width: '100%' }}>
                <Button variant="solid" color="primary" style={{ width: '100%', backgroundColor: 'fuchsia' }}>
                  Ver mi {checkoutSession?.type === "video" ? "video" : "curso"}
                </Button>
              </Link>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </CssVarsProvider>
  );
}