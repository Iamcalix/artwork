import React, { useState } from 'react';
import { Artwork, ArtworkFormData } from '@/types/artwork';
import { useArtworks, useArtworkMutations } from '@/hooks/useArtworks';
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  StarIcon,
  LogOutIcon,
  GridIcon,
  DollarIcon,
  ImageIcon,
  CheckIcon,
} from '../icons/Icons';
import ArtworkForm from './ArtworkForm';

interface AdminDashboardProps {
  onLogout: () => void;
  onBack: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onBack }) => {
  const { artworks, loading, refetch } = useArtworks();
  const { createArtwork, updateArtwork, deleteArtwork, loading: mutationLoading } = useArtworkMutations();
  const [showForm, setShowForm] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const stats = {
    total: artworks.length,
    available: artworks.filter((a) => a.is_available && !a.is_sold).length,
    sold: artworks.filter((a) => a.is_sold).length,
    featured: artworks.filter((a) => a.is_featured).length,
    totalValue: artworks.reduce((sum, a) => sum + a.price, 0),
  };

  const handleSubmit = async (data: ArtworkFormData) => {
    if (editingArtwork) {
      const { error } = await updateArtwork(editingArtwork.id, data);
      if (error) {
        alert('Failed to update artwork: ' + error);
        return;
      }
    } else {
      const { error } = await createArtwork({
        ...data,
        display_order: artworks.length + 1,
      } as any);
      if (error) {
        alert('Failed to create artwork: ' + error);
        return;
      }
    }
    setShowForm(false);
    setEditingArtwork(null);
    refetch();
  };

  const handleDelete = async (id: string) => {
    const { error } = await deleteArtwork(id);
    if (error) {
      alert('Failed to delete artwork: ' + error);
      return;
    }
    setDeleteConfirm(null);
    refetch();
  };

  const handleToggleFeatured = async (artwork: Artwork) => {
    await updateArtwork(artwork.id, { is_featured: !artwork.is_featured });
    refetch();
  };

  const handleToggleSold = async (artwork: Artwork) => {
    await updateArtwork(artwork.id, { is_sold: !artwork.is_sold, is_available: artwork.is_sold });
    refetch();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ← Back to Site
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="font-serif text-xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOutIcon size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <GridIcon className="text-blue-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-sm text-gray-500">Total Artworks</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckIcon className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.available}</p>
            <p className="text-sm text-gray-500">Available</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <ImageIcon className="text-red-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.sold}</p>
            <p className="text-sm text-gray-500">Sold</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <StarIcon className="text-amber-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.featured}</p>
            <p className="text-sm text-gray-500">Featured</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarIcon className="text-purple-600" size={20} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(stats.totalValue)}</p>
            <p className="text-sm text-gray-500">Total Value</p>
          </div>
        </div>

        {/* Artworks Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="font-serif text-xl font-bold text-gray-900">Manage Artworks</h2>
            <button
              onClick={() => {
                setEditingArtwork(null);
                setShowForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-colors"
            >
              <PlusIcon size={18} />
              <span>Add Artwork</span>
            </button>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-500 mx-auto" />
              <p className="text-gray-500 mt-4">Loading artworks...</p>
            </div>
          ) : artworks.length === 0 ? (
            <div className="p-8 text-center">
              <ImageIcon className="text-gray-300 mx-auto mb-4" size={48} />
              <p className="text-gray-500">No artworks yet. Add your first piece!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Artwork
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {artworks.map((artwork) => (
                    <tr key={artwork.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-4">
                          <img
                            src={artwork.image_url}
                            alt={artwork.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{artwork.title}</p>
                            <p className="text-sm text-gray-500">{artwork.dimensions}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {artwork.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900">
                          {formatPrice(artwork.price)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {artwork.is_sold ? (
                            <span className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                              Sold
                            </span>
                          ) : artwork.is_available ? (
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
                              Available
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                              Reserved
                            </span>
                          )}
                          {artwork.is_featured && (
                            <StarIcon className="text-amber-500 fill-amber-500" size={16} />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleFeatured(artwork)}
                            className={`p-2 rounded-lg transition-colors ${
                              artwork.is_featured
                                ? 'bg-amber-100 text-amber-600'
                                : 'hover:bg-gray-100 text-gray-400'
                            }`}
                            title={artwork.is_featured ? 'Remove from featured' : 'Add to featured'}
                          >
                            <StarIcon size={18} />
                          </button>
                          <button
                            onClick={() => handleToggleSold(artwork)}
                            className={`p-2 rounded-lg transition-colors ${
                              artwork.is_sold
                                ? 'bg-red-100 text-red-600'
                                : 'hover:bg-gray-100 text-gray-400'
                            }`}
                            title={artwork.is_sold ? 'Mark as available' : 'Mark as sold'}
                          >
                            <CheckIcon size={18} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingArtwork(artwork);
                              setShowForm(true);
                            }}
                            className="p-2 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <EditIcon size={18} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(artwork.id)}
                            className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <TrashIcon size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Artwork Form Modal */}
      {showForm && (
        <ArtworkForm
          artwork={editingArtwork}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowForm(false);
            setEditingArtwork(null);
          }}
          isLoading={mutationLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setDeleteConfirm(null)} />
          <div className="relative z-10 bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Delete Artwork?</h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. The artwork will be permanently removed.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
