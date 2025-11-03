import * as React from "react";
import {
  Modal,
  ModalDialog,
  Typography,
  Button,
  Divider,
  Stack,
} from "@mui/joy";
import { ShoppingCart } from "@mui/icons-material";
import { loadStripe } from "@stripe/stripe-js";
import { VideoCourse, VideoElement } from "types/types";
import { convertToFormatMoney } from "utils/Utils";
import { useUser } from "@clerk/nextjs";

type CourseVideoPurchaseModalProps = {
  element: VideoCourse | VideoElement;
};

const stripePromise = loadStripe("pk_test_51KJVPpFCpGtDCpLrkww2eDFAVv5I3CyZDbFfTnMVfdJs5EYhPHRTgvZwRgOhvfzsZxYbRcz61OuKtz5d3qWqMtIb00Hcv6Gt1Y");

export default function CourseVideoPurchaseModal({ element }: CourseVideoPurchaseModalProps) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { user } = useUser();

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://n8n.srv912585.hstgr.cloud/webhook/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "checkout",
          email: user?.emailAddresses[0].emailAddress,
          name: "element_name" in element ? element.element_name : element.course_name,
          price: element.price,
          type: "element_name" in element ? "video" : "course",
          id: element.id,
        }),
      });
      const data = await res.json();
      console.log(data);
      const stripe = await stripePromise;
      if (stripe) {
        localStorage.setItem("burlesqa_purchase_id", data.id);
        await stripe.redirectToCheckout({ sessionId: data.id });
      }
    } catch (err) {
      console.error(err);
      alert("Error al iniciar el pago");
    } finally {
      setLoading(false);
    }
  };
  if (!element) return null; 
  return (
    <>
      {/* Botón Comprar */}
      <Button
        startDecorator={<ShoppingCart />}
        variant="solid"
        color="primary"
        onClick={() => setOpen(true)}
        sx={{ backgroundColor: 'green' }}
      >
        Comprar
      </Button>

      {/* Modal de compra */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog size="md" variant="outlined" sx={{ borderRadius: "lg" }}>
          <Typography level="title-lg">Confirmar compra</Typography>
          <Divider sx={{ my: 1.5 }} />

          <Stack spacing={1}>
            <Typography level="title-md">
              Estás a punto de comprar: {"element_name" in element
                ? element.element_name
                : element.course_name}
            </Typography>
            <Typography level="body-sm">
              Serás redirigido a la página de pago y podrás pagar con tu tarjeta de crédito, débito y google pay.
            </Typography>
            <Typography level="title-md" color="primary" sx={{ mt: 1, color: 'yellow' }}>
              {convertToFormatMoney(element.price)}
            </Typography>
          </Stack>

          <Divider sx={{ my: 1.5 }} />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="solid"
              color="success"
              loading={loading}
              onClick={handleCheckout}
            >
              Confirmar y Pagar
            </Button>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  );
}