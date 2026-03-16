import { BookOpen, Users, Clock, CheckCircle, TrendingUp, Activity } from 'lucide-react';
import { Card } from './ui/card';

const stats = [
  {
    label: 'Total Books',
    value: '20',
    change: '+12% from last month',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
  },
  {
    label: 'Total Users',
    value: '3',
    change: '+2 new this week',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
  },
  {
    label: 'Pending Requests',
    value: '1',
    change: 'Needs attention',
    icon: Clock,
    color: 'from-amber-500 to-amber-600',
  },
  {
    label: 'Active Borrows',
    value: '0',
    change: 'All books available',
    icon: CheckCircle,
    color: 'from-emerald-500 to-emerald-600',
  },
];

const quotes = [
  {
    text: "The struggle against colonialism does not end with the act of independence. Rather, independence merely marks a new stage in the struggle for African unity, economic freedom, and cultural independence.",
    author: "Kwame Nkrumah",
    book: "Africa Must Unite",
  },
  {
    text: "To break free from the grip of neocolonialism, it is necessary to decolonize the mind and develop a culture of resistance.",
    author: "Frantz Fanon",
    book: "The Wretched of the Earth",
  },
  {
    text: "We must leave our dreams and abandon our old beliefs and friendships of the time before life began. Let us waste no time in sterile litanies and nauseating mimicry. Leave this Europe where they are never done talking about Man, yet murder men everywhere they find them, at the corner of every one of their own streets, in all the corners of the globe.",
    author: "Frantz Fanon",
    book: "The wretched of the Earth",
  },
  {
    text: "The history of Africa will remain suspended in air and cannot be written correctly until African historians dare to connect it with the history of Egypt.",
    author: "Cheikh Anta Diop",
    book: "The African Origin of Civilization",
  },
];

const recentActivity = [
  {
    user: 'John Doe',
    action: 'borrowed',
    book: 'The Wretched of the Earth',
    time: '2 hours ago',
  },
  {
    user: 'Jane Smith',
    action: 'returned',
    book: 'Africa Must Unite',
    time: '5 hours ago',
  },
  {
    user: 'Mike Johnson',
    action: 'requested',
    book: 'Class Struggle in Africa',
    time: '1 day ago',
  },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome back, kofo!</h2>
          <p className="text-slate-600 mt-1">Here's what's happening with your library today.</p>
        </div>
        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span className="text-sm text-slate-600">System Status: </span>
          <span className="text-sm font-semibold text-emerald-600">Healthy</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-white border-slate-200 hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-slate-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                    <p className="text-xs text-slate-500 mt-2">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quotes Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-slate-900">Visionary Insights</h3>
            <span className="text-sm text-slate-500">Wisdom from the giants of history</span>
          </div>
          <div className="grid gap-4">
            {quotes.map((quote, index) => (
              <Card key={index} className="bg-white border-slate-200 hover:border-indigo-300 transition-all group">
                <div className="p-6">
                  <div className="flex gap-3">
                    <div className="w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-slate-700 leading-relaxed mb-4 italic">"{quote.text}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{quote.author}</p>
                          <p className="text-sm text-slate-500">{quote.book}</p>
                        </div>
                        <TrendingUp className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h3>
          <Card className="bg-white border-slate-200">
            <div className="divide-y divide-slate-100">
              {recentActivity.map((activity, index) => (
                <div key={index} className="p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-sm text-slate-600 truncate mt-1">{activity.book}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-indigo-600 to-purple-600 border-0 mt-4">
            <div className="p-6 text-white">
              <h4 className="font-semibold mb-4">Quick Insights</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">Books borrowed this month</span>
                  <span className="font-bold">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">Average reading time</span>
                  <span className="font-bold">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-indigo-100">Most popular category</span>
                  <span className="font-bold">History</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
