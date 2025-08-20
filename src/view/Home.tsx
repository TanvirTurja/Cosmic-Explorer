import React from 'react';
import Nav from '../component/Nav';
import Footer from '../component/Footer';

const Home = () => {
  // Statistics data
  const stats = [
    { value: '12,862', label: 'Monitored Cosmic Objects' },
    { value: '142', label: 'Currently Active' },
    { value: '24/7', label: 'Real-Time Updates' },
    { value: '99.9%', label: 'Uptime Reliability' }
  ];

  // Cosmic object activity data
  const cosmicObjectData = [
    {
      name: 'Sagittarius A*',
      category: 'Black Holes',
      status: 'active',
      date: '2.3 hrs ago',
      description: 'High X-ray emissions detected'
    },
    {
      name: 'Andromeda Galaxy',
      category: 'Galaxies',
      status: 'quiet',
      date: '6 days ago',
      description: 'Stable spiral structure observed'
    },
    {
      name: 'Orion Nebula',
      category: 'Nebulae',
      status: 'monitoring',
      date: 'Live',
      description: 'New star formation in progress'
    }
  ];

  // Features data
  const features = [
    {
      title: 'Live Activity Feed',
      description: 'Monitor cosmic phenomena in real-time using NASA\'s space telescope network.',
      icon: '🌌',
    },
    {
      title: 'NASA Data Integration',
      description: 'Direct feeds from Chandra X-ray Observatory, Hubble Space Telescope, and James Webb Space Telescope observations.',
      icon: '📡',
    },
    {
      title: 'Instant Alerts',
      description: 'Get notified when cosmic objects show unusual activity or new discoveries are made.',
      icon: '⚡',
    },
  ];

   const dataSources = [
    { name: 'Chandra X-ray', description: 'High-energy emissions', icon: '🔭' },
    { name: 'Hubble Space', description: 'Optical observations', icon: '🌟' },
    { name: 'James Webb', description: 'Infrared imaging', icon: '🔴' },
    { name: 'Swift Gamma', description: 'Burst detection', icon: '⚡' }
  ];

  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Navigation */}
      <Nav />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background stars */}
        <div className="absolute inset-0">
          <div className="absolute w-1 h-1 bg-white rounded-full top-1/4 left-1/12 animate-pulse"></div>
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full top-1/3 right-1/5 animate-pulse delay-300"></div>
          <div className="absolute w-1.5 h-1.5 bg-white rounded-full bottom-1/3 left-1/5 animate-pulse delay-700"></div>
          <div className="absolute w-0.5 h-0.5 bg-white rounded-full bottom-1/5 right-1/4 animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            {/* Floating Cosmic Object Animation */}
            <div className="mb-12 flex justify-center">
              <div className="relative animate-pulse">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-black rounded-full border-4 border-orange-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-conic from-orange-500 via-red-500 to-yellow-400 opacity-80 animate-spin"></div>
                  <div className="absolute inset-3 bg-black rounded-full"></div>
                </div>
                <div className="absolute -inset-8 bg-gradient-radial from-orange-500/20 to-transparent rounded-full blur-xl"></div>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                COSMIC PHENOMENA
              </span>
              <br />
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                EXPLORER
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Track real-time cosmic activity across the universe using NASA's most advanced space telescopes. 
              Monitor black holes, galaxies, nebulae, and other celestial wonders as they evolve.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a 
                href="/explorer" 
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                Start Exploring Now
              </a>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Live Status Indicators */}
            <div className="flex justify-center space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">142 Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-gray-400">12,678 Quiet</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-yellow-400">42 Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 orbitron">
                <span className="gradient-text">Real-Time Cosmic Monitoring</span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
                
                <div className="glassmorphism p-8 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">🌌</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 orbitron">Live Activity Feed</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Monitor cosmic phenomena in real-time using NASA's space telescope network.
                    </p>
                </div>

                
                <div className="glassmorphism p-8 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">📡</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 orbitron">NASA Data Integration</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Direct feeds from Chandra X-ray Observatory, Hubble Space Telescope, and James Webb Space Telescope observations.
                    </p>
                </div>

               
                <div className="glassmorphism p-8 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl mb-6 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 orbitron">Instant Alerts</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Get notified when cosmic objects show unusual activity or new discoveries are made.
                    </p>
                </div>
            </div>
        </div>
    </section>

      {/* Live Dashboard Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Live Explorer Preview
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See which cosmic objects are active right now
            </p>
          </div>
          
          {/* Mock Dashboard */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cosmicObjectData.map((object, index) => {
                const statusColors = {
                  active: 'border-green-500/30 hover:border-green-500/50',
                  quiet: 'border-gray-600/30 hover:border-gray-500/50', 
                  monitoring: 'border-yellow-500/30 hover:border-yellow-500/50'
                };
                
                const statusIndicators = {
                  active: 'bg-green-400 animate-pulse',
                  quiet: 'bg-gray-400',
                  monitoring: 'bg-yellow-400 animate-pulse'
                };
                
                const statusLabels = {
                  active: 'ACTIVE',
                  quiet: 'QUIET',
                  monitoring: 'MONITORING'
                };

                return (
                  <div key={index} className={`bg-gray-900/50 p-6 rounded-xl border transition-all cursor-pointer hover:transform hover:scale-105 ${statusColors[object.status as keyof typeof statusColors]}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${statusIndicators[object.status as keyof typeof statusIndicators]}`}></div>
                        <span className={`font-semibold text-sm ${object.status === 'active' ? 'text-green-400' : object.status === 'monitoring' ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {statusLabels[object.status as keyof typeof statusLabels]}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">{object.date}</span>
                    </div>
                    <h4 className="font-bold text-lg mb-2 font-mono">{object.name}</h4>
                    <p className="text-sm text-gray-300 mb-3">{object.category}</p>
                    <div className="text-xs text-gray-400">
                      {object.description}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="/explorer" 
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 inline-block"
              >
                View Full Explorer →
              </a>
            </div>
          </div>
        </div>
      </section>

    <section id="data" className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-16 orbitron gradient-text">
                Powered by NASA's Elite Observatory Network
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                <div className="glassmorphism p-6 rounded-xl hover:bg-white/10 transition-all">
                    <div className="text-3xl mb-3">🔭</div>
                    <h4 className="font-bold orbitron mb-2">Chandra X-ray</h4>
                    <p className="text-sm text-gray-400">High-energy emissions</p>
                </div>
                <div className="glassmorphism p-6 rounded-xl hover:bg-white/10 transition-all">
                    <div className="text-3xl mb-3">🌟</div>
                    <h4 className="font-bold orbitron mb-2">Hubble Space</h4>
                    <p className="text-sm text-gray-400">Optical observations</p>
                </div>
                <div className="glassmorphism p-6 rounded-xl hover:bg-white/10 transition-all">
                    <div className="text-3xl mb-3">🔴</div>
                    <h4 className="font-bold orbitron mb-2">James Webb</h4>
                    <p className="text-sm text-gray-400">Infrared imaging</p>
                </div>
                <div className="glassmorphism p-6 rounded-xl hover:bg-white/10 transition-all">
                    <div className="text-3xl mb-3">⚡</div>
                    <h4 className="font-bold orbitron mb-2">Swift Gamma</h4>
                    <p className="text-sm text-gray-400">Burst detection</p>
                </div>
            </div>
        </div>
    </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 orbitron gradient-text">
                How It Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold orbitron">
                        1
                    </div>
                    <h3 className="text-xl font-bold mb-4 orbitron">Data Collection</h3>
                    <p className="text-gray-300">
                        NASA telescopes continuously scan the universe, detecting emissions, gravitational waves, and optical changes from cosmic objects.
                    </p>
                </div>
                
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold orbitron">
                        2
                    </div>
                    <h3 className="text-xl font-bold mb-4 orbitron">Real-Time Analysis</h3>
                    <p className="text-gray-300">
                        Our algorithms process NASA data streams instantly, identifying active phenomena, emissions, and gravitational anomalies.
                    </p>
                </div>
                
                <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold orbitron">
                        3
                    </div>
                    <h3 className="text-xl font-bold mb-4 orbitron">Live Dashboard</h3>
                    <p className="text-gray-300">
                        Get instant updates on cosmic activity with interactive visualizations, detailed NASA imagery, and scientific explanations.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
            <div className="glassmorphism rounded-3xl p-12">
                <h2 className="text-4xl font-bold mb-6 orbitron gradient-text">
                    Ready to Explore the Universe's Most Extreme Objects?
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                    Join thousands of space enthusiasts monitoring cosmic phenomena in real-time.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/explorer" 
                      className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 pulse-glow"
                    >
                        Launch Cosmic Explorer
                    </a>
                    <button className="border border-white/30 hover:border-white/50 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all">
                        Learn More
                    </button>
                </div>
                
                <p className="text-sm text-gray-400 mt-6">
                    Free to use • Real NASA data • No registration required
                </p>
            </div>
        </div>
    </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
