import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

interface HeadingTextProps {
  title: string;
  description: string;
}

export default function HeadingText({title, description}: HeadingTextProps) {
  return (
    <Stack sx={{ mb: 2 }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', width: '100%' }}>
        <Typography level="h2">{title}</Typography>
      </Stack>
      <Typography level="body-md" color="neutral">
        {description}
      </Typography>
    </Stack>
  );
}
