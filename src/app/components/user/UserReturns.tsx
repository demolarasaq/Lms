import { RotateCcw, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

const returnsData = [
  {
    bookId: 25,
    bookName: 'Che - A Revolutionary Life',
    issueDate: '2024-11-29',
    returnDate: '2024-12-10',
    returnStatus: 'Returned',
  },
  {
    bookId: 21,
    bookName: 'The Developmental Psychology of the Black Child',
    issueDate: '2024-11-15',
    returnDate: '2024-11-14',
    returnStatus: 'Returned',
  },
  {
    bookId: 14,
    bookName: 'Precolonial Black Africa',
    issueDate: '2024-11-20',
    returnDate: '2024-12-18',
    returnStatus: 'Returned',
  },
  {
    bookId: 15,
    bookName: 'The West and the Best of Us..',
    issueDate: '2024-12-05',
    returnDate: '2024-12-30',
    returnStatus: 'Returned',
  },
  {
    bookId: 15,
    bookName: 'The West and the Best of Us..',
    issueDate: '2024-12-05',
    returnDate: '2024-12-30',
    returnStatus: 'Returned',
  },
  {
    bookId: 15,
    bookName: 'The West and the Best of Us..',
    issueDate: '2024-12-05',
    returnDate: '2024-12-30',
    returnStatus: 'Returned',
  },
];

export function UserReturns() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const calculateDuration = (issueDate: string, returnDate: string) => {
    const issue = new Date(issueDate);
    const returnD = new Date(returnDate);
    const diffTime = Math.abs(returnD.getTime() - issue.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Return History</h2>
        <p className="text-slate-600 mt-1">View your complete book return history</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Total Returns</p>
                <p className="text-3xl font-bold">{returnsData.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">On Time Returns</p>
                <p className="text-3xl font-bold">{returnsData.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">Avg. Reading Time</p>
                <p className="text-3xl font-bold">12d</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Returns Table */}
      <Card className="bg-white border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-emerald-600" />
            Return List
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Book ID</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Book Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Issue Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Return Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Duration</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {returnsData.map((returnItem, index) => (
                <tr key={index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{returnItem.bookId}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="font-medium text-slate-900">{returnItem.bookName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {formatDate(returnItem.issueDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {formatDate(returnItem.returnDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {calculateDuration(returnItem.issueDate, returnItem.returnDate)} days
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {returnItem.returnStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Cards View */}
      <div className="grid gap-4 md:hidden">
        {returnsData.map((returnItem, index) => (
          <Card key={index} className="bg-white border-slate-200">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{returnItem.bookName}</h3>
                  <p className="text-sm text-slate-500 mt-1">ID: {returnItem.bookId}</p>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 mt-2">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {returnItem.returnStatus}
                  </Badge>
                </div>
              </div>
              <div className="space-y-2 text-sm border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Issue Date:</span>
                  <span className="font-medium text-slate-900">{formatDate(returnItem.issueDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Return Date:</span>
                  <span className="font-medium text-slate-900">{formatDate(returnItem.returnDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Duration:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">
                    {calculateDuration(returnItem.issueDate, returnItem.returnDate)} days
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {returnsData.length === 0 && (
        <Card className="bg-white border-slate-200">
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Return History</h3>
            <p className="text-slate-500">You haven't returned any books yet.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
