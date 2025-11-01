import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import AspectRatio from "@mui/joy/AspectRatio";
import Divider from "@mui/joy/Divider";
import Input from "@mui/joy/Input";
import Chip from "@mui/joy/Chip";

import NavBar from "../../components/commons/NavBar";
import HeadingText from "../../components/commons/HeadingText";
import { useCourses } from "hooks/useBusiness";
import { usePaymentsElements, useVideoElements } from "hooks/useBusiness";
import { useState } from "react";
import { School, VideoCameraFront } from "@mui/icons-material";
import CourseVideoCard from "./_components/CourseVideoCard";
import { VideoCourse, VideoElement } from "types/types";
import CourseVideoDetailsModal from "./_components/CourseVideoDetailsModal";

export default function VideosYCursosPage() {

  const { courses, videoElements } = usePaymentsElements();
  const [selectedType, setSelectedType] = useState<string>('courses');
  const [selectedElement, setSelectedElement] = useState<VideoCourse | VideoElement | null>(null);

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <NavBar />
      <Box
        component="main"
        sx={{
          height: {
            xs: "100%",
            md: "calc(100vh - 55px)",
          },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "70% 30%" },
        }}
      >
        {/* Sección de cursos */}
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
           <img src="/logo-burlesqa.jpg" alt="Burlesqa" 
           style={{ width: "100px", height: "100px", filter: 'invert(1)' }} />
          <HeadingText
            title="Mi biblioteca de tutoriales"
            description="Explora tu biblioteca de tutoriales adquiridos."
          />
           </Box>

          {/* Barra de filtros */}
          <Stack direction="row" spacing={1}>
          <Chip sx={{ fontSize: "1.3rem" }} startDecorator={<School style={{ fontSize: "1.3rem" }} />} size="lg" variant="soft" color={selectedType === 'courses' ? 'primary' : 'neutral'} onClick={() => setSelectedType('courses')}>
              Cursos
            </Chip>
            <Chip sx={{ fontSize: "1.3rem" }} startDecorator={<VideoCameraFront style={{ fontSize: "1.3rem" }} />} size="lg" variant="soft" color={selectedType === 'videos' ? 'primary' : 'neutral'} onClick={() => setSelectedType('videos')}>
              Videos
            </Chip>
            
          </Stack>

          {/* Mockup de lista de cursos */}
          <Stack sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 }}>
            { selectedType === 'courses' ? courses?.map((course) => (
              <CourseVideoCard shortcut key={course.id} element={course} onSelect={setSelectedElement} />
            )) : videoElements?.map((video) => (
              <CourseVideoCard shortcut key={video.id} element={video} onSelect={setSelectedElement} />
            ))}
          </Stack>

            {selectedElement && <CourseVideoDetailsModal open={Boolean(selectedElement)} element={selectedElement} onClose={() => setSelectedElement(null)} />}
        </Stack>

      </Box>
    </CssVarsProvider>
  );
}