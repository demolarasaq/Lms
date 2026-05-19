import { useState, useEffect } from 'react';
import { Search, BookOpen, BookmarkPlus, FileText } from 'lucide-react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { supabase } from '../../../lib/supabase';

export function UserBooks() {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState<any[]>([]);
  const [reserving, setReserving] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      setBooks(data);
    }
  };

  const handleReserve = async (bookId: string) => {
    setReserving(bookId);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) {
        alert("Please log in to reserve books.");
        return;
      }
      
      const userId = userData.user.id;
      
      const { error } = await supabase.from('borrows').insert([
        { book_id: bookId, user_id: userId, status: 'pending' }
      ]);
      
      if (error) {
        console.error("Error reserving book:", error);
        alert("Failed to reserve book. You might have already requested it.");
      } else {
        alert("Book reserved successfully! It is now pending approval.");
      }
    } finally {
      setReserving(null);
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Explore Books</h2>
        <p className="text-slate-600 mt-1">Discover and reserve books from our collection</p>
      </div>

      {/* Search */}
      <Card className="bg-white border-slate-200">
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-50 border-slate-200"
            />
          </div>
        </div>
      </Card>

      {/* Books Table */}
      <Card className="bg-white border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Book Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Edition</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Author</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Pages</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Quantity</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBooks.map((book) => (
                <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-emerald-600" />
                      </div>
                      <span className="font-medium text-slate-900">{book.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{book.edition}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{book.author}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{book.pages}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                      {book.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                      {book.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => handleReserve(book.id)}
                        disabled={reserving === book.id || book.status !== 'Available' || book.quantity < 1}
                      >
                        <BookmarkPlus className="w-4 h-4 mr-1" />
                        {reserving === book.id ? 'Reserving...' : 'Reserve'}
                      </Button>
                      {book.pdf_url && (
                        <a 
                          href={book.pdf_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100 h-8 px-3"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Read
                        </a>
                      )}
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
        {filteredBooks.map((book) => (
          <Card key={book.id} className="bg-white border-slate-200">
            <div className="p-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-slate-900">{book.title}</h3>
                  <p className="text-sm text-slate-600">by {book.author}</p>
                  <p className="text-xs text-slate-500 mt-1">{book.edition}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span>{book.pages} pages</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                    Qty: {book.quantity}
                  </span>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {book.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button 
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => handleReserve(book.id)}
                  disabled={reserving === book.id || book.status !== 'Available' || book.quantity < 1}
                >
                  <BookmarkPlus className="w-4 h-4 mr-2" />
                  {reserving === book.id ? 'Reserving...' : 'Reserve'}
                </Button>
                {book.pdf_url && (
                  <a 
                    href={book.pdf_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center flex-1 rounded-md text-sm font-medium border border-slate-200 bg-white hover:bg-slate-100"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Read PDF
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Results Summary */}
      <div className="text-sm text-slate-600">
        <p>
          Showing <span className="font-semibold text-slate-900">{filteredBooks.length}</span> of{' '}
          <span className="font-semibold text-slate-900">{books.length}</span> books
        </p>
      </div>
    </div>
  );
}
