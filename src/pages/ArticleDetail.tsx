
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, ArrowLeft, Clock, User, Tag } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguage } from '../contexts/LanguageContext';

const ArticleDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  // Mock article data - in a real app, this would come from an API
  const articles = [
    {
      id: 1,
      title: "The Future of Agricultural Cooperatives in the UAE",
      excerpt: "Exploring how technology and innovation are transforming agricultural cooperatives across the Emirates, creating sustainable food systems.",
      content: `
        <p>Agricultural cooperatives in the UAE are experiencing a revolutionary transformation through the integration of advanced technology and innovative farming practices. This comprehensive analysis explores the current state and future prospects of these vital organizations.</p>
        
        <h2>Current State of Agricultural Cooperatives</h2>
        <p>The UAE's agricultural sector has historically faced challenges due to the arid climate and limited water resources. However, cooperatives have emerged as a solution, pooling resources and knowledge to overcome these obstacles.</p>
        
        <h2>Technological Innovations</h2>
        <p>Modern agricultural cooperatives are adopting cutting-edge technologies including:</p>
        <ul>
          <li>Smart irrigation systems that optimize water usage</li>
          <li>Precision agriculture tools for crop monitoring</li>
          <li>Automated greenhouse systems</li>
          <li>Blockchain technology for supply chain transparency</li>
        </ul>
        
        <h2>Sustainable Practices</h2>
        <p>Sustainability is at the core of modern cooperative operations, with focus on renewable energy, organic farming methods, and circular economy principles.</p>
        
        <h2>Future Outlook</h2>
        <p>The future of agricultural cooperatives in the UAE looks promising, with government support and increasing investment in agtech startups driving innovation and growth.</p>
      `,
      author: "Dr. Ahmed Al-Mansouri",
      date: "2024-06-20",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=500&fit=crop",
      readTime: "5",
      tags: ["Agriculture", "Technology", "UAE", "Sustainability"]
    },
    {
      id: 2,
      title: "Housing Cooperatives: A Solution for Gulf Youth",
      excerpt: "How housing cooperatives are addressing the growing need for affordable housing among young professionals in Gulf cities.",
      content: `
        <p>Housing cooperatives represent a promising solution to the growing housing affordability crisis facing young professionals across Gulf cities. This article examines the potential and challenges of this cooperative model.</p>
        
        <h2>The Housing Challenge</h2>
        <p>Rising property prices and stagnant wages have created a significant gap between housing costs and affordability for young professionals in major Gulf cities.</p>
        
        <h2>Cooperative Housing Model</h2>
        <p>Housing cooperatives offer an alternative ownership model where residents collectively own and manage their housing development, reducing costs and increasing community engagement.</p>
        
        <h2>Success Stories</h2>
        <p>Several pilot projects across the Gulf region have demonstrated the viability of cooperative housing, showing cost savings of 20-30% compared to traditional housing models.</p>
        
        <h2>Implementation Challenges</h2>
        <p>Key challenges include regulatory frameworks, financing mechanisms, and cultural acceptance of cooperative ownership models.</p>
        
        <h2>Policy Recommendations</h2>
        <p>Governments can support housing cooperatives through enabling legislation, financial incentives, and public-private partnerships.</p>
      `,
      author: "Sarah Al-Zahra",
      date: "2024-06-18",
      category: "Housing",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
      readTime: "4",
      tags: ["Housing", "Youth", "Gulf", "Affordability"]
    },
    {
      id: 3,
      title: "Digital Transformation in Consumer Cooperatives",
      excerpt: "Case studies on how consumer cooperatives in Saudi Arabia are leveraging digital platforms to enhance member experience.",
      content: `
        <p>Consumer cooperatives in Saudi Arabia are undergoing a digital transformation that is revolutionizing how they serve their members and operate their businesses.</p>
        
        <h2>Digital Platform Integration</h2>
        <p>Modern consumer cooperatives are implementing comprehensive digital platforms that include e-commerce capabilities, mobile applications, and integrated inventory management systems.</p>
        
        <h2>Case Study: Riyadh Consumer Cooperative</h2>
        <p>The Riyadh Consumer Cooperative successfully implemented a digital transformation strategy that resulted in a 40% increase in member engagement and 25% improvement in operational efficiency.</p>
        
        <h2>Mobile Application Features</h2>
        <p>Key features driving member adoption include:</p>
        <ul>
          <li>Online ordering and delivery services</li>
          <li>Digital loyalty programs</li>
          <li>Real-time inventory tracking</li>
          <li>Community forums and feedback systems</li>
        </ul>
        
        <h2>Challenges and Solutions</h2>
        <p>While digital transformation brings many benefits, cooperatives face challenges in staff training, technology adoption, and maintaining the cooperative spirit in digital interactions.</p>
        
        <h2>Future Innovations</h2>
        <p>Emerging technologies like AI-powered recommendation systems and IoT-enabled supply chain management are set to further transform the sector.</p>
      `,
      author: "Mohammad Al-Rashid",
      date: "2024-06-15",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      readTime: "6",
      tags: ["Technology", "Digital", "Consumer", "Saudi Arabia"]
    }
  ];

  const article = articles.find(a => a.id === parseInt(id || '1'));

  if (!article) {
    return (
      <div className="min-h-screen bg-gulf-white">
        <Header />
        <main className="pt-20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-gulf-dark mb-4">Article Not Found</h1>
            <p className="text-gulf-dark/70 mb-8">The article you're looking for doesn't exist.</p>
            <Link to="/article" className="btn-primary">
              Back to Articles
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gulf-white">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-gulf-secondary/30 to-gulf-white">
          <div className="container mx-auto px-4">
            <Link 
              to="/article" 
              className="inline-flex items-center text-gulf-primary hover:text-gulf-coral transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Link>
            
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <span className="bg-gulf-primary text-gulf-white px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gulf-dark mb-6">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-gulf-dark/70 mb-8">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>
              
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gulf-dark/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gulf-light">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-gulf-dark/60" />
                  {article.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-gulf-secondary/30 text-gulf-dark px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Author Info */}
              <div className="mt-8 p-6 bg-gulf-secondary/20 rounded-2xl">
                <h3 className="text-xl font-bold text-gulf-dark mb-2">About the Author</h3>
                <p className="text-gulf-dark/70">
                  <strong>{article.author}</strong> is an expert in cooperative development and 
                  sustainable business practices in the Gulf region.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;