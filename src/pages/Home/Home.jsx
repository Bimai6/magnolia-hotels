import { useMediaQuery } from '@mui/material';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import ButtonSearch from '../../components/ButtonSearch/ButtonSearch';
import { Box, Grid, Typography, Container } from '@mui/material';
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {

  const isDesktop = useMediaQuery("(min-width:1285px)");

  const benefits = [
    { label: 'Protocolo de experiencia cliente', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/isotipo_1_k7fbrd.png'},
    { label: 'Servicio de piscina y SPA', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/image_5_qwnp9q.png'},
    { label: 'Garantía de calidad', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175371/image_6_nsr9wa.png'},
    { label: 'Excelencia gastronómica', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/image_7_oglx3g.png'},
  ];

  const sliderSettings = {
    dots: true, 
    infinite: true, 
    speed: 400, 
    slidesToShow: 1, 
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 2000, 
    arrows: true, 
  };

  const DesktopView = () => (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box sx={{ my: 14 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ ml: -8, mt: 20 }}>
              <Typography variant="h3" fontWeight="bold">
                Tus vacaciones como nunca
              </Typography>
              <Typography variant="body1" sx={{ mt: 8, ml: 4, mr: 5, textAlign: { xs: 'justify', md: 'left' } }}>
                Descubre un oasis de lujo y confort donde cada detalle está pensado para hacer de tu estancia una experiencia inolvidable. Relájate en nuestras exclusivas instalaciones, disfruta de una gastronomía excepcional y sumérgete en un servicio diseñado para superar tus expectativas. Tu descanso y bienestar son nuestra prioridad. ¿Listo para unas vacaciones inigualables?
              </Typography>
            </Grid>
            <Box sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: { xs: '100%', md: '50%' },
              height: '100%',
              zIndex: -1
            }}>
              <img 
                src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/fondo_hp9223.png" 
                alt="Hotel Magnolia"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Box>
          </Grid>
        </Box>

        <Box sx={{ mt: 10, minHeight:'40vh', display: 'flex', justifyContent: 'flex-start'}}>
          <Grid container spacing={4} justifyContent="center" sx={{ '& .MuiGrid-item': { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' } }}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img src={benefit.icon} alt={benefit.label} width="150" />
                  <Typography variant="subtitle1" sx={{ position: 'relative', left: '10px', mt: 2, textAlign: 'center', minHeight: '4em', display: 'flex', align: 'flex-start' }}>
                    {benefit.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 0 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.123456789!2d-5.984459!3d37.389092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126f6e5a2a3b4f%3A0xabcdef1234567890!2sCalle%20Pedro%20del%20Toro%2018%2C%20Sevilla%2C%20España!5e0!3m2!1ses!2ses!4v1610000000000!5m2!1ses!2ses" 
                width="100%" 
                height="300" 
                style={{ border: 0, borderRadius: '10px'}}
                allowFullScreen 
                loading="lazy"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <ButtonSearch />
      <Footer />
    </>
  );


  const MobileView = () => (
    <>

      <Box sx={{ 
        position: 'relative', 
        width: '100%', 
        height: '400px', 
        backgroundImage: 'url(https://res.cloudinary.com/dk1g12n2h/image/upload/v1739175372/fondo_hp9223.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>

        <Box sx={{
          position: 'absolute',
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '340px'
        }}>
          <img src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739956982/magnolialLogoMobile_awbjyy.png" alt="Magnolia Hotels" width="100%" />
        </Box>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center" sx={{ my: 4 }}>
          <Grid item xs={12}>
            <Typography variant="h3" fontWeight="bold" textAlign="center">
              Tus vacaciones como nunca
            </Typography>
            <Typography variant="body1" sx={{ mt: 4, ml: 4, mr: 5, textAlign: { xs: 'justify', md: 'left' } }}>
            Descubre un oasis de lujo y confort donde cada detalle está pensado para hacer de tu estancia una experiencia inolvidable. Relájate en nuestras exclusivas instalaciones, disfruta de una gastronomía excepcional y sumérgete en un servicio diseñado para superar tus expectativas. Tu descanso y bienestar son nuestra prioridad. ¿Listo para unas vacaciones inigualables?
            </Typography>
          </Grid>
        </Grid>

        <Slider {...sliderSettings}>
          {benefits.map((benefit, index) => (
            <Box key={index} sx={{ 
              mt: 8,
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              justifyContent: "center", 
              textAlign: "center",
              height: "300px" 
            }}>
          <img 
            src={benefit.icon} 
            alt={benefit.label} 
            width="100" 
            style={{ display: "block", margin: "0 auto" }}
          />
          <Typography 
            variant="subtitle1" 
            sx={{ mt: 2, textAlign: "center" }}
          >
            {benefit.label}
          </Typography>
          </Box>
          ))}
        </Slider>


        <Grid item xs={12}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.123456789!2d-5.984459!3d37.389092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd126f6e5a2a3b4f%3A0xabcdef1234567890!2sCalle%20Pedro%20del%20Toro%2018%2C%20Sevilla%2C%20España!5e0!3m2!1ses!2ses!4v1610000000000!5m2!1ses!2ses" 
            width="100%" 
            height="300" 
            style={{ border: 0, borderRadius: '10px' }} 
            allowFullScreen 
            loading="lazy" 
          />
        </Grid>
      </Container>

      <Footer />
      <Box sx={{ height: '80px' }} />
      <ButtonSearch />
      <Header />
    </>
  );

  return isDesktop ? <DesktopView /> : <MobileView />;
};

export default Home;
