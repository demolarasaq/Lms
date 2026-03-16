import { Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

const reservationsData = [
  {
    id: 14,
    bookName: 'Precolonial Black Africa',
    approveStatus: 'Pending',
    issueDate: '2026-01-27',
    returnDate: '2026-01-30',
  },
  {
    id: 11,
    bookName: 'A play of Giants',
    approveStatus: 'Denied',
    issueDate: null,
    returnDate: null,
  },
  {
    id: 7,
    bookName: 'The power of Now',
    approveStatus: 'Denied',
    issueDate: null,
    returnDate: null,
  },
];

export function UserReservations() {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'Denied':
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Denied
          </Badge>
        );
      case 'Approved':
        return (
          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const pendingReservations = reservationsData.filter((r) => r.approveStatus === 'Pending');
  const deniedReservations = reservationsData.filter((r) => r.approveStatus === 'Denied');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">My Reservations</h2>
        <p className="text-slate-600 mt-1">Track your book reservation requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold">{pendingReservations.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-500 to-red-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm mb-1">Denied</p>
                <p className="text-3xl font-bold">{deniedReservations.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-0 text-white">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm mb-1">Total</p>
                <p className="text-3xl font-bold">{reservationsData.length}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Reservations Table */}
      <Card className="bg-white border-slate-200 overflow-hidden">
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
              {reservationsData.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-600">{reservation.id}</td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-900">{reservation.bookName}</span>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(reservation.approveStatus)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {formatDate(reservation.issueDate)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {formatDate(reservation.returnDate)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Mobile Cards View */}
      <div className="grid gap-4 md:hidden">
        {reservationsData.map((reservation) => (
          <Card key={reservation.id} className="bg-white border-slate-200">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-slate-900">{reservation.bookName}</h3>
                  <p className="text-sm text-slate-500 mt-1">ID: {reservation.id}</p>
                </div>
                {getStatusBadge(reservation.approveStatus)}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Issue Date:</span>
                  <span className="font-medium text-slate-900">{formatDate(reservation.issueDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Return Date:</span>
                  <span className="font-medium text-slate-900">{formatDate(reservation.returnDate)}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {reservationsData.length === 0 && (
        <Card className="bg-white border-slate-200">
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No Reservations</h3>
            <p className="text-slate-500">You haven't made any book reservations yet.</p>
          </div>
        </Card>
      )}
    </div>
  );
}
