import { FileCheck, Calendar, BookOpen } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

const issuesData = [
  {
    id: 14,
    bookName: 'Precolonial Black Africa',
    approveStatus: 'Pending',
    issueDate: '2026-01-27',
    returnDate: '2026-01-30',
  },
];

export function UserIssues() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getDaysRemaining = (returnDate: string) => {
    const today = new Date();
    const returnDateObj = new Date(returnDate);
    const diffTime = returnDateObj.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Borrowed Books</h2>
        <p className="text-slate-600 mt-1">Track your currently borrowed books and due dates</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Currently Borrowed</p>
                <p className="text-3xl font-bold">{issuesData.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm mb-1">Pending Approval</p>
                <p className="text-3xl font-bold">
                  {issuesData.filter((i) => i.approveStatus === 'Pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Total Issued</p>
                <p className="text-3xl font-bold">9</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Issue Information Table */}
      <Card className="bg-white border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            Issue Information
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Book ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Book Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Approve Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Issue Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Return Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {issuesData.map((issue) => {
                const daysRemaining = getDaysRemaining(issue.returnDate);
                return (
                  <tr key={issue.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{issue.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-emerald-600" />
                        </div>
                        <span className="font-medium text-slate-900">{issue.bookName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                        {issue.approveStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {formatDate(issue.issueDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          {formatDate(issue.returnDate)}
                        </div>
                        {daysRemaining >= 0 && (
                          <p className="text-xs text-amber-600 mt-1">
                            {daysRemaining === 0 ? 'Due today' : `${daysRemaining} days remaining`}
                          </p>
                        )}
                        {daysRemaining < 0 && (
                          <p className="text-xs text-red-600 mt-1">Overdue by {Math.abs(daysRemaining)} days</p>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Cards View */}
      <div className="grid gap-4 md:hidden">
        {issuesData.map((issue) => {
          const daysRemaining = getDaysRemaining(issue.returnDate);
          return (
            <Card key={issue.id} className="bg-white border-slate-200">
              <div className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{issue.bookName}</h3>
                    <p className="text-sm text-slate-500 mt-1">ID: {issue.id}</p>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 mt-2">
                      {issue.approveStatus}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Issue Date:</span>
                    <span className="font-medium text-slate-900">{formatDate(issue.issueDate)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Return Date:</span>
                    <span className="font-medium text-slate-900">{formatDate(issue.returnDate)}</span>
                  </div>
                  {daysRemaining >= 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Time Left:</span>
                      <span className="font-medium text-amber-600">
                        {daysRemaining === 0 ? 'Due today' : `${daysRemaining} days`}
                      </span>
                    </div>
                  )}
                  {daysRemaining < 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-600">Status:</span>
                      <span className="font-medium text-red-600">Overdue by {Math.abs(daysRemaining)} days</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {issuesData.length === 0 && (
        <Card className="bg-white border-slate-200">
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Borrowed Books</h3>
            <p className="text-slate-500">You don't have any books currently borrowed.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
