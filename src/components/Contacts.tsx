import React, { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

import { useAppSelector, useAppDispatch } from "../Store/store";
import { deleteContact, updateContact } from "../Store/features/contactSlice";
import UpdateContactModal from "./UpdateContactModal";
import DetailContactModal from "./DetailContactModal";

interface Contact {
  id: string;
  fname: string;
  lname: string;
  phoneNo: string;
  isActive: boolean;
}

const Contacts = () => {
  const contacts = useAppSelector((state) => state.contact.contacts);
  const dispatch = useAppDispatch();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedContactDetail, setSelectedContactDetail] =
    useState<Contact | null>(null);

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contactId: string,
    contactName: string
  ) => {
    event.preventDefault();
    if (
      window.confirm(`Are you sure you want to delete ${contactName} contact?`)
    ) {
      dispatch(deleteContact(contactId));
    }
  };

  const handleUpdate = (updatedContact: Contact) => {
    dispatch(updateContact(updatedContact));
  };

  const handleOpenUpdateModal = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    contact: Contact
  ) => {
    event.preventDefault();
    setSelectedContact(contact);
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setSelectedContactDetail(null);
    setShowUpdateModal(false);
  };

  const handleOpenDetailModal = (contact: Contact) => {
    setSelectedContactDetail(contact);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedContact(null);
    setShowDetailModal(false);
  };

  return (
    <div className="m-10 items-center">
      <table className="w-full sm:w-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 bg-glass">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 w-1/4 sm:w-auto">
              Name
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 sm:w-auto">
              PhoneNo.
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 sm:w-auto">
              Status
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 sm:w-auto">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact: Contact) => (
            <tr key={contact.id} className="hover:bg-green-950">
              <th
                scope="row"
                className="flex items-center px-6 py-4 cursor-pointer text-gray-900 whitespace-nowrap dark:text-white"
                onClick={() => handleOpenDetailModal(contact)}
              >
                <div className="text-base font-semibold">
                  {contact.fname + " " + contact.lname}
                </div>
              </th>
              <td className="px-6 py-4">{contact.phoneNo}</td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      contact.isActive ? "bg-green-500" : "bg-red-500"
                    } me-2`}
                  ></div>
                  {contact.isActive ? "Active" : "Inactive"}
                </div>
              </td>
              <td className="px-6 py-4 gap-6 flex">
                <button
                  onClick={(event) => handleOpenUpdateModal(event, contact)}
                >
                  <MdEdit color="#1E88E5" size={20} />
                </button>
                <button
                  onClick={(event) =>
                    handleDelete(
                      event,
                      contact.id,
                      `${contact.fname} ${contact.lname}`
                    )
                  }
                >
                  <MdDeleteOutline color="#E53935" size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedContact && (
        <UpdateContactModal
          isOpen={showUpdateModal}
          onClose={handleCloseUpdateModal}
          contact={selectedContact}
          onUpdate={handleUpdate}
        />
      )}
      {selectedContactDetail && (
        <DetailContactModal
          isOpen={showDetailModal}
          onClose={handleCloseDetailModal}
          contact={selectedContactDetail}
        />
      )}
    </div>
  );
};

export default Contacts;
