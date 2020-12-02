import React, { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';

import {
  MACHINE_BY_ID_QUERY,
  MOST_RECENT_METER_READING_QUERY,
} from '../../../gql/Query';
import { ADD_DAILY_METER_READING_MUTATION } from '../../../gql/Mutation';

const AddMeterReading = ({ showMeterDetails, data }) => {
  // React hook form
  const { register, handleSubmit, reset, errors } = useForm();

  // Meter reading mutation
  const [createMeterReading] = useMutation(ADD_DAILY_METER_READING_MUTATION);

  // Local state -> show, hide, form
  const [showMeterDispenserDetails, setShowMeterDispenserDetails] = useState(
    false
  );
  const [showFinalSubmissionForm, setShowFinalSubmissionForm] = useState(false);
  const [finalMachineId, setFinalMachineId] = useState(0);
  const [finalDispenserNo, setFinalDispenserNo] = useState(0);

  // DB query
  const [getMachinesById, { data: machineDataById }] = useLazyQuery(
    MACHINE_BY_ID_QUERY
  );
  const [
    getMachinesWithDispenser,
    { data: machineDataWithDispenser },
  ] = useLazyQuery(MOST_RECENT_METER_READING_QUERY);

  // Getting a specific machine by id
  const queryMachineById = (id) => {
    getMachinesById({ variables: { machineId: id } });

    setShowMeterDispenserDetails(true);
    setShowFinalSubmissionForm(false);
  };

  // Getting a machine by it's id and dispenserNo
  const queryMachineWithDispenser = (machineId, noOfDispensers) => {
    getMachinesWithDispenser({
      variables: { machineId, dispenserNo: noOfDispensers },
    });

    setShowFinalSubmissionForm(true);
    setFinalMachineId(machineId);
    setFinalDispenserNo(noOfDispensers);
  };

  const dispenserButton = [];

  // Handle form submission
  const onSubmit = async (data) => {
    await createMeterReading({
      variables: {
        machine: finalMachineId,
        dispenserNo: finalDispenserNo,
        startingReading: data.startingReading,
        dayEndReading: data.dayEndReading,
      },
    });

    reset();

    window.location.reload();
  };

  return (
    <>
      {showMeterDetails && data && (
        <div className='meter-content'>
          <div className='meter-content-button'>
            {data.machines.map((machine) => (
              <button
                key={machine.id}
                onClick={() => queryMachineById(machine.id)}
              >
                {machine.machineName}
              </button>
            ))}
          </div>
        </div>
      )}

      {showMeterDispenserDetails && machineDataById && (
        <div className='dispenser-content'>
          {machineDataById.machineById.map((machine) => {
            for (let i = 1; i <= machine.noOfDispensers; i++) {
              dispenserButton.push(
                <button
                  key={i}
                  onClick={() => queryMachineWithDispenser(machine.id, i)}
                >
                  ডিস্পেন্সার {i}
                </button>
              );
            }
            return (
              <p className='machine-selection' key={machine.id}>
                আপনি {machine.machineName} সিলেক্ট করেছেন
              </p>
            );
          })}
          <div className='dispenser-content-button'>{dispenserButton}</div>
        </div>
      )}

      {showFinalSubmissionForm &&
        machineDataWithDispenser &&
        machineDataWithDispenser.mostRecentMeterReading.map((recentMeter) => {
          const { id, machine, dayEndReading, dispenserNo } = recentMeter;
          return (
            <form
              key={id}
              className='form-input final-submission-form'
              onSubmit={handleSubmit(onSubmit)}
            >
              <p className='machine-selection form-tex' key={machine.id}>
                আপনি {machine.machineName} এর ডিস্পেন্সার নং {dispenserNo}{' '}
                সিলেক্ট করেছেন
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
    </>
  );
};

export default AddMeterReading;
