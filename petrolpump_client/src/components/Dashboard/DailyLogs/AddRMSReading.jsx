import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import { MOST_RECENT_RMS_READINGS_QUERY } from '../../../gql/Query';
import { ADD_DAILY_RMS_READING_MUTATION } from '../../../gql/Mutation';

const AddRMSReading = ({ showRMSDetails, data }) => {
  // React hook form
  const { register, handleSubmit, reset, errors } = useForm();

  // RMS Reading mutation
  const [createRmsReading] = useMutation(ADD_DAILY_RMS_READING_MUTATION);

  // Local state -> show, hide, form
  const [showFinalRMSSubmissionForm, setShowFinalRMSSubmissionForm] = useState(
    false
  );
  const [finalMachineId, setFinalMachineId] = useState(0);

  // Query from database
  const [
    getMostRecentRMSReading,
    { loading, data: rmsReadingData },
  ] = useLazyQuery(MOST_RECENT_RMS_READINGS_QUERY);

  if (loading) return <p>Loading ...</p>;

  // Querying most recent RMS reading
  const queryMostRecentRMSReading = (machineId) => {
    getMostRecentRMSReading({ variables: { machineId } });

    setShowFinalRMSSubmissionForm(true);
    setFinalMachineId(machineId);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    await createRmsReading({
      variables: {
        machine: finalMachineId,
        startingReading: data.startingReading,
        dayEndReading: data.dayEndReading,
      },
    });

    reset();

    window.location.reload();
  };

  return (
    <div>
      {showRMSDetails && data && (
        <div className='meter-content'>
          <div className='meter-content-button'>
            {data.machines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => queryMostRecentRMSReading(machine.id)}
              >
                {machine.machineName}
              </button>
            ))}
          </div>
        </div>
      )}

      {showFinalRMSSubmissionForm &&
        rmsReadingData &&
        rmsReadingData.mostRecentRmsReadings.map((recentRMSData) => {
          const { id, dayEndReading, machine } = recentRMSData;

          return (
            <form
              key={id}
              className='form-input final-submission-form'
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className='machine-selection form-tex'>
                আপনি {machine.machineName} সিলেক্ট করেছেন
              </p>
              <div className='universal_form-input'>
                <label htmlFor='startingReading'>শুরুর রিডিং</label>
                <input
                  type='number'
                  placeholder='শুরুর রিডিং প্রবেশ করুন'
                  name='startingReading'
                  id='startingReading'
                  disabled
                  defaultValue={dayEndReading}
                  ref={register({ required: true })}
                />
                {errors.startingReading && (
                  <p className='error-message'>শুরুর রিডিং অবশ্যই লাগবে</p>
                )}
              </div>

              <div className='universal_form-input'>
                <label htmlFor='dayEndReading'>শেষের রিডিং</label>
                <input
                  type='number'
                  placeholder='শেষের রিডিং প্রবেশ করুন'
                  name='dayEndReading'
                  id='dayEndReading'
                  ref={register({ required: true })}
                />

                {errors.dayEndReading && (
                  <p className='error-message'>শেষের রিডিং অবশ্যই লাগবে</p>
                )}
              </div>

              <button type='submit'>Submit</button>
            </form>
          );
        })}
    </div>
  );
};

export default AddRMSReading;
