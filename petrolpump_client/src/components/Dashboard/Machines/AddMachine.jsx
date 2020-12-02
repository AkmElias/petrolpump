import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";

import { ADD_MACHINE_MUTATION } from "../../../gql/Mutation";
import { ALL_MACHINES_QUERY } from "../../../gql/Query";

const AddMachine = (props) => {
  const { register, handleSubmit, reset, errors } = useForm();
  const [createMachine] = useMutation(ADD_MACHINE_MUTATION, {
    refetchQueries: [{ query: ALL_MACHINES_QUERY }],
    awaitRefetchQueries: true,
  });

  const onSubmit = async ({ machineName, noOfDispensers }) => {
    await createMachine({
      variables: { machineName, noOfDispensers },
    });

    reset();
  };

  return (
    <div className="controlled-form common-border-pad common-bg">
      <h1>নতুন মেশিন অ্যাড করুন</h1>
      <form className="form-input" onSubmit={handleSubmit(onSubmit)}>
        <div className="universal_form-input">
          <label htmlFor="machineName">মেশিনের নাম</label>
          <input
            type="text"
            name="machineName"
            id="machineName"
            placeholder="মেশিনের নাম প্রবেশ করুন"
            ref={register({ required: true })}
          />
          {errors.machineName && (
            <p className="error-message">মেশিনের নাম অবশ্যই লাগবে</p>
          )}
        </div>
        <div className="universal_form-input">
          <label htmlFor="noOfDispensers">মেশিনের ডিস্পেন্সার সংখ্যা</label>
          <input
            type="number"
            name="noOfDispensers"
            id="noOfDispensers"
            placeholder="মেশিনের ডিস্পেন্সার সংখ্যা প্রবেশ করুন"
            ref={register({ required: true })}
          />
          {errors.noOfDispensers && (
            <p className="error-message">ডিস্পেন্সার নং অবশ্যই লাগবে</p>
          )}
        </div>
        <button type="submit">সাবমিট</button>
      </form>
    </div>
  );
};

export default AddMachine;
