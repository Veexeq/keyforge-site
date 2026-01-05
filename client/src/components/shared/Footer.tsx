const Icons = {
  Instagram: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  Facebook: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  X: (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  ),
};

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="text-xl font-bold tracking-tighter text-foreground">
              KeyForge
            </span>
            <p className="mt-4 text-sm text-muted-foreground">
              Crafting unique typing experiences. <br />
              Artisan keycaps, premium switches, and ergonomic accessories designed in Poland.
            </p>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">All Products</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Artisan Keycaps</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Switches</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Wrist Rests</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Support</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Shipping & Returns</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icons.Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icons.X className="h-5 w-5" />
                <span className="sr-only">X</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Icons.Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} KeyForge. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
