import AdminLayout from '../../components/admin/AdminLayout';

const Admins = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Admin Management</h1>
        <p className="text-gray-600">Manage admin users and permissions</p>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Admin management coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admins;