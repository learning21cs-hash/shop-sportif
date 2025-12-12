import { useState } from 'react';
import '../styles/AddArticlePage.css';

export default function AddArticlePage() {
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    categorie: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState([]);

  const API_URL = 'https://shop-api-strapi-1507f748e924.herokuapp.com/api/articles';

  // Charger les articles au démarrage
  const loadArticles = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setArticles(data.data || []);
    } catch (err) {
      console.error('Erreur:', err);
    }
  };

  // Au chargement de la page
  useState(() => {
    loadArticles();
  }, []);

  // Gérer les changements du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Ajouter un article
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch(API_URL, {
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

      if (res.ok) {
        setMessage('✅ Article ajouté avec succès !');
        setFormData({ nom: '', prix: '', categorie: '', description: '' });
        loadArticles(); // Recharger la liste
      } else {
        setMessage('❌ Erreur lors de l\'ajout');
      }
    } catch (err) {
      setMessage('❌ Erreur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-article-container">
      <h1>Ajouter un Article</h1>

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
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Ajout en cours...' : 'Ajouter'}
        </button>
      </form>

      {message && <p className="message">{message}</p>}

      <h2>Articles ({articles.length})</h2>
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="article-item">
            <h3>{article.nom}</h3>
            <p>Prix: {article.prix}€</p>
            <p>Catégorie: {article.categorie}</p>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}