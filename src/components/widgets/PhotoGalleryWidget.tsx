import React, { useState } from "react";
import { LocationOnRounded } from "@mui/icons-material";
import { Box, CardContent, Card, Modal, Typography, ModalDialog, ModalClose, Grid, CardCover } from "@mui/joy";



const itemData = [
    {
      img: 'https://tse3.mm.bing.net/th?id=OIP.vjQEXIZINXEUbhEDS1WqLAHaEl&pid=Api',
      title: 'Experiencia mágica',
      author: '@fernandogabs',
    },
    {
      img: 'https://tse4.mm.bing.net/th?id=OIP.B482HTt95adITuwcf3LISQHaE6&pid=Api',
      title: 'Majestuosa experiencia',
      author: '@stepfipole',
    },
    {
      img: 'https://tse2.mm.bing.net/th?id=OIP.eGkSBy4ia29BrNS2V59UuQHaFx&pid=Api',
      title: 'Me gusta mucho',
      author: '@helloimnik',
    },
    {
      img: 'https://media.timeout.com/images/105725346/image.jpg',
      title: 'Me encanta',
      author: '@nolanissac',
    },
    {
      img: 'https://www.caminoreal.com/storage/app/uploads/public/65a/078/eb3/65a078eb30894813202920.jpg',
      title: 'Experiencia inolvidable',
      author: '@hjrc33',
    },
    {
      img: 'https://www.lavozdemichoacan.com.mx/wp-content/uploads/2020/11/Santuario-Mariposa-Monarca.jpg',
      title: 'Perfecto',
      author: '@arwinneil',
    }
  ];


  const PhotoWidget = ({img, title, author, handleOpen}: {img: string, title: string, author: string, handleOpen: (src: string) => void}) =>{
    return (
        <Card sx={{ minHeight: '280px', cursor: 'pointer' }} onClick={() => handleOpen(img)}>
      <CardCover>
        <img
          src={img}
          alt={title}
          width={320}
          height={280}
        />
      </CardCover>
      <CardCover
        sx={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 200px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
        }}
      />
      <CardContent sx={{ justifyContent: 'flex-end' }}>
        <Typography level="title-lg" textColor="#fff">
          {title}
        </Typography>
        <Typography
          startDecorator={<LocationOnRounded />}
          textColor="neutral.300"
        >
          {author}
        </Typography>
      </CardContent>
    </Card>
    )
  }

const PhotoGalleryWidget = () => {
    const [selectedImage, setSelectedImage] = useState("");

    const handleOpen = (src: string) => {
      setSelectedImage(src);
      //alert(src);
    };
  
    const handleClose = () => {
      setSelectedImage("");
    };
  
    return (
      <Box sx={{ width: "100%", maxWidth: 800, margin: "auto", mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
      {itemData.map((item, index) => (
        <Grid xs={12} sm={6} md={4} key={index}>
          <PhotoWidget handleOpen={handleOpen} img={item.img} title={item.title} author={item.author} />
        </Grid>
      ))}
    </Grid>
        
        {selectedImage !== "" && (
        <Modal open={true} onClose={handleClose}>
            <ModalDialog>
                <ModalClose />
                <img src={selectedImage} alt="Selected Image" height={400} style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </ModalDialog>
        </Modal>
        )}
      </Box>
    );
};

export default PhotoGalleryWidget;


/*
<Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={false}
          loop
          spaceBetween={30}
          slidesPerView={1}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={src}
                alt={`Slide ${index + 1}`}
                sx={{ width: "100%", height: "auto", borderRadius: 2 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

*/