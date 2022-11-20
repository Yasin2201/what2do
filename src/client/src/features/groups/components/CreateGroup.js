import { useState } from "react"

export const CreateGroup = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Group
      </button>
      {showModal ? (
        <>
          <div className="justify-center mt-40 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col items-center w-full bg-white outline-none focus:outline-none">
                <h2 className="text-2xl font-semibold text-gray-800 m-4">Create New Group</h2>
                <form className="flex flex-col items-start justify-evenly border-b border-solid border-slate-200 rounded-t">
                  <div className="p-5">
                    <label htmlFor="group-name" className="text-gray-700 text-lg font-medium">Group Name</label>
                    <input id="group-name" type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline"/>
                  </div>
                  <div className="flex p-5 w-full justify-evenly">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-5 rounded"
                        type="button"
                        onClick={() => setShowModal(false)}
                        >
                        Cancel
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-5 rounded"
                        type="button"
                        onClick={() => setShowModal(false)}
                        >
                        Save Group
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
