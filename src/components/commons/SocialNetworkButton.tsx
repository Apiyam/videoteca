import { Facebook, Instagram, LinkedIn, YouTube, ShareRounded, OpenInBrowser } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import Tiktok from './Tiktok'
import Website from './WebisteIcon'

type SocialNetworkButtonProps = {
    href: string;
    type: keyof typeof IDictionarySocialNetwork;
}

const IDictionarySocialNetwork = {
    'fb': {
        'label': 'Facebook',
        'icon': <Facebook />,
        'color': '#1877F2'
    },
    'ig': {  
        'label': 'Instagram',
        'icon': <Instagram />,
        'color': '#E1306C'
    },
    'lk': {
        'label': 'LinkedIn',
        'icon': <LinkedIn />,
        'color': '#0077B5'
    },
    'yt': {
        'label': 'Youtube',
        'icon': <YouTube />,
        'color': '#FF0000'
    },
    'tt': { 
        'label': 'Tiktok',
        'icon': <Tiktok />,
        'color': '#000000'
    },
    'web': {
        'label': 'Página Web',
        'icon': <Website />,
        'color': 'blue'
    },
    'other': {
        'label': 'Otro',
        'icon': <OpenInBrowser />,
        'color': 'orange'
    }
}

export default function SocialNetworkButton(props: SocialNetworkButtonProps) {
    const { href, type } = props;
    const { icon, color, label } = IDictionarySocialNetwork[type];
    return (
       <div style={{ textAlign: 'center' }}>
        <IconButton  
            component="a"
            href={href}
            target="_blank"
            variant="outlined"
            size="lg"
            color="primary"
            className="social-network-button"
            sx={{ 
                bgcolor: color, 
                borderColor: color, 
                '&:hover': { bgcolor: color, opacity: 0.7 } 
            }}
        >
            {icon}
        </IconButton >
        <br />
        <Typography  sx={{ color: 'var(--joy-palette-text-primary)' }}>{label}</Typography>
       </div> 
    )
}
