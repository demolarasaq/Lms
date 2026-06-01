import { useState } from 'react';
import { ArrowLeft, Upload, BookOpen, Save, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useNavigate } from 'react-router';
import { supabase } from '../../lib/supabase';

export function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    edition: '',
    pages: '',
    quantity: '1',
    category: '',
  });
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let cover_url = '';
    let pdf_url = '';

    try {
      // 1. Upload Cover Image if exists
      if (coverFile) {
        const fileExt = coverFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('book-covers').upload(`covers/${fileName}`, coverFile);
        if (error) throw error;
        if (data) {
          cover_url = supabase.storage.from('book-covers').getPublicUrl(`covers/${fileName}`).data.publicUrl;
        }
      }

      // 2. Upload PDF if exists
      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { data, error } = await supabase.storage.from('book-pdfs').upload(`pdfs/${fileName}`, pdfFile);
        if (error) throw error;
        if (data) {
          pdf_url = supabase.storage.from('book-pdfs').getPublicUrl(`pdfs/${fileName}`).data.publicUrl;
        }
      }

      // 3. Save Book Record
      const { error } = await supabase.from('books').insert([
        {
          title: formData.title,
          author: formData.author,
          edition: formData.edition,
          pages: parseInt(formData.pages) || null,
          quantity: parseInt(formData.quantity) || 1,
          category: formData.category,
          cover_url,
          pdf_url
        }
      ]);

      if (error) throw error;
      navigate('/admin/books');
      
    } catch (error: any) {
      alert(`Error saving book: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button 
          type="button"
          variant="outline" 
          size="icon" 
          onClick={() => navigate('/admin/books')}
          className="rounded-full border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 text-slate-600" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Add New Book</h2>
          <p className="text-slate-600 mt-1">Enter the details of the new book for the library</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Details */}
          <Card className="lg:col-span-2 bg-white border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              Primary Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Book Title *</label>
                <Input 
                  required
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. The Wretched of the Earth"
                  className="bg-slate-50 border-slate-200 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Author *</label>
                  <Input 
                    required
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Frantz Fanon"
                    className="bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Category</label>
                  <Input 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. History, Philosophy"
                    className="bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Edition / Year</label>
                  <Input 
                    name="edition"
                    value={formData.edition}
                    onChange={handleChange}
                    placeholder="e.g. 1st, 1963"
                    className="bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Number of Pages</label>
                  <Input 
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleChange}
                    placeholder="e.g. 255"
                    className="bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Sidebar Settings */}
          <div className="space-y-6">
            <Card className="bg-white border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Inventory</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Quantity *</label>
                  <Input 
                    required
                    type="number"
                    min="1"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="bg-slate-50 border-slate-200 focus:bg-white"
                  />
                </div>
              </div>
            </Card>

            <Card className="bg-white border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Media</h3>
              <div className="space-y-4">
                <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverFile(e.target.files?.[0] || null)} />
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
                    <ImageIcon className="w-6 h-6 text-indigo-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{coverFile ? coverFile.name : 'Upload Cover Image'}</p>
                  <p className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</p>
                </label>

                <label className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                  <input type="file" accept=".pdf" className="hidden" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
                    <Upload className="w-6 h-6 text-emerald-500" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{pdfFile ? pdfFile.name : 'Upload PDF Copy'}</p>
                  <p className="text-xs text-slate-500 mt-1">For digital lending (Optional)</p>
                </label>
              </div>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/admin/books')}
            className="border-slate-200 text-slate-700"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
            {loading ? 'Saving...' : 'Save Book'}
          </Button>
        </div>
      </form>
    </div>
  );
}
