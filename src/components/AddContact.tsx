import React, { useState } from "react";
import { useAppDispatch } from "../Store/store";
import { addContact } from "../Store/features/contactSlice";

const AddContact = () => {
  const [firstname, setFName] = useState("");
  const [lastname, setLName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [status, setStatus] = useState(false);

  const dispatch = useAppDispatch();

  const handleFNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFName(e.target.value);
  };

  const handleLNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLName(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNo(e.target.value.toString());
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "Active") {
      setStatus(true);
    } else {
      setStatus(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      addContact({
        fname: firstname,
        lname: lastname,
        isActive: status,
        phoneNo: phoneNo.toString(),
      })
    );
    setFName("");
    setLName("");
    setStatus(false);
  };

  return (
    <div className="flex flex-col gap-2 w-96 lg:w-1/3 sticky top-0 lg:sticky md:top-10 rounded-lg bg-glass p-4">
      <div className="text-center text-lg font-bold dark:text-gray-400 text-gray-100">
        Add Contact
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4">
          <label
            htmlFor="fname"
            className="block mb-1 dark:text-gray-300 text-gray-100"
          >
            First Name
          </label>
          <input
            type="text"
            required
            name="fname"
            placeholder="First Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white"
            value={firstname}
            onChange={handleFNameChange}
          />
        </div>
        <div className="mb-4 dark:text-gray-300 text-gray-100">
          <label htmlFor="lname" className="block mb-1">
            Last Name
          </label>
          <input
            required
            type="text"
            name="lname"
            placeholder="Last Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white"
            value={lastname}
            onChange={handleLNameChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block mb-1 dark:text-gray-300 text-gray-100"
          >
            Phone No
          </label>
          <input
            required
            minLength={10}
            type="number"
            name="phone"
            placeholder="9999900000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white"
            value={phoneNo}
            onChange={handlePhoneChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="status"
            className="block mb-1 dark:text-gray-300 text-gray-100"
          >
            isActive
          </label>
          <select
            required
            name="status"
            id=""
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white"
            value={status ? "Active" : "Not Active"}
            onChange={handleStatusChange}
          >
            <option value="Active">Active</option>
            <option value="Not Active">Not Active</option>
          </select>
        </div>
        <div className="mb-4 text-center">
          <button
            className=" text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[50%] bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500"
            type="submit"
          >
            ADD
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;
