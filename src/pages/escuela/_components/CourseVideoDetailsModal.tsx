import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import IconButton from "@mui/joy/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { LoginOutlined, ShoppingCart } from "@mui/icons-material";

import { VideoCourse, VideoElement } from "types/types";
import { convertToFormatMoney } from "utils/Utils";
import { Box, Stack } from "@mui/joy";
import CourseVideoPurchaseModal from "./CourseVideoPurchaseModal";

type CourseVideoDetailsModalProps = {
  element: VideoCourse | VideoElement;
  open: boolean;
  onClose: () => void;
  isPublic?: boolean;
};

export default function CourseVideoDetailsModal({
  element,
  open,
  onClose,
  isPublic = false,
}: CourseVideoDetailsModalProps) {
  if (!element) return null; 
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        size="lg"
        variant="outlined"
        sx={{ borderRadius: "lg", maxWidth: 800, width: "100%" }}
      >
        <Card variant="plain" sx={{ boxShadow: "none" }}>
          {/* Header con close */}
          <CardOverflow sx={{ position: "relative" }}>
            <IconButton
              onClick={onClose}
              variant="soft"
              color="neutral"
              size="sm"
              sx={{ position: "absolute", top: 8, right: 8, zIndex: 1000 }}
            >
              <CloseRoundedIcon />
            </IconButton>
          </CardOverflow>

          <CardContent sx={{ maxHeight: "600px", overflowY: "auto" }} >
            <Box sx={{ display: "flex",  }}>
              <div style={{ width: "400px" }}>
              <img width="200" src={element.thumbnail} loading="lazy" alt="" />

              </div>
              <div>
              <Typography level="title-lg">
                <Link href="#" overlay underline="none" sx={{ color: 'fuchsia' }}>
                  {"element_name" in element
                    ? element.element_name
                    : element.course_name}
                </Link>
              </Typography>
              {("description" in element && element.description) && (
              <Typography level="body-sm" sx={{ mt: 2 }}>
                {element.description}
              </Typography>
            )}
            
              </div>
            </Box>
            <div>
            {("videos" in element && element.videos) && element.videos.length > 0 && (
              <CardContent>
                <Typography level="title-sm" sx={{ mb: 1 }}>
                  Contenido del curso
                </Typography>
                <Stack spacing={1.5}>
                  {element.videos.map((video, idx) => (
                    <Stack
                      key={idx}
                      direction="row"
                      spacing={1.5}
                      alignItems="center"
                      sx={{
                        p: 1,
                        borderRadius: "md",
                        bgcolor: "background.level1",
                      }}
                    >
                      <AspectRatio ratio="1/1" sx={{ width: 80, borderRadius: "sm" }}>
                        <img src={video.thumbnail} alt={video.element_name} loading="lazy" />
                      </AspectRatio>
                      <Stack>
                        <Typography level="body-sm" fontWeight="md">
                          {idx + 1}. {video.element_name}
                        </Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            )}
            </div>
          </CardContent>

          <CardOverflow variant="soft">
            <Divider inset="context" />
            <CardContent
              orientation="horizontal"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.5,
              }}
            >
              <Typography level="title-md" sx={{ fontWeight: 'bold', color: 'yellow' }}>
                {convertToFormatMoney(element.price)}
              </Typography>
              {!isPublic && <CourseVideoPurchaseModal element={element} />}
              {isPublic && <Button startDecorator={<LoginOutlined />} sx={{ backgroundColor: 'fuchsia' }} variant="solid"  onClick={() => window.location.href = "/clientes/login"}>Regístrate</Button>}
            </CardContent>
          </CardOverflow>
        </Card>
      </ModalDialog>
    </Modal>
  );
}
