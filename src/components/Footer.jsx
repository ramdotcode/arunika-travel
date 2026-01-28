export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border py-12">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="Arunika Logo" className="h-10 w-auto" />
            <h2 className="text-lg font-bold tracking-tight text-site">Arunika</h2>
          </div>
            <p className="text-sm text-gray-500">
              Penyedia layanan tour & travel terpercaya di Indonesia sejak 2015. Mewujudkan liburan impian dengan kenyamanan maksimal.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Destinasi</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><a className="hover:text-primary transition-colors" href="#">Bali & Nusa Tenggara</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Labuan Bajo</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Raja Ampat</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Internasional</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Perusahaan</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li><a className="hover:text-primary transition-colors" href="#">Tentang Kami</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Karir</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Syarat & Ketentuan</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Kebijakan Privasi</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Hubungi Kami</h4>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span> hello@travelagency.id
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">call</span> +62 812-3456-7890
              </li>
              <li className="flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">location_on</span> Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-card-border mt-12 pt-8 text-center text-sm text-gray-400">
          © 2024 Arunika. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
