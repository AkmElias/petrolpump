import React, { useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";

import "./AddMeterAndRMSReading.scss";
import { ALL_MACHINES_QUERY } from "../../../gql/Query";
import AddRMSReading from "./AddRMSReading";
import AddMeterReading from "./AddMeterReading";

const AddMeterAndRMSReadingV_2 = () => {
  // Show, Hide state
  const [showMeterDetails, setShowMeterDetails] = useState(false);
  const [showRMSDetails, setShowRMSDetails] = useState(false);

  // DB Query
  const [getMachines, { loading, data }] = useLazyQuery(ALL_MACHINES_QUERY);

  if (loading) return <p>Loading ...</p>;

  // Handling RMS Reading
  const onClickRMSHandler = () => {
    getMachines();

    setShowRMSDetails(!showRMSDetails);
  };

  // Getting all machines from db onClick
  const onClickMeterHandler = () => {
    getMachines();

    setShowMeterDetails(!showMeterDetails);
  };

  return (
    <div className="meter_and_rms">
      <div className="meter_and_rms-header">
        {!showRMSDetails && (
          <button type="button" onClick={() => onClickMeterHandler()}>
            মিটার রিডিং
          </button>
        )}
        {!showMeterDetails && (
          <button type="button" onClick={() => onClickRMSHandler()}>
            আর এম এস রিডিং
          </button>
        )}
      </div>

      {showMeterDetails && (
        <AddMeterReading showMeterDetails={showMeterDetails} data={data} />
      )}

      {showRMSDetails && (
        <AddRMSReading showRMSDetails={showRMSDetails} data={data} />
      )}
    </div>
  );
};

export default AddMeterAndRMSReadingV_2;
