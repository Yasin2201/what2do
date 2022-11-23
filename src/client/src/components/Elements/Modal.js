export const Modal = ({children, title, error}) => {
  return (
    <>
      <div className="justify-center mt-40 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col items-center w-full p-5 bg-white outline-none focus:outline-none">
            <h2 className="text-2xl font-semibold text-gray-800 m-4">{title}</h2>
            {children}
            {
              error &&
                <div className="bg-red-100 border border-red-400 text-red-700 p-1 m-1 rounded relative" role="alert">
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                </div>
            }
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}