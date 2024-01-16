import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import { BACKEND_BASE_URL } from '../../config';

export default function Heatmap({
  group,
  evaluation_id,
  setExistingHeatmapIds
}) {
  const [heatmaps, setHeatmaps] = useState([]);
  const measurement_ids = group.challenge_measuremenst.map(
    (measurement) => measurement.id
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchExistingHeatmapIds = async () => {
      try {
        const response = await fetch(
          `${BACKEND_BASE_URL}/brokerApi/existing-heatmap-ids/?evaluation_id=${evaluation_id}&measurement_ids=${JSON.stringify(
            measurement_ids
          )}`
        );
        const data = await response.json();
        setHeatmaps(data);
        setExistingHeatmapIds(measurement_ids);
      } catch (error) {
        console.error('Error fetching existing heatmap IDs:', error);
      }
    };

    fetchExistingHeatmapIds();
  }, []);

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box sx={{ margin: 1 }}>
        <Typography
          className="mr-2 text-gray-900 font-semibold mb-1"
          gutterBottom
        >
          Heatmaps ss
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {heatmaps &&
          heatmaps.map((heatmap, index) => (
            <Grid key={heatmap.id} item xs={12} sm={6}>
              <Card variant="outlined" style={{ marginBottom: '20px' }}>
                <CardContent>
                  <Typography variant="h6">
                    Measurement ID: {heatmap.measurement_ids}
                  </Typography>
                  <img
                    src={`data:image/png;base64,${heatmap.heatmap_binary_image}`}
                    alt={`Heatmap ${heatmap.id}`}
                    style={{ width: '100%' }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Collapse>
  );
}
