import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ma Boutique</h3>
            <p className="text-gray-300 mb-4">
              Votre boutique en ligne moderne et intuitive pour tous vos besoins.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                  Tous les Produits
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-colors">
                  Catégories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Service Client</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Centre d'Aide
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Livraison
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-300 hover:text-white transition-colors">
                  Retours
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Politique de Confidentialité
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Conditions d'Utilisation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-gray-300">
                  123 Rue du Commerce<br />
                  75001 Paris, France
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-gray-300">+33 1 23 45 67 89</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-400" />
                <span className="text-gray-300">contact@maboutique.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Inscrivez-vous pour recevoir nos dernières offres et nouveautés
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button className="bg-primary-600 text-white px-6 py-2 rounded-r-lg hover:bg-primary-700 transition-colors">
                S'inscrire
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ma Boutique. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
