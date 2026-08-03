const UserDetailsModal = ({ user, onClose, onUpdate }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-2xl text-indigo-600">
                  {user.profile?.basic?.fullName?.[0]?.toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  {user.profile?.basic?.fullName || 'Unknown'}
                </h3>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <label className="text-sm font-medium text-gray-500">Gender</label>
                <p className="text-gray-900">{user.profile?.basic?.gender || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Age</label>
                <p className="text-gray-900">{user.profile?.basic?.age || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Religion</label>
                <p className="text-gray-900">{user.profile?.basic?.religion || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <p className="text-gray-900">{user.profile?.basic?.city || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="text-gray-900">
                  {user.isBlocked ? 'Blocked' : user.isActive ? 'Active' : 'Inactive'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Joined</label>
                <p className="text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <label className="text-sm font-medium text-gray-500">About</label>
              <p className="text-gray-900 mt-1">
                {user.profile?.about?.description || 'No description provided'}
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
          {onUpdate && (
            <button
              onClick={() => {
                onUpdate();
                onClose();
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Refresh
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;