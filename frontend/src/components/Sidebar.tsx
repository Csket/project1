import React from 'react';
import { Users, Image as ImageIcon, Video, Calendar } from 'lucide-react';

const Sidebar = () => {
  const groups = [
    { id: 1, name: 'Family', members: 5 },
    { id: 2, name: 'Friends', members: 8 },
    { id: 3, name: 'Travel', members: 4 },
  ];

  const handleQuickAccess = (section: string) => {
    alert(`${section} section coming soon!`);
  };

  const handleGroupClick = (groupName: string) => {
    alert(`${groupName} group details coming soon!`);
  };

  return (
    <aside className="w-64 bg-white rounded-2xl shadow-xl p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4">QUICK ACCESS</h3>
          <div className="space-y-2">
            <button 
              onClick={() => handleQuickAccess('Photos')}
              className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <ImageIcon className="w-5 h-5 mr-3 text-indigo-600" />
              Photos
            </button>
            <button 
              onClick={() => handleQuickAccess('Videos')}
              className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Video className="w-5 h-5 mr-3 text-indigo-600" />
              Videos
            </button>
            <button 
              onClick={() => handleQuickAccess('Calendar')}
              className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5 mr-3 text-indigo-600" />
              Calendar
            </button>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">MY GROUPS</h3>
          <div className="space-y-2">
            {groups.map(group => (
              <button
                key={group.id}
                onClick={() => handleGroupClick(group.name)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <span>{group.name}</span>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {group.members}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;