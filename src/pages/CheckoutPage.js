import { useState } from 'react';

export default function CheckoutPage({ cart, setCurrentPage, removeFromCart }) {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.prix * item.quantity), 0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const commandeDetails = cart.map(item => 
    `• ${item.nom} x${item.quantity} = ${item.prix * item.quantity} Dhs`
  ).join('\n');

  const message = `
NOUVELLE COMMANDE SPORT HORIZON
═══════════════════════════════════

CLIENT:
Nom: ${formData.prenom} ${formData.nom}
Email: ${formData.email}
Téléphone: ${formData.telephone}
Adresse: ${formData.adresse}

ARTICLES:
${commandeDetails}

═══════════════════════════════════
TOTAL: ${total} Dhs
═══════════════════════════════════
  `;

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: 'service_soyl595',
        template_id: 'template_ep7yisw',
        user_id: 'c9NCz7RplZ74zGGob',
        template_params: {
          to_email: 'learning21cs@gmail.com',
          from_email: formData.email,
          subject: `Commande ${formData.prenom} ${formData.nom}`,
          message: message,
          client_name: `${formData.prenom} ${formData.nom}`
        }
      })
    });

    if (response.ok) {
      setSuccess(true);
      setTimeout(() => setCurrentPage('home'), 3000);
    }
  } catch (error) {
    alert('Erreur: ' + error.message);
  }

  setLoading(false);
};

  if (success) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-green-100 border-2 border-green-500 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-4">✅ Commande confirmée !</h2>
          <p className="text-gray-700 mb-4">
            Merci pour votre achat ! Un email de confirmation a été envoyé.
          </p>
          <p className="text-sm text-gray-600">Redirection vers l'accueil...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <button
        onClick={() => setCurrentPage('cart')}
        className="mb-8 text-orange-500 hover:text-orange-600 font-semibold flex items-center gap-2"
      >
        ← Retour au panier
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Vos informations</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="prenom"
                placeholder="Prénom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            />

            <input
              type="tel"
              name="telephone"
              placeholder="Téléphone"
              value={formData.telephone}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
            />

            <textarea
              name="adresse"
              placeholder="Adresse complète"
              value={formData.adresse}
              onChange={handleChange}
              required
              rows="3"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none resize-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'En cours...' : '✅ Confirmer la commande'}
            </button>
          </form>
        </div>

        {/* Résumé */}
        <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white rounded-xl shadow-lg p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6">Résumé</h2>
          
          <div className="mb-6 space-y-3 max-h-96 overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm pb-3 border-b border-white border-opacity-20">
                <span>{item.nom} x{item.quantity}</span>
                <span className="font-semibold">{item.prix * item.quantity} Dhs</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white pt-4 mb-6">
            <div className="flex justify-between text-2xl font-bold">
              <span>Total :</span>
              <span className="text-orange-400">{total} Dhs</span>
            </div>
          </div>

          <div className="bg-blue-700 rounded-lg p-4 text-sm">
            <p className="mb-2">📦 Livraison gratuite</p>
            <p>🔒 Paiement sécurisé</p>
          </div>
        </div>
      </div>
    </main>
  );
}