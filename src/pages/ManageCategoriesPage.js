import { useState, useEffect } from 'react';
import '../styles/ManageCategoriesPage.css';

export default function ManageCategoriesPage() {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingDocId, setEditingDocId] = useState(null);

  const API_URL = 'https://shop-api-strapi-1507f748e924.herokuapp.com/api/categories';

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch(`${API_URL}?populate=*`);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (editingDocId) {
        // MODIFIER
        const updateRes = await fetch(`${API_URL}/${editingDocId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              name: formData.name,
            },
          }),
        });

        if (!updateRes.ok) {
          setMessage('❌ Erreur lors de la modification');
          setLoading(false);
          return;
        }

        setMessage('✅ Catégorie modifiée !');
        setEditingDocId(null);
      } else {
        // CRÉER
        const categoryRes = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              name: formData.name,
            },
          }),
        });

        if (!categoryRes.ok) {
          setMessage('❌ Erreur lors de la création');
          setLoading(false);
          return;
        }

        setMessage('✅ Catégorie ajoutée !');
      }

      setFormData({ name: '' });
      loadCategories();
    } catch (err) {
      setMessage('❌ Erreur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setEditingDocId(category.documentId);
    setFormData({
      name: category.name,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm('Supprimer cette catégorie ?')) return;

    try {
      const res = await fetch(`${API_URL}/${documentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('✅ Catégorie supprimée !');
        loadCategories();
      } else {
        setMessage('❌ Erreur suppression');
      }
    } catch (err) {
      setMessage('❌ Erreur: ' + err.message);
    }
  };

  const handleCancel = () => {
    setEditingDocId(null);
    setFormData({ name: '' });
  };

  return (
    <div className="manage-categories-container">
      <h1>{editingDocId ? '✏️ Modifier Catégorie' : '➕ Ajouter Catégorie'}</h1>

      <form onSubmit={handleSubmit} className="category-form">
        <input 
          type="text" 
          name="name" 
          placeholder="Nom de la catégorie" 
          value={formData.name} 
          onChange={handleChange} 
          required 
        />

        <div className="form-buttons">
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? '⏳ ...' : (editingDocId ? '✏️ Modifier' : '➕ Ajouter')}
          </button>
          {editingDocId && (
            <button type="button" onClick={handleCancel} className="btn-cancel">
              ✖️ Annuler
            </button>
          )}
        </div>
      </form>

      {message && <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>{message}</p>}

      <h2>📋 Catégories ({categories.length})</h2>
      <div className="categories-list">
        {categories.length === 0 ? (
          <p>Aucune catégorie</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="category-item">
              <h3>{category.name}</h3>
              <div className="category-buttons">
                <button onClick={() => handleEdit(category)} className="btn-edit">
                  ✏️ Modifier
                </button>
                <button onClick={() => handleDelete(category.documentId)} className="btn-delete">
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}