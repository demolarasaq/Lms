import { MessageSquare, User, Calendar, ThumbsUp } from 'lucide-react';
import { Card } from './ui/card';
import { Avatar, AvatarFallback } from './ui/avatar';

const insightsData = [
  {
    id: 1,
    user: 'afonja',
    insight: 'You could make it that the user will resume the book reading where they left off the ast time',
    dateSubmitted: 'Feb 04, 2026 - 12:53 PM',
  },
];

export function Insights() {
  const formatDate = (dateString: string) => {
    return dateString;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">User Insights</h2>
          <p className="text-slate-600 mt-1">Feedback and suggestions from the community</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <MessageSquare className="w-4 h-4 text-indigo-600" />
          <span className="text-sm text-slate-600">Total Insights: </span>
          <span className="text-sm font-semibold text-indigo-600">{insightsData.length}</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Submissions</p>
                <p className="text-3xl font-bold">{insightsData.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Active Contributors</p>
                <p className="text-3xl font-bold">1</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Implemented Ideas</p>
                <p className="text-3xl font-bold">0</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <ThumbsUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Insights List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">Recent Feedback</h3>
          <span className="text-sm text-slate-500">Showing all insights</span>
        </div>

        {insightsData.map((insight) => (
          <Card key={insight.id} className="bg-white border-slate-200 hover:shadow-lg transition-all">
            <div className="p-6">
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <Avatar className="w-12 h-12 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white font-semibold">
                    {insight.user.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-900">{insight.user}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-sm text-slate-500">{formatDate(insight.dateSubmitted)}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium flex-shrink-0">
                      New
                    </span>
                  </div>

                  {/* Insight Text */}
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <p className="text-slate-700 leading-relaxed">{insight.insight}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-4">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">Mark as Helpful</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors">
                      <span className="text-sm font-medium">Implement</span>
                    </button>
                    <button className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors">
                      <span className="text-sm font-medium">Archive</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (if no insights) */}
      {insightsData.length === 0 && (
        <Card className="bg-white border-slate-200">
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Insights Yet</h3>
            <p className="text-slate-500">When users submit feedback, it will appear here.</p>
          </div>
        </Card>
      )}

      {/* Information Card */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <div className="p-6">
          <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            About User Insights
          </h4>
          <p className="text-indigo-800 text-sm leading-relaxed">
            This section displays feedback and suggestions from library members. Review each insight carefully to
            improve the library experience. You can mark helpful suggestions, implement ideas, or archive feedback
            that's been addressed.
          </p>
        </div>
      </Card>
    </div>
  );
}
