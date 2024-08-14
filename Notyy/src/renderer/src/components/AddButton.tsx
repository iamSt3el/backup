import { PlusCircle } from 'lucide-react'

export const AddButton = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 flex justify-center">
        <button className="bg-indigo-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-indigo-600 transition-colors transform hover:scale-105 duration-200">
          <PlusCircle size={20} className="mr-2" />
          Add Note
        </button>
      </div>
    </main>
  )
}
