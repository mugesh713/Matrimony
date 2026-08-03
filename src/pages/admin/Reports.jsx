import AdminLayout from '../../components/admin/AdminLayout';

const Reports = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900">Reports</h1>
        <p className="text-gray-600">Manage user reports and complaints</p>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">Reports management coming soon...</p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;