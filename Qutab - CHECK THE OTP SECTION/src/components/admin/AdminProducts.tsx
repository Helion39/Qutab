import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

interface Product {
  id: number;
  name: string;
  type: string;
  weight: string;
  location: string;
  price: number;
  inStock: boolean;
  badge: 'verified' | 'bestseller' | null;
  image: string;
  inventory: number;
}

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Kambing Standard',
      type: 'TYPE A',
      weight: '~25-28 kg',
      location: 'West Java Farmers Group',
      price: 2500000,
      inStock: true,
      badge: 'verified',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC77I3-1OtvWdH2wGUjcQXUQTkNTnjEwx6qYbYPCyv2MbhiHixHIzdONsm9F4qvurREmgQNST84FVZJA6vy4szqPKkOo2kBHliP4EOoAhy2yMCTb1oXuZexVkXl5qXM0IHvLhCnXp8lHJ8vbKQpmGXqZAcL9mBn4B0vuf_vfmdVkdZLaBJYfQxwvS9yOumx9oPKgG8hep16JJZNhv_l4UgV67Uu83R5WGqizjgksxegpAkO2j4sXOgoKZ9BjGLK4mY5qD2Qa5DnRpM',
      inventory: 25,
    },
    {
      id: 2,
      name: 'Kambing Premium',
      type: 'TYPE B',
      weight: '~30-35 kg',
      location: 'Central Java Co-op',
      price: 3800000,
      inStock: true,
      badge: 'bestseller',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmh9t6CuT3s8TU_6A5oUHxkbViYdPL1jpW57akrkwqWJRxhTc42TGCFG1N5IU5xzRO3pYa_6rxB95xqRwr1HDp20ADh2Uao-QfBy8fo7BTSBrL85YOAqpbpuD17_UlTt3pwKTpoNiJwbFWGy4qJcbhOnNyIEYuwcLSlAhHP5tbMtZphFlZ3mROESp-GBjvXpYvupzzgA2MR35noqOJRs04bar9rqcWFusoc_rGIPoX5k6nPRlhSEtqCfyH-bvcJjZ1oFdeUmlObc',
      inventory: 18,
    },
    {
      id: 3,
      name: 'Sapi Kolektif (1/7)',
      type: 'SHARE',
      weight: 'Standard Cow',
      location: 'East Java Livestock',
      price: 2800000,
      inStock: true,
      badge: null,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiJYVFKvXtetjJKtBagYQW6k9cx3P5B6EgOHA8V5y7rlsdn1ytv9IwctM5C2QTIwUFovUOWwn6EqzYIPnDKuT6YMYGmN9bFiN4ca5eihHVYGFoTGDt8i-y-e5Mdo7mnMrSlSxYOcfFMNO_iPrpoCUB1ksGLab8-4pj5SvhMYPJsv9zol3tqBJL7wgGQguUfehW9vnw79zE4Xk0k0jR2LVtLHnWvW8UPdL54373aKEXb0-tkS2hdqZEtKGn7PP20nrjvp2lY5s-304',
      inventory: 42,
    },
    {
      id: 4,
      name: 'Sapi Utuh Standard',
      type: 'WHOLE',
      weight: '~220 kg',
      location: 'Sumatra Breeders',
      price: 19500000,
      inStock: true,
      badge: 'verified',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMiFHNj1aufs42MtquZhUEWh_kxpnaYO4wVxtwOxTfLhsL5NNZT82lrJmfsoYfLx63i0jxvL0Uj3lfi67OyU9bmF5QtQliivblaWWoWnzMX8EADqDTUYvvHo_RYMPN654HzCElwR4XBPHDPrsEjBWlccV6-C2c07V9JgakpciQ4WzQopoIm74FvoM4dJQifqH7q6SuGXO1cSmNvPIS8WAH_k4b_Umli4IVybKNLB4TnL7FjT55uPuO_lSPUDcZC3_1-F_H-08f2BE',
      inventory: 8,
    },
    {
      id: 5,
      name: 'Domba Garut Super',
      type: 'SPECIAL',
      weight: '~40 kg',
      location: 'Garut Farms',
      price: 4200000,
      inStock: true,
      badge: null,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmax_PeynDo-_WTUWPH79YoAKpNzA1Xqq8spVuPC5u3wJQP5AziOpwtTzZbNp90CSBdh9EhEM00vZTNZbcjdPDzRBMGAg8z9fBTr6-DVsGL4a3lqPwZscvspRJ_gIodPX7tU_hFSBGpg51ghx9qBGxfYacUAbSZda-YcydVPlseQ1AhyRir5u4bbdlKvkc0ixVlru_NbpU0e_MWKrgRw2E6llFC31GrO70RPfYiWj0522mPBZAbhdNMOLIZ_XA1vrohVWwMXPR830',
      inventory: 12,
    },
    {
      id: 6,
      name: 'Kambing Hemat',
      type: 'ECONOMY',
      weight: '~20 kg',
      location: 'Banten Village',
      price: 2100000,
      inStock: false,
      badge: null,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU8SaLUcUoxvxvdd7Q8eHKCeuiqXE_gjBFDKef4TODzDxrzIhM4D9ox4o-b33wOa8h9jY6i4pB-4Y5-Rq2YbV_Prqvg2gyGr8Snfgi2-vksO72ncmuOXXLyP02FAy9SAX5j26N6TTep9AO3rgeCi29_PfYLV1VBhhE9XPxttcyd1r2iLhJ1vA7ZXIBx-FNSLL6Oa_jcki7ClTUjKyGc2LbgtqCkwheVnAdh6GyVJj1Xjyw3h5KNDEXh2JS1fVAGA5eh11tW1P797g',
      inventory: 0,
    },
  ]);

  const [formData, setFormData] = useState<Partial<Product>>({});

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setFormData({
      name: '',
      type: '',
      weight: '',
      location: '',
      price: 0,
      inStock: true,
      badge: null,
      image: '',
      inventory: 0,
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSave = () => {
    if (selectedProduct) {
      // Update existing product
      setProducts(products.map((p) => (p.id === selectedProduct.id ? { ...selectedProduct, ...formData } : p)));
      alert('Product updated successfully!');
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Math.max(...products.map((p) => p.id)) + 1,
      } as Product;
      setProducts([...products, newProduct]);
      alert('Product added successfully!');
    }
    setShowModal(false);
    setIsEditing(false);
  };

  const handleDelete = (product: Product) => {
    if (confirm(`Are you sure you want to delete ${product.name}?`)) {
      setProducts(products.filter((p) => p.id !== product.id));
      alert('Product deleted successfully!');
    }
  };

  const toggleStock = (product: Product) => {
    setProducts(
      products.map((p) => (p.id === product.id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const stats = {
    total: products.length,
    inStock: products.filter((p) => p.inStock).length,
    outOfStock: products.filter((p) => !p.inStock).length,
    totalInventory: products.reduce((sum, p) => sum + p.inventory, 0),
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="inventory_2" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Products</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="check_circle" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.inStock}</p>
              <p className="text-sm text-gray-500">In Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
              <MaterialIcon icon="cancel" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.outOfStock}</p>
              <p className="text-sm text-gray-500">Out of Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <MaterialIcon icon="format_list_numbered" className="text-2xl" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalInventory}</p>
              <p className="text-sm text-gray-500">Total Inventory</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative w-full">
            <MaterialIcon
              icon="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleAddNew}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <MaterialIcon icon="add" className="text-xl" />
            Add New Product
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
              !product.inStock ? 'opacity-75' : ''
            }`}
          >
            <div className="relative h-48 bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    OUT OF STOCK
                  </span>
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-bold text-gray-900">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                    {product.type}
                  </span>
                  <span className="text-sm text-gray-500">{product.weight}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MaterialIcon icon="location_on" className="text-[16px]" />
                <span className="text-xs">{product.location}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="text-lg font-bold text-gray-900">
                    Rp {(product.price / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-gray-500">Stock: {product.inventory}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="size-8 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 flex items-center justify-center transition-colors"
                    title="Edit"
                  >
                    <MaterialIcon icon="edit" className="text-[18px]" />
                  </button>
                  <button
                    onClick={() => toggleStock(product)}
                    className={`size-8 rounded-lg ${
                      product.inStock
                        ? 'bg-green-100 hover:bg-green-200 text-green-600'
                        : 'bg-red-100 hover:bg-red-200 text-red-600'
                    } flex items-center justify-center transition-colors`}
                    title={product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                  >
                    <MaterialIcon icon={product.inStock ? 'check' : 'close'} className="text-[18px]" />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    className="size-8 rounded-lg bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors"
                    title="Delete"
                  >
                    <MaterialIcon icon="delete" className="text-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="size-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <MaterialIcon icon="close" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <input
                    type="text"
                    value={formData.type || ''}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Weight</label>
                  <input
                    type="text"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (Rp)</label>
                  <input
                    type="number"
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Inventory Count</label>
                  <input
                    type="number"
                    value={formData.inventory || 0}
                    onChange={(e) => setFormData({ ...formData, inventory: parseInt(e.target.value) })}
                    className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inStock || false}
                    onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">In Stock</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  {selectedProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 h-11 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}