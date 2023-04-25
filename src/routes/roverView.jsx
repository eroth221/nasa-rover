import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Box,
    Paper,
    styled,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';
import { useLoaderData } from 'react-router';

const validDate = (date) => {
    let dateformat = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
    return !!date.match(dateformat);
}

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export async function loader({ params }) {
    let date = params.date && validDate(params.date) ? params.date : moment().format("YYYY-MM-DD");
    
    let rover = {
        name: params.roverName,
        date: date
    }
    
    return rover;
}

export default function RoverView() {
    const [roverPhotos, setRoverPhotos] = useState([]);
    const rover = useLoaderData();

    const getData = async () => {
        const { data } = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.name}/photos?earth_date=${rover.date}&api_key=DEMO_KEY`);
        setRoverPhotos(data.photos);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div id="roverList">
            <Box sx={{ width: '100%' }}>
                <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {roverPhotos.length > 0 && roverPhotos.map(photo => (
                        <Grid xs={12} sm={6} key={photo.id}>
                            <Item>
                                <img
                                    src={photo.img_src}
                                    style={{ maxWidth: "100%" }}
                                    alt="rover photo"
                                    loading="lazy"
                                />
                            </Item>
                        </Grid>
                    ))}
                    </Grid>
            </Box>
        </div>
    );
}
