import { distanceRadius } from "./utils/distanceRadius"

export const DistanceDropdown = () => {
  return (
    <div className="mt-5">
      <label className="text-gray-700 text-md font-medium">Distance Radius</label>
      <select id="distanceId" required defaultValue={""} className="w-full p-1.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none focus:border-indigo-600">
        <option value="" disabled>Select Distance</option>
        {
          distanceRadius.map((distance => {
            return (
              <option key={distance.id} value={distance.meter}>{distance.miles}</option>
            )
          }))
        }
      </select>
    </div>
  )
}