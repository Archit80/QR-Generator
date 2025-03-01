import { useState } from 'react'
import qrApi from './services/qrApi';

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputUrl) return;

    setIsLoading(true); 
    try {
      const response = await qrApi.generateQR(inputUrl);
      
      if (response && response.data) {
        // Convert binary data to base64
        const base64Image = btoa(
          new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        
        // Create data URL
        const imageDataUrl = `data:image/png;base64,${base64Image}`;
        setQrCode(imageDataUrl);
      }
    } catch (error) {
      console.error("QR Code Generation Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black 
                    flex items-center justify-center p-4 
                    text-gray-100 
                    selection:bg-red-700 selection:text-white">
      <div className="w-full max-w-md 
                      bg-[#0a0a0a] 
                      border-2 border-gray-800 
                      rounded-2xl 
                      shadow-2xl 
                      p-8">
        
        <h1 className="text-4xl font-arsenal font-bold text-center 
                       text-red-500 
                       mb-6 tracking-tight">
          QR Code Generator
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="url" 
              placeholder="Enter URL to generate QR Code" 
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              required
              className="w-full px-4 py-3 
                         bg-[#1a1a1a] 
                         border border-gray-800 
                         text-gray-100 
                         rounded-xl 
                         focus:outline-none 
                         focus:ring-2 focus:ring-red-600 
                         transition duration-300 
                         font-ubuntu 
                         placeholder-gray-600"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={!inputUrl || isLoading}
            className="w-full 
                       bg-red-500 
                       text-white py-3 rounded-xl 
                       hover:bg-red-700 
                       transition duration-300 
                       flex items-center justify-center space-x-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span>Generating...</span>
            ) : (
              <span>Generate QR Code</span>
            )}
          </button>
        </form>
        
        {qrCode && (
          <div className="mt-6 flex flex-col items-center">
            <div className="bg-[#1a1a1a] 
                            border border-gray-800 
                            p-4 
                            rounded-xl 
                            shadow-lg">
              <img 
                src={qrCode} 
                alt="Generated QR Code" 
                className="h-64 w-64 object-contain 
                           border-2 border-gray-700 
                           rounded-lg"
              />
            </div>
            <a 
              href={qrCode} 
              download="qr_code.png"
              className="mt-4 
                         text-red-500 
                         hover:text-red-400 
                         transition duration-300 
                         flex items-center 
                         bg-[#1a1a1a] 
                         px-4 py-2 
                         rounded-lg 
                         hover:bg-[#2a2a2a]"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
