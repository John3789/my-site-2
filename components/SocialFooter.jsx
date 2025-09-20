// components/SocialFooter.jsx
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa6";

export default function SocialFooter() {
  return (
    <div className="flex items-center gap-4">
      <span className="uppercase tracking-wide text-sm">Follow Dr. Salerno:</span>

      <a href="https://www.tiktok.com/@yourhandle" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="TikTok">
        <FaTiktok size={22} />
      </a>

      <a href="https://www.instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="Instagram">
        <FaInstagram size={22} />
      </a>

      <a href="https://www.youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition" aria-label="YouTube">
        <FaYoutube size={22} />
      </a>
    </div>
  );
}
