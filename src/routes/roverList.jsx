import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
    Box,
    Paper,
    styled,
    Typography,
    Divider,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const RoverList = () => {
    const [rovers, setRovers] = useState();
    
    const getData = async () => {
        try{
            const { data } = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/?api_key=DEMO_KEY');
            setRovers(data.rovers);
        }
        catch(err){
            console.log(err.message)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div id="roverList">
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {!!rovers && rovers.length > 0 && rovers.map(rover => {
                    return (
                        <Grid xs={12} sm={6} key={rover.id} component={Link} to={`/rovers/${rover.name.toLowerCase()}`}>
                            <Item sx={{ height: '400px' }}>
                                <Box sx={{ p: 1 }}>
                                    <Typography variant="h4">Name:</Typography> 
                                    <Typography variant="h4">{rover.name}</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ p: 1 }}>
                                    <Typography variant="body1">Landing Date: {rover.landing_date}</Typography>
                                    <Typography variant="body1">Total Photos: {rover.total_photos}</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ p: 1, height: '200px', overflow: 'scroll'  }}>
                                    <Typography variant="h5">Cameras:</Typography>
                                    {rover.cameras.length > 0 && rover.cameras.map(camera => (
                                        <Typography key={camera.id} variant="body1">{camera.full_name}</Typography>
                                    ))}
                                </Box>
                            </Item>
                        </Grid>
                    )
                })}
                </Grid>
            </Box>
        </div>
    )
}

export default RoverList