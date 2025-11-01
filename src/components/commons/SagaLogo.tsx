import * as React from 'react';
import AspectRatio, { AspectRatioProps } from '@mui/joy/AspectRatio';

export default function SagaLogo(props: AspectRatioProps) {
  const { sx, ...other } = props;
  return (
    <AspectRatio
      ratio="1"
      variant="plain"
      {...other}
      sx={[
        {
          width: 36,
          borderRadius: 'sm',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <div>
        <img 
          src="/burlesqa.png" 
          alt="Burlesqa" 
          width={36} 
          height={36} />
      </div>
    </AspectRatio>
  );
}
