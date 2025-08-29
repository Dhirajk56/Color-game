import { useState } from "react";
import { Play, Users, Gamepad2, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function FunGamesHomepage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const games = [
    {
      id: 1,
      title: "Memory Game",
      description: "Challenge your mind with your friend",
      icon: <Target className="w-8 h-8" />,
      difficulty: "Hard",
      players: "1-2",
      gradient: "from-orange-500 via-pink-500 to-red-600",
      glowColor: "shadow-orange-500/50",
      route: "/memory",
    },
    {
      id: 2,
      title: "Color Tube",
      description: "Match the Color",
      icon: <Users className="w-8 h-8" />,
      difficulty: "Medium",
      players: "1",
      gradient: "from-indigo-600 via-purple-600 to-pink-600",
      glowColor: "shadow-indigo-500/50",
      route: "/color",
    },
    {
      id: 3,
      title: "Tic-Tac-Toe",
      description: "Retro games",
      icon: <Gamepad2 className="w-8 h-8" />,
      difficulty: "Easy",
      players: "1-2",
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      glowColor: "shadow-cyan-500/50",
      route: "/tic-tac-toe",
    },
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400 bg-green-400/20";
      case "Medium":
        return "text-yellow-400 bg-yellow-400/20";
      case "Hard":
        return "text-red-400 bg-red-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const startGame = (gameRoute, gameTitle) => {
    navigate(gameRoute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex justify-center items-center flex-col gap-20">
        {/* Header */}
        <header className="text-center py-16 px-4 flex justify-center items-center flex-col ">
          <div className="mb-8">
            <h1 className="text-7xl md:text-8xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 tracking-tight">
              Fun Games
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-600 to-pink-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Dive into worlds of endless adventure and excitement. Choose your
            quest!
          </p>
        </header>

        {/* Games Grid */}
        <main className="px-4 pb-16 ">
          <div className="max-w-7xl mx-auto flex justify-evenly ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-30 ">
              {games.map((game) => (
                <div
                  key={game.id}
                  className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden cursor-pointer transition-all duration-500 hover:scale-105 hover:${game.glowColor} hover:shadow-2xl shadow-lg`}
                  onMouseEnter={() => setHoveredCard(game.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => startGame(game.route, game.title)}
                >
                  {/* Card Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative p-8">
                    {/* Game Icon */}
                    <div
                      className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${game.gradient} inline-block transform group-hover:rotate-12 transition-transform duration-300`}
                    >
                      <div className="text-white">{game.icon}</div>
                    </div>

                    {/* Game Title */}
                    <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {game.title}
                    </h3>

                    {/* Game Description */}
                    <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300">
                      {game.description}
                    </p>

                    {/* Game Stats */}
                    <div className="flex items-center space-x-4 mb-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                          game.difficulty
                        )}`}
                      >
                        {game.difficulty}
                      </span>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Users className="w-4 h-4 mr-1" />
                        {game.players}
                      </div>
                    </div>

                    {/* Play Button */}
                    <button
                      className={`w-full py-4 rounded-xl bg-gradient-to-r ${game.gradient} text-white font-bold text-lg flex items-center justify-center space-x-2 transform transition-all duration-300 hover:shadow-lg group-hover:scale-105`}
                      onClick={(e) => {
                        e.stopPropagation();
                        startGame(game.route, game.title);
                      }}
                    >
                      <Play className="w-5 h-5" />
                      <span>Play Now</span>
                    </button>

                    {/* Hover Effect Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${game.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl`}
                    ></div>
                  </div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500"></div>

                  {/* Corner Glow Effect */}
                  <div
                    className={`absolute -top-1 -right-1 w-24 h-24 bg-gradient-to-br ${game.gradient} rounded-full opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer Stats */}
        <footer className="text-center py-12 px-4 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">3+</div>
              <div className="text-gray-600">Games Available</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
