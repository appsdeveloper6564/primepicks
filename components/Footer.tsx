import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white mt-auto py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
                <h3 className="text-xl font-bold mb-4">PrimePicks</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                    Your ultimate destination for curated tech, home, and lifestyle products. 
                </p>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-slate-200">Shop</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-blue-400">Electronics</a></li>
                    <li><a href="#" className="hover:text-blue-400">Home & Kitchen</a></li>
                    <li><a href="#" className="hover:text-blue-400">Fashion</a></li>
                    <li><a href="#" className="hover:text-blue-400">Deals</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-slate-200">About</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                    <li><a href="#" className="hover:text-blue-400">Our Story</a></li>
                    <li><a href="#" className="hover:text-blue-400">Affiliate Disclosure</a></li>
                    <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h4 className="font-semibold mb-4 text-slate-200">Stay Connected</h4>
                <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} PrimePicks Affiliate. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;