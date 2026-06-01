import { useState, useEffect } from 'react';
import { Search, Filter, Plus, BookOpen, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { supabase } from '../../lib/supabase';

const booksData = [
  {
    id: 7,
    title: 'The power of Now',
    edition: '1st, 1999',
    author: 'Eckhart Tolle',
    pages: 191,
    quantity: 1,
    status: 'Available',
  },
  {
    id: 10,
    title: 'How Europe Underdeveloped Africa',
    edition: '1st, 1972',
    author: 'Walter Rodney',
    pages: 361,
    quantity: 6,
    status: 'Available',
  },
  {
    id: 11,
    title: 'A play of Giants',
    edition: '1st, 1984',
    author: 'Wole Soyinka',
    pages: 69,
    quantity: 1,
    status: 'Available',
  },
  {
    id: 12,
    title: 'The Wretched of the Earth',
    edition: '1st, 1963',
    author: 'Frantz Fanon',
    pages: 255,
    quantity: 4,
    status: 'Available',
  },
  {
    id: 13,
    title: 'Class Struggle in Africa',
    edition: '2nd, 1972',
    author: 'Oseagefo Kwame Nkrumah',
    pages: 48,
    quantity: 50,
    status: 'Available',
  },
  {
    id: 14,
    title: 'Precolonial Black Africa',
    edition: '1st, 1987',
    author: 'Cheikh Anta Diop',
    pages: 255,
    quantity: 2,
    status: 'Available',
  },
  {
    id: 15,
    title: 'The West and the Rest of Us..',
    edition: '1st, 1975',
    author: 'Chinweizu Ibekwe',
    pages: 540,
    quantity: 1,
    status: 'Available',
  },
];

export function Books() {
  const [books, setBooks] = useState<any[]>(booksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      if (data.length > 0) {
        setBooks(data);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      const { error } = await supabase.from('books').delete().eq('id', id);
      if (!error) {
        setBooks((currentBooks) => currentBooks.filter((book) => book.id !== id));
      } else {
        alert('Failed to delete book.');
      }
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Book Collection</h2>
          <p className="text-slate-600 mt-1">Manage your library's book inventory</p>
        </div>
        <Link to="/admin/books/add">
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add New Book
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <Card className="bg-white border-slate-200">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search books by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-50 border-slate-200"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="border-slate-200">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <div className="flex border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 ${viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'text-slate-600'}`}
                >
                  Grid
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Books Display */}
      {viewMode === 'list' ? (
        <Card className="bg-white border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">ID</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Book Name</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Edition</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Author</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Pages</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Quantity</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-600">{book.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="font-medium text-slate-900">{book.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{book.edition}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{book.author}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{book.pages}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-700">
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
                        <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-indigo-600" />
                        </button>
                        <button 
                          onClick={() => handleDelete(book.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="bg-white border-slate-200 hover:shadow-lg transition-all">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-indigo-600" />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    {book.status}
                  </Badge>
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{book.title}</h3>
                <p className="text-sm text-slate-600 mb-1">by {book.author}</p>
                <p className="text-xs text-slate-500 mb-4">{book.edition}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">{book.pages} pages</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 font-medium">
                    Qty: {book.quantity}
                  </span>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(book.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <p>
          Showing <span className="font-semibold text-slate-900">{filteredBooks.length}</span> of{' '}
          <span className="font-semibold text-slate-900">{books.length}</span> books
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
