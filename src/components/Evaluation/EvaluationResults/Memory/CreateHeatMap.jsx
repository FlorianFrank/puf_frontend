import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {BACKEND_BASE_URL} from "../../../../config";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const CreateHeatMap = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    title: '',
    description: ''
  });

  const [saved, setSaved] = useState(false);

  let location = useLocation();
  const { selected } = location.state;

  const [imageUrl, setImageUrl] = useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [metrics, setMetrics] = useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  console.log('selected tests:');
  console.log(selected);
  /*
  useEffect(() => {
    console.log("useEffect")
    fetch('http://127.0.0.1:8000/api/getHeatmap/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selected)
    })
    .then(response => response.blob())
    .then((blob) => {
      // Create a URL object from the blob data
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
    })
    .catch(error => {
      console.error(error);
      // handle the error here
    });
  }, []);*/

  useEffect(() => {
    requestMetrics();
  }, []);

  let requestMetrics = async () => {
    fetch(`${BACKEND_BASE_URL}/api/getMetrics/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selected)
    })
      .then((response) => response.json())
      .then((data) => {
        setMetrics(data);
        console.log('metrics', data);
      })
      .catch((error) => {
        console.error(error);
        // handle the error here
      });
    //let data = await response.json();
    //console.log('DATA:', data);
    //setMetrics(data);
  };

  const handleChange = (name) => (event) => {
    console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  function handleClick() {
    // Code to save data goes here
    console.log('save'); // Update state to indicate that data has been saved

    fetch(`${BACKEND_BASE_URL}/api/experiment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data saved:', data);
        setSaved(true);
        navigate('/evaluation/experiments');
      })
      .catch((error) => console.error('Error saving data:', error));
  }

  console.log(imageUrl);

  return (
    <>
      {imageUrl && imageUrl ? (
        <Card sx={{ maxWidth: 650 }}>
          <TextField
            label="Experiment Title"
            id="filled-size-normal"
            defaultValue=""
            variant="filled"
            fullWidth="true"
            onChange={handleChange('title')}
          />

          <img src={imageUrl} alt="Heatmap" />
          <CardContent>
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={3}
              defaultValue=""
              fullWidth="true"
              onChange={handleChange('description')}
            />
          </CardContent>
          <CardActions disableSpacing>
            <CardActions>
              <Button size="small" onClick={handleClick}>
                Save
              </Button>
            </CardActions>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Other metrics:</Typography>

              {/*metrics && metrics[0].zerosAndOnes.map((item) => (
                 <Typography paragraph>
                Test {item.title}: Having a Hamming Weight of {item.HammingWeight} that corresponds {item.zeros} zeros and {item.ones} ones
                 </Typography>
              ))*/}

              <Typography paragraph>.... .... ....</Typography>
              <Typography paragraph>...... ..... .....</Typography>
            </CardContent>
          </Collapse>
        </Card>
      ) : (
        'loading'
      )}
    </>
  );
};

export default CreateHeatMap;

/**
 * const maxValue = Math.max(...matrix.flat());
   const minValue = Math.min(...matrix.flat());
 * return (
    <table>
      <tbody>
        {matrix.map((row) => (
          <HeatmapRow row={row} maxValue={maxValue} minValue={minValue} />
        ))}
      </tbody>
    </table>
  );
};

const HeatmapCell = ({ value, maxValue, minValue }) => {
  const range = maxValue - minValue;
  const hue = ((value - minValue) / range) * 120;
  const color = `hsl(${hue}, 100%, 50%)`;

  return (
    <td
      style={{
        backgroundColor: color,
        width: '10px',
        height: '10px'
      }}
    />
  );
};

const HeatmapRow = ({ row, maxValue, minValue }) => (
  <tr>
    {row.map((value) => (
      <HeatmapCell value={value} maxValue={maxValue} minValue={minValue} />
    ))}
  </tr>
);

export default CreateHeatMap;

 */
