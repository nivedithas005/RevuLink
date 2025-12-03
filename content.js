import React, { useState, useEffect } from 'react';
import { Star, Search, Youtube, ThumbsUp, ThumbsDown, ExternalLink, Activity, BarChart3, ShoppingBag } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState('idle'); // idle, scanning, analyzing, complete
  const [product, setProduct] = useState(null);
  const [data, setData] = useState(null);

  // Mock Data mimicking a scrape from an E-commerce site
  const mockScrape = {
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: "$348.00",
    platform: "Amazon"
  };

  // Mock API Response mimicking your Python Backend
  const mockApiResponse = {
    aiScore: 8.7,
    sentiment: "Overwhelmingly Positive",
    totalReviewsScanned: 142,
    keywords: ["Noise Cancellation", "Comfort", "Battery Life", "Pricey"],
    pros: [
      "Industry-leading ANC",
      "Lightweight design",
      "30-hour battery life"
    ],
    cons: [
      "Non-foldable design",
      "Auto-ANC can be finicky"
    ],
    videos: [
      { id: 1, title: "Sony WH-1000XM5 Review: The New King?", channel: "MKBHD", thumb: "bg-red-100", sentiment: "Positive" },
      { id: 2, title: "Don't Buy Until You Watch This", channel: "Linus Tech Tips", thumb: "bg-orange-100", sentiment: "Neutral" },
      { id: 3, title: "Better than AirPods Max?", channel: "MrWhosetheboss", thumb: "bg-blue-100", sentiment: "Positive" }
    ]
  };

  const handleScan = () => {
    setStatus('scanning');
    
    // Simulate Content Script Scraping
    setTimeout(() => {
      setProduct(mockScrape);
      setStatus('analyzing');
      
      // Simulate Backend AI Processing
      setTimeout(() => {
        setData(mockApiResponse);
        setStatus('complete');
      }, 2000);
    }, 1500);
  };

  const reset = () => {
    setStatus('idle');
    setProduct(null);
    setData(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans text-slate-800">
      
      {/* Simulation Container - Represents the Chrome Popup dimensions */}
      <div className="w-[360px] h-[600px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col relative border border-gray-200">
        
        {/* Header */}
        <div className="bg-indigo-600 p-4 flex items-center justify-between text-white shadow-md z-10">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <h1 className="font-bold text-lg tracking-wide">RevuLink</h1>
          </div>
          <span className="text-xs bg-indigo-500 px-2 py-1 rounded-full border border-indigo-400">v1.0 Beta</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          
          {/* IDLE STATE */}
          {status === 'idle' && (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center space-y-6">
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center animate-pulse">
                <ShoppingBag className="w-10 h-10 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Ready to Analyze</h2>
                <p className="text-sm text-gray-500 mt-2">Navigate to an Amazon or Flipkart product page and click the button below.</p>
              </div>
              <button 
                onClick={handleScan}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 shadow-lg"
              >
                <Search className="w-4 h-4" />
                Analyze Page
              </button>
            </div>
          )}

          {/* SCANNING / LOADING STATE */}
          {(status === 'scanning' || status === 'analyzing') && (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h3 className="font-semibold text-lg text-gray-800">
                {status === 'scanning' ? 'Identifying Product...' : 'Gathering Social Data...'}
              </h3>
              <p className="text-xs text-gray-500 max-w-[200px]">
                {status === 'scanning' 
                  ? 'Reading page metadata...' 
                  : 'Scanning YouTube & Reddit for user sentiment...'}
              </p>
            </div>
          )}

          {/* COMPLETE STATE */}
          {status === 'complete' && data && (
            <div className="p-0">
              {/* Product Header */}
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <h2 className="font-semibold text-sm text-gray-800 line-clamp-2 leading-tight">{product.title}</h2>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-mono text-gray-500 bg-white px-2 py-0.5 border rounded">{product.platform}</span>
                  <span className="text-sm font-bold text-indigo-600">{product.price}</span>
                </div>
              </div>

              {/* AI Score Section */}
              <div className="p-5 flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                <div>
                  <p className="text-xs opacity-80 uppercase tracking-wider font-semibold">AI Confidence Score</p>
                  <p className="text-xs opacity-70 mt-1">{data.totalReviewsScanned} signals processed</p>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold">{data.aiScore}</span>
                  <div className="flex mt-1">
                    {[1,2,3,4,5].map((s) => (
                       <Star key={s} className={`w-3 h-3 ${s <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 fill-gray-300'}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sentiment Analysis */}
              <div className="p-4 space-y-4">
                
                {/* Pros/Cons */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                    <div className="flex items-center gap-1.5 text-green-700 mb-2">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs font-bold uppercase">Pros</span>
                    </div>
                    <ul className="text-xs text-green-800 space-y-1">
                      {data.pros.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                    <div className="flex items-center gap-1.5 text-red-700 mb-2">
                      <ThumbsDown className="w-3 h-3" />
                      <span className="text-xs font-bold uppercase">Cons</span>
                    </div>
                    <ul className="text-xs text-red-800 space-y-1">
                      {data.cons.map((p, i) => <li key={i}>• {p}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Video Reviews */}
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Youtube className="w-4 h-4 text-red-600" />
                    Video Insights
                  </h3>
                  <div className="space-y-3">
                    {data.videos.map((video) => (
                      <div key={video.id} className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group border border-transparent hover:border-gray-200">
                        <div className={`w-20 h-14 ${video.thumb} rounded-md flex-shrink-0 flex items-center justify-center`}>
                          <Youtube className="w-6 h-6 text-white opacity-80" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                            {video.title}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] text-gray-500">{video.channel}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${video.sentiment === 'Positive' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                              {video.sentiment}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {status === 'complete' && (
          <div className="p-3 bg-gray-50 border-t border-gray-200 flex justify-between">
            <button onClick={reset} className="text-xs font-medium text-gray-500 hover:text-gray-800 px-3 py-2">
              Back
            </button>
            <button className="text-xs bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center gap-2">
              Full Report <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-gray-500 text-xs text-center max-w-sm">
        This is an interactive simulation of the RevuLink Chrome Extension. 
        <br/>In the actual extension, this UI would appear when clicking the browser toolbar icon.
      </p>
    </div>
  );
}
