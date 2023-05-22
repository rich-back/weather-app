import { SunIcon } from "@heroicons/react/solid"

function loading() {
  return (
    <div className="bg-gradient-to-br from-[#394F68] to-[#183B7E] min-h-screen flex flex-col items-center justify-center text-white">
        <SunIcon
        className="h-24 w-24 animate-spin text-yellow-200"
        color="yellow"/>
        <h1 className="text-6xl font-bold text-center my-8">
            Loading...
        </h1>
    </div>
  )
}

export default loading