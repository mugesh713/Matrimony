import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  Users, 
  UserCheck, 
  Heart, 
  AlertTriangle,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';

// ✅ Move StatCard outside the component
const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentInterests, setRecentInterests] = useState([]);

  // ✅ Define fetchDashboardData before useEffect
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/dashboard/stats`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(response.data.stats);
      setRecentUsers(response.data.recentUsers);
      setRecentInterests(response.data.recentInterests);
    } catch (_error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your matrimony platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Users}
            title="Total Users"
            value={stats?.totalUsers || 0}
            color="bg-blue-500"
            subtitle={`${stats?.newUsersToday || 0} new today`}
          />
          <StatCard
            icon={UserCheck}
            title="Active Users"
            value={stats?.activeUsers || 0}
            color="bg-green-500"
            subtitle={`${stats?.newUsersThisWeek || 0} this week`}
          />
          <StatCard
            icon={Heart}
            title="Interests"
            value={stats?.totalInterests || 0}
            color="bg-pink-500"
            subtitle={`${stats?.pendingInterests || 0} pending`}
          />
          <StatCard
            icon={AlertTriangle}
            title="Reports"
            value={stats?.totalReports || 0}
            color="bg-red-500"
            subtitle={`${stats?.pendingReports || 0} pending`}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Users */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Users</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {user.profile?.basic?.fullName || 'Unknown'}
                      </p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      user.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Interests */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">Recent Interests</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentInterests.map((interest) => (
                  <div key={interest._id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        {interest.fromUser?.profile?.basic?.fullName || 'Unknown'}
                        <span className="text-gray-400 mx-2">→</span>
                        {interest.toUser?.profile?.basic?.fullName || 'Unknown'}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      interest.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      interest.status === 'accepted' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {interest.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;