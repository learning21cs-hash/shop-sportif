export default function Logo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      {/* Conteneur animé avec effet de pulse */}
      <div className="relative w-16 h-16">
        {/* Cercle extérieur animé (pulse) */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full animate-pulse opacity-30"></div>
        
        {/* Cercle qui tourne */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-900 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
        
        {/* Le logo au centre */}
        <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="/logo.jpeg" 
            alt="Sport Horizon" 
            className="w-full h-full object-cover hover:scale-110 transition duration-300"
          />
        </div>
      </div>

      {/* Texte avec gradient */}
      <div className="hidden sm:block">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-blue-900 bg-clip-text text-transparent">
          Sport Horizon
        </h1>
        <p className="text-xs text-gray-600 italic">Ensemble, construisons l'avenir</p>
      </div>
    </div>
  );
}