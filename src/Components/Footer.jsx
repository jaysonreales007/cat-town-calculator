import { FaTwitter, FaTelegram, FaGlobe, FaYoutube } from 'react-icons/fa';
import { SiGitbook, SiCoinmarketcap } from 'react-icons/si';

function Footer() {
    const socialLinks = [
        { name: 'Website', icon: FaGlobe, url: 'https://cat.town/', color: '#7289DA' },
        { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/cattownbase', color: '#1DA1F2' },
        { name: 'Telegram', icon: FaTelegram, url: 'https://t.me/WelcomeToCatTown', color: '#0088cc' },
        { name: 'GitBook', icon: SiGitbook, url: 'https://docs.cat.town/', color: '#3884FF' },
        { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@CatTownOfficial', color: '#FF0000' },
        { name: 'Coinmarketcap', icon: SiCoinmarketcap, url: 'https://www.coingecko.com/en/coins/kibble', color: '#17181B' },
  ];
  
  const currentYear = new Date().getFullYear();
  
    return (
        <footer className="mt-8 bg-gray-100 p-4 rounded-lg shadow-md">
            <div className="flex justify-center space-x-6">
            {socialLinks.map((link) => (
                <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:opacity-80 group"
                style={{ color: link.color }}
                title={`Visit our ${link.name}`}
                >
                <link.icon className="text-2xl group-hover:animate-bounce" aria-label={link.name} />
                </a>
            ))}
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600 border-t-2 border-gray-300">
                Developed by 0xJayson.eth
            </div>
        </footer>
    );
}

const WarpcastIcon = ({ className, style }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 400 400"
    className={className}
    style={style}
    fill="currentColor"
    width="1em"
    height="1em"
  >
    <path d="M200 0C89.5 0 0 89.5 0 200s89.5 200 200 200 200-89.5 200-200S310.5 0 200 0zm101.6 280.6c-1.8 11.6-13.1 19.4-24.7 17.6-11.6-1.8-19.4-13.1-17.6-24.7 1.8-11.6 13.1-19.4 24.7-17.6 11.6 1.8 19.4 13.1 17.6 24.7zm-62.5-86.9c-1.8 11.6-13.1 19.4-24.7 17.6-11.6-1.8-19.4-13.1-17.6-24.7 1.8-11.6 13.1-19.4 24.7-17.6 11.6 1.8 19.4 13.1 17.6 24.7zm-62.5-86.9c-1.8 11.6-13.1 19.4-24.7 17.6-11.6-1.8-19.4-13.1-17.6-24.7 1.8-11.6 13.1-19.4 24.7-17.6 11.6 1.8 19.4 13.1 17.6 24.7z" />
  </svg>
);

export default Footer;