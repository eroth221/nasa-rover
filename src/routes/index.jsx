import Typography from '@mui/material/Typography';

export default function Index() {
    return (
        <>
            <Typography variant="h3">
                This is a demo for NASA's Rover API.
            </Typography>
            <Typography variant="h5">
                Please note that due to demo limits, no more than 30 requests are available per hour
            </Typography>
        </>
    );
  }