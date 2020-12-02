import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { ALL_MACHINES_QUERY } from "../../../gql/Query";

const AllMachines = () => {
  const {
    data: allMachines,
    error: machinesError,
    loading: machinesLoading,
  } = useQuery(ALL_MACHINES_QUERY);

  if (machinesLoading) return <p>Loading...</p>;
  if (machinesError) return <p>Error</p>;

  return (
    <div className="machine-container">
      <h1>সব মেশিনের তালিকা</h1>
      <div className="all-machine-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>মেশিনের নাম</th>
              <th>ডিস্পেন্সার সংখ্যা</th>
            </tr>
          </thead>
          <tbody>
            {allMachines.machines.map((machine, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{machine.machineName}</td>
                <td>{machine.noOfDispensers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllMachines;
