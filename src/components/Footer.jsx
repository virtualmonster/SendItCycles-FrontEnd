import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-fuchsia-500">SendIt Cycles</h3>
            <p className="text-slate-400">Premium bikes for every terrain.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-fuchsia-400">XC</a></li>
              <li><a href="#" className="hover:text-fuchsia-400">Trail</a></li>
              <li><a href="#" className="hover:text-fuchsia-400">Enduro</a></li>
              <li><a href="#" className="hover:text-fuchsia-400">Downhill</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-fuchsia-400">Contact</a></li>
              <li><a href="#" className="hover:text-fuchsia-400">FAQ</a></li>
              <li><a href="#" className="hover:text-fuchsia-400">Shipping</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-fuchsia-400">Privacy</a></li>
              <li><a href="#" className="hover:text-fuchsia-400">Terms</a></li>
              <li><a href="#" className="hover:text-fuchsia-400">Returns</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
          <p>&copy; {currentYear} SendIt Cycles. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
