import AdminLayout from '../../components/admin/AdminLayout';

const Settings = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-600">Configure platform settings</p>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Settings coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Settings;