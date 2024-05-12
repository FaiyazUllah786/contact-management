import React from "react";

interface Contact {
  id: string;
  fname: string;
  lname: string;
  isActive: boolean;
}

interface DetailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: Contact;
}

const DetailContactModal: React.FC<DetailContactModalProps> = ({
  isOpen,
  onClose,
  contact,
}) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center ">
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-glass rounded-lg shadow-lg w-full max-w-md mx-auto my-6">
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 bg-[#49011c] text-white">
                <h3 className="text-lg font-semibold">Contact Details</h3>
                <button
                  className="text-white hover:text-gray-300 focus:outline-none"
                  onClick={onClose}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="px-4 py-6 font-serif ">
                <p className="text-white">
                  <span className="font-semibold text-slate-300  ">
                    First Name:
                  </span>{" "}
                  {contact.fname}
                </p>
                <p className="text-white mt-2">
                  <span className="font-semibold text-slate-300">
                    Last Name:
                  </span>{" "}
                  {contact.lname}
                </p>
                <p className="text-white mt-2">
                  <span className="font-semibold text-slate-300">Status:</span>{" "}
                  {contact.isActive ? "Active" : "Not Active"}
                </p>
              </div>
              <div className="flex justify-end px-4 py-2 border-t border-gray-200">
                <button
                  className="px-4 py-2  bg-red-600 font-serif text-white rounded-md hover:border focus:outline-none"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailContactModal;
