import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { IconButton, SvgIcon } from '@mui/joy';
import { Email, ShareRounded, WhatsApp } from '@mui/icons-material';
import SocialNetworkButton from 'components/commons/SocialNetworkButton';
import { useAppContext } from 'AppContext';
import { ShareThis } from 'components/commons/ShareThis';
export default function CompanyWidget() {
    const { companyData } = useAppContext();

    return (
        <Box
            sx={{
                width: '100%',
                position: 'relative',
                overflow: { xs: 'auto' },
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' }, // Cambia a columnas en desktop
                gap: 2, // Espacio entre columnas
                
            }}
        >
            <Card
                orientation="horizontal"
                sx={{
                    width: '100%',
                    flexWrap: 'wrap',
                    // make the card resizable for demo
                    maxWidth: '100%',
                     display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' }, // Cambia a columnas en desktop
                    gap: 2, // Espacio entre columnas
                }}
            >
                
                <Box sx={{ 
                    display: 'flex', 
                    gap: 2,
                     width: '100%', 
                     flexDirection: { xs: 'column', lg: 'row' },
                     alignItems: 'center'
                    }}>

                <AspectRatio ratio="1" sx={{ minWidth: { xs: '100%', md: '300px' }, maxHeight: { xs: '100%', md: '300px' } }}>
                        <img
                            src={companyData.logo}
                            srcSet={companyData.logo}
                            loading="lazy"
                            alt={companyData.name}
                        />
                    </AspectRatio>


                    <CardContent sx={{ width: '100%' }}>
                        <ShareThis />
                        <Typography level="h1" >
                            {companyData.name}
                        </Typography>
                        <Typography
                            level="body-sm"
                            textColor= 'var(--joy-palette-text-neutral)'
                            sx={{ fontWeight: 'lg' }}
                        >
                            {companyData.slogan}
                        </Typography>
                        <Sheet
                            sx={{
                                bgcolor: 'background.level1',
                                borderRadius: 'sm',
                                p: 1.5,
                                my: 1.5,
                                display: 'flex',
                                gap: 2,
                                '& > div': { flex: 1 },
                            }}
                        >
                            {companyData?.metrics?.map((metric, index) => (
                                <div key={index}>
                                    <Typography level="body-xs" sx={{ fontWeight: 'lg' }}>
                                        {metric.description}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'lg', color: 'text.tertiary' }}>{metric.metric}</Typography>
                                </div>
                            ))}
                            
                        </Sheet>

                        <Box sx={{ display: 'flex', gap: 1.5, '& > a': { flex: 1 } }}>
                            {companyData.email && <Button size="lg" component="a" href={`mailto:${companyData.email}`} variant="solid" color="neutral" >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <Email />
                                </SvgIcon>
                                Correo
                            </Button>}
                            {companyData.whatsapp && <Button sx={{bgcolor: '#25D366'}} size="lg" component="a" href={`https://wa.me/${companyData.whatsapp}&text=Hola, quisiera saber más sobre sus servicios`}  variant="solid" >
                                <SvgIcon sx={{ mr: 1 }}>
                                    <WhatsApp />
                                </SvgIcon>
                                Whatsapp
                            </Button>}
                        </Box>
                    </CardContent>
                </Box>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                        <Typography level="title-lg" sx={{ mb: 1 }}>
                            Redes Sociales
                        </Typography>
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(5, 1fr)',
                            gap: 1.5,
                            width: '100%'
                        }}>
                            {
                               companyData.socials[0]?.fb && <SocialNetworkButton href={companyData.socials[0]?.fb} type="fb" />        
                            }
                            {
                                companyData.socials[0]?.ig && <SocialNetworkButton href={companyData.socials[0]?.ig} type="ig" />
                            }
                            {
                                companyData.socials[0]?.lk && <SocialNetworkButton href={companyData.socials[0]?.lk} type="lk" />
                            }
                            {
                                companyData.socials[0]?.yt && <SocialNetworkButton href={companyData.socials[0]?.yt} type="yt" />
                            }
                            {
                                companyData.socials[0]?.tt && <SocialNetworkButton href={companyData.socials[0]?.tt} type="tt" />
                            }
                            {
                                companyData.website && <SocialNetworkButton href={companyData.website} type="web" />
                            }
                            {
                                companyData.socials[0]?.other && <SocialNetworkButton href={companyData.socials[0]?.other} type="other" />
                            }
                        </Box>
                    </Box>
                </CardContent>


            </Card>

        </Box>
    );
}