
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const cooperativeData = [
  { country: 'UAE', cooperatives: 120, members: 12000 },
  { country: 'Saudi Arabia', cooperatives: 150, members: 18500 },
  { country: 'Kuwait', cooperatives: 80, members: 8200 },
  { country: 'Qatar', cooperatives: 45, members: 4800 },
  { country: 'Bahrain', cooperatives: 35, members: 3500 },
  { country: 'Oman', cooperatives: 70, members: 7500 },
];

const sectorData = [
  { name: 'Agriculture', value: 35, color: '#22c55e' },
  { name: 'Housing', value: 25, color: '#1e40af' },
  { name: 'Consumer', value: 20, color: '#0891b2' },
  { name: 'Services', value: 12, color: '#d4af37' },
  { name: 'Industrial', value: 8, color: '#f3e8d0' },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gulf-cream/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gulf-navy mb-6">
            Gulf Cooperatives at a Glance
          </h2>
          <p className="text-lg text-gulf-navy/70 max-w-2xl mx-auto">
            Comprehensive data on cooperative development across the Gulf region, 
            showcasing growth, diversity, and economic impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Bar Chart - Cooperatives by Country */}
          <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
            <h3 className="text-2xl font-bold text-gulf-navy mb-6">
              Cooperatives by Country
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cooperativeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="country" 
                  tick={{ fontSize: 12 }}
                  stroke="#64748b"
                />
                <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="cooperatives" fill="#1e40af" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Sectors */}
          <div className="bg-white p-8 rounded-2xl shadow-lg card-hover">
            <h3 className="text-2xl font-bold text-gulf-navy mb-6">
              Cooperatives by Sector (%)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sectorData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg card-hover text-center">
            <div className="w-12 h-12 bg-gulf-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gulf-blue">🏢</span>
            </div>
            <div className="text-3xl font-bold text-gulf-navy mb-2">500+</div>
            <div className="text-gulf-navy/70">Total Cooperatives</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg card-hover text-center">
            <div className="w-12 h-12 bg-gulf-teal/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gulf-teal">👥</span>
            </div>
            <div className="text-3xl font-bold text-gulf-navy mb-2">54K+</div>
            <div className="text-gulf-navy/70">Active Members</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg card-hover text-center">
            <div className="w-12 h-12 bg-gulf-green/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gulf-green">💰</span>
            </div>
            <div className="text-3xl font-bold text-gulf-navy mb-2">$2.1B</div>
            <div className="text-gulf-navy/70">Economic Impact</div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg card-hover text-center">
            <div className="w-12 h-12 bg-gulf-gold/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-gulf-gold">📈</span>
            </div>
            <div className="text-3xl font-bold text-gulf-navy mb-2">18%</div>
            <div className="text-gulf-navy/70">Annual Growth</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
