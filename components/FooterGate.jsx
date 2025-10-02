'use client'
import { usePathname } from 'next/navigation'

export default function FooterGate({ children }) {
  const pathname = usePathname()
  // hide the global footer on the homepage only
  if (pathname === '/') return null
  return children
}
