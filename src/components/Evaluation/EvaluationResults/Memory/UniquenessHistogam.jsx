import React from 'react';
import { Bar } from 'react-chartjs-2';

const UniquenessHistogram = (props) => {
  const { group } = props;
  // const jsonObject = JSON.parse(group);
  console.log(group);
  const hammingDistances = group.inter_hamming_distances.map(
    (item) => item.hammingDistance
  );
  //const avgInterHammingDistances = jsonObject.inter_hd_list[0].memories[0].initialValueKey.map(item => item.avg_inter_hamming_distances);

  const data = {
    labels: hammingDistances.map((_, index) => `Pair ${index + 1}`),
    datasets: [
      {
        label: 'Hamming Distances',
        data: hammingDistances,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  console.log(data);

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h1>Average Inter-Hamming Distances Histogram</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default UniquenessHistogram;
