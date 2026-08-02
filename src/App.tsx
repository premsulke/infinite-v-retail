import { useState, useEffect } from 'react';
import { VR_HEADSETS } from './data/headsets';
import { VRHeadset, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroContent } from './components/HeroContent';
import { ProductSelector } from './components/ProductSelector';
import { Headset3DShowcase } from './components/Headset3DShowcase';
import { GatewayDashboard } from './components/GatewayDashboard';
import { SpecsPage } from './pages/SpecsPage';
import { ModelsPage } from './pages/ModelsPage';
import { AuthPage } from './pages/AuthPage';
import { ExportSourceModal } from './components/ExportSourceModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { User, apiGetMe } from './utils/authApi';

export default function App() {
  const [selectedHeadset, setSelectedHeadset] = useState<VRHeadset>(VR_HEADSETS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'specs' | 'models' | 'gateway' | 'auth'>('home');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isExporterOpen, setIsExporterOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize session user on launch
  useEffect(() => {
    async function loadUser() {
      const user = await apiGetMe();
      if (user) setCurrentUser(user);
    }
    loadUser();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (headset: VRHeadset) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.headset.id === headset.id);
      if (existing) {
        return prev.map((item) =>
          item.headset.id === headset.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { headset, quantity: 1 }];
    });
    showToast(`Added ${headset.name} to cart!`);
  };

  const handlePreOrder = (headset: VRHeadset) => {
    handleAddToCart(headset);
    setIsCartOpen(true);
  };

  const handleGetStarted = () => {
    if (activeTab === 'home') {
      const el = document.getElementById('gateway-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActiveTab('gateway');
      }
    } else {
      setActiveTab('gateway');
    }
  };

  const handleUpdateQuantity = (headsetId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.headset.id === headsetId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (headsetId: string) => {
    setCartItems((prev) => prev.filter((item) => item.headset.id !== headsetId));
  };

  const handleCheckout = () => {
    showToast('Order submitted! Redirecting to secure retail payment gateway...');
    setCartItems([]);
    setIsCartOpen(false);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-x-hidden selection:bg-[#FF5B00] selection:text-black scroll-smooth">
      {/* Background Video Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-0 opacity-70 pointer-events-none"
        src="https://res.cloudinary.com/x4yunbqw/video/upload/v1785606524/kling_20260516_Image_to_Video__4121_0_evptgu.mp4"
      />

      {/* Dark Gradient Overlay for optimal legibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90 pointer-events-none z-0" />

      {/* Background Ambience Layer */}
      <div className="fixed inset-0 bg-grid-pattern opacity-25 pointer-events-none z-0" />
      
      {/* Soft Top Orange Ambient Flare */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[350px] bg-radial from-[#FF5B00]/20 via-transparent to-transparent blur-[100px] pointer-events-none z-0" />

      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        onOpenExporter={() => setIsExporterOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full relative z-10">
        {activeTab === 'home' && (
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-4 lg:py-8 flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-140px)]">
              {/* Left Column: Headline, Description, CTA, and Product Selector */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-8 lg:space-y-10">
                <HeroContent
                  selectedHeadset={selectedHeadset}
                  onPreOrder={handlePreOrder}
                  onGetStarted={handleGetStarted}
                />

                {/* Bottom Cards Selector */}
                <ProductSelector
                  headsets={VR_HEADSETS}
                  selectedHeadset={selectedHeadset}
                  onSelectHeadset={setSelectedHeadset}
                />
              </div>

              {/* Right Column: 3D Headset Showcase */}
              <div className="lg:col-span-6 flex items-center justify-center relative">
                <Headset3DShowcase selectedHeadset={selectedHeadset} />
              </div>
            </div>

            {/* Gateway & Future of Commerce Platform Section */}
            <GatewayDashboard
              onPreOrder={handlePreOrder}
              selectedHeadset={selectedHeadset}
            />
          </div>
        )}

        {activeTab === 'specs' && (
          <SpecsPage
            headsets={VR_HEADSETS}
            selectedHeadset={selectedHeadset}
            onSelectHeadset={setSelectedHeadset}
            onPreOrder={handlePreOrder}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'models' && (
          <ModelsPage
            headsets={VR_HEADSETS}
            onSelectHeadset={setSelectedHeadset}
            onPreOrder={handlePreOrder}
            onBackToHome={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'gateway' && (
          <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-8">
            <button
              onClick={() => setActiveTab('home')}
              className="flex items-center space-x-2 text-xs font-chakra text-[#FF5B00] hover:text-white mb-6 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>

            <GatewayDashboard
              onPreOrder={handlePreOrder}
              selectedHeadset={selectedHeadset}
            />
          </div>
        )}

        {activeTab === 'auth' && (
          <AuthPage
            currentUser={currentUser}
            onUserChange={(user) => {
              setCurrentUser(user);
              if (user) showToast(`Welcome, ${user.fullName}!`);
            }}
            onBackToHome={() => setActiveTab('home')}
            onOpenExporter={() => setIsExporterOpen(true)}
          />
        )}
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#121214] border border-[#FF5B00] text-white px-5 py-3.5 rounded-xl shadow-[0_0_25px_rgba(255,91,0,0.4)] flex items-center space-x-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#FF5B00]" />
          <span className="font-chakra font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Fullstack Source Code Exporter Modal */}
      <ExportSourceModal
        isOpen={isExporterOpen}
        onClose={() => setIsExporterOpen(false)}
      />
    </div>
  );
}
