import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    Box,
    Paper,
    styled,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useLoaderData } from 'react-router';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export async function loader({ params }) {
    return await getData(params)
}

async function getData({date, name}){
    let day = date ? dayjs(date) : dayjs()
    let formattedDay = day.format('YYYY-MM-DD')
    
    const { data } = await axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${name}/photos?earth_date=${formattedDay}&api_key=DEMO_KEY`)
    
    return {
        day: day,
        photos: data.photos,
        name: name
    }
}

export default function RoverView() {
    const {photos, day, name} = useLoaderData();
    const [roverPhotos, setRoverPhotos] = useState(photos);
    const [date, setDate] = useState(day)

    useEffect(() => {
        if(day !== date){
            let params = {
                date: date.format('YYYY-MM-DD'),
                name: name,
            }

            getData(params).then(data => {
                let photos = data.photos
                setRoverPhotos(photos)
            })
        }
    },[date])

    return (
        <div id="roverPhotos">
            <DatePicker
                label="Controlled picker"
                value={date}
                onChange={(newValue) => setDate(newValue)}
            />
            <p>Pick a date to view photos from the rover.</p>
            <p>Please note, not all date's will have photos.</p>
            {roverPhotos.length > 0 &&
                <Box sx={{ width: '100%' }}>
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        {roverPhotos && roverPhotos.length > 0 && roverPhotos.map(photo => (
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
            }
        </div>
    );
}
