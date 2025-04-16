// filepath: c:\Users\sanket\Downloads\project\src\App.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Plus, Users } from 'lucide-react';
import CalendarView from './components/CalendarView';
import MediaModal from './components/MediaModal';
import Sidebar from './components/Sidebar';

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  interface BackendData {
    // Define the structure of the data returned by the API
    id: number;
    name: string;
    // Add other fields as per the API response
  }

  const [backendData, setBackendData] = useState<BackendData | null>(null);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://memorify-9iah.onrender.com/api/data'); // Use Render URL
        setBackendData(response.data);
      } catch (error) {
        console.error('Error fetching data from backend:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <nav className="bg-white shadow-md px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Memorify
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.alert('Create Group feature coming soon!')}
              className="flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </button>
            <button
              onClick={() => window.alert('Group management coming soon!')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Users className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
        <Sidebar />

        <main className="flex-1 bg-white rounded-2xl shadow-xl p-6">
          <CalendarView onDateSelect={handleDateSelect} />
          <div className="mt-4">
            <h2 className="text-xl font-bold">Data from Backend:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg">
              {backendData ? JSON.stringify(backendData, null, 2) : 'Loading...'}
            </pre>
          </div>
        </main>
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default App;