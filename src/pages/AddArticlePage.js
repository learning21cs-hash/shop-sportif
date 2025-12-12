import { useState, useEffect } from 'react';
import '../styles/AddArticlePage.css';

export default function AddArticlePage() {
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    categorie: '',
    description: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingDocId, setEditingDocId] = useState(null);

  const API_URL = 'https://shop-api-strapi-1507f748e924.herokuapp.com/api/articles';
  const CATEGORIES_URL = 'https://shop-api-strapi-1507f748e924.herokuapp.com/api/categories';

  useEffect(() => {
    loadArticles();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch(CATEGORIES_URL);
      const data = await res.json();
      setCategories(data.data || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  const loadArticles = async () => {
    try {
      const res = await fetch(`${API_URL}?populate=*`);
      const data = await res.json();
      setArticles(data.data || []);
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

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
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
              nom: formData.nom,
              prix: parseFloat(formData.prix),
              categorie: formData.categorie,
              description: formData.description,
            },
          }),
        });

        if (!updateRes.ok) {
          const errorData = await updateRes.json();
          console.error('Erreur:', errorData);
          setMessage('❌ Erreur lors de la modification');
          setLoading(false);
          return;
        }

        if (imageFile) {
          const formDataImage = new FormData();
          formDataImage.append('files', imageFile);
          formDataImage.append('ref', 'api::article.article');
          formDataImage.append('refId', editingDocId);
          formDataImage.append('field', 'image');

          try {
            await fetch('https://shop-api-strapi-1507f748e924.herokuapp.com/api/upload', {
              method: 'POST',
              body: formDataImage,
            });
          } catch (err) {
            console.error('Erreur upload:', err);
          }
        }

        setMessage('✅ Article modifié !');
        setEditingDocId(null);
      } else {
        // CRÉER
        const articleRes = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: {
              nom: formData.nom,
              prix: parseFloat(formData.prix),
              categorie: formData.categorie,
              description: formData.description,
            },
          }),
        });

        if (!articleRes.ok) {
          setMessage('❌ Erreur lors de la création');
          setLoading(false);
          return;
        }

        const articleData = await articleRes.json();
        const articleId = articleData.data.id;

        if (imageFile) {
          const formDataImage = new FormData();
          formDataImage.append('files', imageFile);
          formDataImage.append('ref', 'api::article.article');
          formDataImage.append('refId', articleId);
          formDataImage.append('field', 'image');

          try {
            await fetch('https://shop-api-strapi-1507f748e924.herokuapp.com/api/upload', {
              method: 'POST',
              body: formDataImage,
            });
          } catch (err) {
            console.error('Erreur upload:', err);
          }
        }

        setMessage('✅ Article ajouté !');
      }

      setFormData({ nom: '', prix: '', categorie: '', description: '' });
      setImageFile(null);
      loadArticles();
    } catch (err) {
      setMessage('❌ Erreur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article) => {
    setEditingDocId(article.documentId);
    setFormData({
      nom: article.nom,
      prix: article.prix,
      categorie: article.categorie,
      description: article.description || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm('Supprimer cet article ?')) return;

    try {
      const res = await fetch(`${API_URL}/${documentId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('✅ Article supprimé !');
        loadArticles();
      } else {
        setMessage('❌ Erreur suppression');
      }
    } catch (err) {
      setMessage('❌ Erreur: ' + err.message);
    }
  };

  const handleCancel = () => {
    setEditingDocId(null);
    setFormData({ nom: '', prix: '', categorie: '', description: '' });
    setImageFile(null);
  };

  return (
    <div className="add-article-container">
      <h1>{editingDocId ? '✏️ Modifier' : '➕ Ajouter'}</h1>

      <form onSubmit={handleSubmit} className="add-article-form">
        <input type="text" name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        <input type="number" name="prix" placeholder="Prix" value={formData.prix} onChange={handleChange} step="0.01" required />
        
        {/* SELECT CATÉGORIES */}
        <select 
          name="categorie" 
          value={formData.categorie} 
          onChange={handleChange} 
          required
          className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
        >
          <option value="">-- Choisir une catégorie --</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows="4" />

        <div className="image-input-group">
          <label htmlFor="image-input">📷 Image :</label>
          <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} />
          {imageFile && <p className="file-name">✅ {imageFile.name}</p>}
        </div>

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

      <h2>📝 Articles ({articles.length})</h2>
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            {article.image && <img src={`https://shop-api-strapi-1507f748e924.herokuapp.com${article.image.url}`} alt={article.nom} className="article-image" />}
            <h3>{article.nom}</h3>
            <p className="price">💰 {article.prix}€</p>
            <p className="category">🏷️ {article.categorie}</p>
            {article.description && <p className="description">{article.description}</p>}
            
            <div className="article-buttons">
              <button onClick={() => handleEdit(article)} className="btn-edit">✏️ Modifier</button>
              <button onClick={() => handleDelete(article.documentId)} className="btn-delete">🗑️ Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}