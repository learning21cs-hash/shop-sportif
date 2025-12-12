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

  const API_URL = 'https://shop-api-strapi-1507f748e924.herokuapp.com/api/articles';

  // Charger les articles au démarrage
  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      const res = await fetch(`${API_URL}?populate=*`);
      const data = await res.json();
      setArticles(data.data || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // Gérer les changements du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Ajouter un article avec image
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Créer l'article d'abord
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
        setMessage('❌ Erreur lors de la création de l\'article');
        setLoading(false);
        return;
      }

      const articleData = await articleRes.json();
      const articleId = articleData.data.id;

      // Upload l'image si elle existe
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
          console.error('Erreur upload image:', err);
        }
      }

      setMessage('✅ Article ajouté avec succès !');
      setFormData({ nom: '', prix: '', categorie: '', description: '' });
      setImageFile(null);
      loadArticles();
    } catch (err) {
      setMessage('❌ Erreur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-article-container">
      <h1>➕ Ajouter un Article</h1>

      <form onSubmit={handleSubmit} className="add-article-form">
        <input
          type="text"
          name="nom"
          placeholder="Nom de l'article"
          value={formData.nom}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="prix"
          placeholder="Prix"
          value={formData.prix}
          onChange={handleChange}
          step="0.01"
          required
        />

        <input
          type="text"
          name="categorie"
          placeholder="Catégorie"
          value={formData.categorie}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />

        <div className="image-input-group">
          <label htmlFor="image-input">📷 Ajouter une image :</label>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageFile && <p className="file-name">✅ {imageFile.name}</p>}
        </div>

        <button type="submit" disabled={loading} className="btn-submit">
          {loading ? '⏳ Ajout en cours...' : '➕ Ajouter'}
        </button>
      </form>

      {message && (
        <p className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}

      <h2>📝 Articles ({articles.length})</h2>
      <div className="articles-list">
        {articles.length === 0 ? (
          <p className="no-articles">Aucun article pour le moment</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="article-item">
              {article.image && (
                <img
                  src={`https://shop-api-strapi-1507f748e924.herokuapp.com${article.image.url}`}
                  alt={article.nom}
                  className="article-image"
                />
              )}
              <h3>{article.nom}</h3>
              <p className="price">💰 {article.prix}€</p>
              <p className="category">🏷️ {article.categorie}</p>
              {article.description && <p className="description">{article.description}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}