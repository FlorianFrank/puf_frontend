import React from 'react';
import UniformityTable from './UniformityTable';

export default function Uniformity(props) {
  const { data, evaluation_id } = props;

  return (
    <>
      {data.map((group) =>
        group.memories.map((memoryGroup, memoryIndex) =>
          memoryGroup.initialValueKey.map(
            (initialValueGroup, initialValueIndex) =>
              initialValueGroup.startStopAddresses.map(
                (addressesGroup, addressesGroupIndex) => {
                  let totalMeasurements = 0;
                  addressesGroup.challenges.forEach((challengeGroup) => {
                    totalMeasurements +=
                      challengeGroup.challenge_measuremenst.length;
                  });

                  console.log(totalMeasurements);
                  return (
                    <UniformityTable
                      key={addressesGroupIndex}
                      memoryGroup={memoryGroup}
                      group={group}
                      initialValueGroup={initialValueGroup}
                      totalMeasurements={totalMeasurements}
                      addressesGroup={addressesGroup}
                      evaluation_id={evaluation_id}
                    />
                  );
                }
              )
          )
        )
      )}
    </>
  );
}
