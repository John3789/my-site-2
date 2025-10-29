// components/SocialFooter.jsx
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export default function SocialFooter({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 shrink-0 ${className}`}>
      {/* Hide label on very small screens to avoid crowding */}
      <span className="uppercase tracking-wide text-sm whitespace-nowrap hidden sm:inline">
        Follow Dr. Salerno:
      </span>

      <a href="https://www.tiktok.com/drjuanpablosalerno" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="TikTok">
        <FaTiktok size={22} />
      </a>
      <a href="https://www.instagram.com/drjuanpablosalerno" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="Instagram">
        <FaInstagram size={22} />
      </a>
      <a href="https://www.youtube.com/@drjpsalerno" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="YouTube">
        <FaYoutube size={22} />
      </a>
      <a href="https://www.facebook.com/profile.php?id=61582412806274" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="Facebook">
        <FaFacebookF size={22} />
      </a>
    </div>
  );
}
