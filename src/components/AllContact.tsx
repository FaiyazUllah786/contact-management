import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../Store/store";
import { deleteContact, updateContact } from "../Store/features/contactSlice";
import UpdateContactModal from "./UpdateContactModal";
import { MdDeleteOutline } from "react-icons/md";
import DetailContactModal from "./DetailContactModal";
import { FaCircleInfo } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

interface Contact {
  id: string;
  fname: string;
  lname: string;
  phoneNo: string;
  isActive: boolean;
}

const AllContact = () => {
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
    <div>
      {contacts.length === 0 ? (
        <p className="text-center mt-4 text-lg text-white font-serif">
          No contacts found.
          <br />
          Please create a contact using the{" "}
          <em className="font-bold text-slate-200">Add Contact</em> button.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {contacts.map((contact: Contact) => (
            <div
              key={contact.id}
              className="relative bg-glass border border-white rounded-lg shadow md:max-w-xl dark:border-gray-700 hover:cursor-pointer"
            >
              <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <FaCircleInfo
                  size={18}
                  color="black"
                  onClick={() => handleOpenDetailModal(contact)}
                />
              </div>
              <div className="p-4">
                <h5 className="mb-2 text-2xl tracking-tight text-white font-normal font-serif text-start">
                  {contact.fname} {contact.lname}
                </h5>
                <div className="flex flex-row gap-1 text-2xl">
                  <button
                    onClick={(event) => handleOpenUpdateModal(event, contact)}
                    className="hover:cursor-pointer hover:bg-green-600 hover:text-white rounded-xl"
                  >
                    <div className="flex gap-2 bg-glass border border-white rounded-xl bg-white pl-2 pr-2 justify-center items-center">
                      Edit
                      <MdEdit />
                    </div>
                  </button>
                  <button
                    onClick={(event) =>
                      handleDelete(
                        event,
                        contact.id,
                        `${contact.fname} ${contact.lname}`
                      )
                    }
                    className="hover:cursor-pointer hover:bg-red-600 hover:text-white rounded-xl"
                  >
                    <div className="flex gap-2 bg-glass border border-white rounded-xl bg-white pl-2 pr-2 justify-center items-center">
                      Delete
                      <MdDeleteOutline />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
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

export default AllContact;
