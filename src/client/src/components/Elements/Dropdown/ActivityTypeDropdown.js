import { activityTypes } from "./utils/activityTypes"

export const ActivityTypeDropdown = ({typeSelected, setTypeSelected}) => {
  const toggleCheckbox = (value) => {
    if (typeSelected === value) {
      setTypeSelected(undefined)
    } else {
      setTypeSelected(value)
    }
  }

  return (
    <div className="mt-5">
      <label className="text-gray-700 text-md font-medium">Activity Type</label>
      <ul className="grid gap-6 w-full grid-cols-2 md:grid-cols-4">
        {
          activityTypes.map((type) => {
            return (
              <li key={type.name} >
                  <input type="checkbox" id={type.id} className="hidden peer" checked={typeSelected === type.value} onChange={() => toggleCheckbox(type.value)} />
                  <label htmlFor={type.id} className="inline-flex justify-center items-center p-3 w-full h-full text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer peer-checked:border-blue-600 hover:text-gray-600 peer-checked:text-gray-600 peer-checked:bg-gray-100 hover:bg-gray-50">                           
                      <div className="block">
                          {type.icon}
                          <div className="w-full text-lg font-semibold">{type.name}</div>
                          <div className="hidden w-full text-sm lg:block">{type.description}</div>
                      </div>
                  </label>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}