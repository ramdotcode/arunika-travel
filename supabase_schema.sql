-- Clean up existing tables
DROP TABLE IF EXISTS tours CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS page_views CASCADE;

-- 1. Tours table
CREATE TABLE tours (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  category text DEFAULT 'Domestik',
  price numeric NOT NULL,
  duration text NOT NULL,
  description text,
  image_url text,
  badge text,
  remaining_slots int,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Testimonials table
CREATE TABLE testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  location text,
  content text NOT NULL,
  avatar_url text,
  rating int DEFAULT 5,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. FAQs table
CREATE TABLE faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  order_index int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Gallery table
CREATE TABLE gallery (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url text NOT NULL,
  alt_text text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Posts (Blog) table
CREATE TABLE posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  image_url text,
  author text DEFAULT 'Admin',
  category text DEFAULT 'Tips Perjalanan',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Page Views (Analytics) table
CREATE TABLE page_views (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  user_agent text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Public can read tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow public to insert views" ON page_views FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated to read views" ON page_views FOR SELECT TO authenticated USING (true);

-- Insert Mock Data for Tours
INSERT INTO tours (name, slug, category, price, duration, description, image_url, badge, remaining_slots)
VALUES 
('Bali Luxury Honeymoon 4D3N', 'bali-luxury-honeymoon', 'Domestik', 12500000, '4D3N', 'Pengalaman romantis tak terlupakan di villa privat dengan pemandangan samudera.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', 'Best Seller', 2),
('Labuan Bajo Private Sailing Trip', 'labuan-bajo-private', 'Domestik', 8500000, '3D2N', 'Jelajahi keajaiban Komodo dengan kapal phinisi eksklusif hanya untuk Anda.', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800', 'Exclusive', NULL),
('Jogja Culture & Heritage Tour', 'jogja-culture', 'Domestik', 4500000, '3D2N', 'Menyelami kekayaan budaya dan sejarah Jawa dengan akses VIP ke destinasi ikonik.', 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&q=80&w=800', 'Cultural', NULL),
('Bandung Exclusive Family Escape', 'bandung-exclusive', 'Domestik', 3800000, '2D1N', 'Liburan keluarga yang nyaman di Lembang dengan aktivitas seru dan privat.', 'https://images.unsplash.com/photo-1590523741491-3453bc02e472?auto=format&fit=crop&q=80&w=800', 'Family Choice', 5),
('Raja Ampat Magic Expedition', 'raja-ampat-magic', 'Domestik', 18500000, '5D4N', 'Menjelajahi surga bawah laut dunia di jantung segitiga karang dunia.', 'https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&q=80&w=800', 'Top Choice', 4),
('Mount Bromo Sunrise Adventure', 'bromo-sunrise-adventure', 'Domestik', 2500000, '2D1N', 'Menyaksikan keindahan matahari terbit yang ikonik di kawah Bromo.', 'https://images.unsplash.com/photo-1588661646274-72aa4c3116cd?auto=format&fit=crop&q=80&w=800', 'Adventure', 10),
('Singapore Modern City Tour', 'singapore-modern', 'Internasional', 7500000, '3D2N', 'Eksplorasi kota modern dengan kunjungan ke Gardens by the Bay dan Sentosa Island.', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800', 'Popular', 8),
('Japan Sakura Wonders', 'japan-sakura', 'Internasional', 28500000, '7D6N', 'Nikmati keindahan bunga Sakura di Tokyo, Kyoto, dan Osaka dengan pemandu lokal.', 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800', 'Seasonal', 12),
('Turkey Hot Air Balloon Experience', 'turkey-experience', 'Internasional', 24000000, '8D7N', 'Terbang di atas Cappadocia dan jelajahi sejarah megah di Istanbul.', 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80&w=800', 'Hot Deal', 6),
('Switzerland Scenic Train Journey', 'switzerland-train', 'Internasional', 45000000, '10D9N', 'Melintasi pegunungan Alpen dengan kereta panorama legendaris Glazier Express.', 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800', 'Luxury', 4),
('Korea Autumn Discovery', 'korea-autumn', 'Internasional', 15500000, '6D5N', 'Menikmati keindahan musim gugur di Nami Island dan Seoul City.', 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=800', 'Promo', 20),
('Paris & Swiss Classic', 'paris-swiss-classic', 'Internasional', 35000000, '9D8N', 'Eksplorasi romantis di Paris dan keindahan alam pegunungan Swiss.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', 'Best Value', 8),
('Dubai Modern Desert Oasis', 'dubai-oasis', 'Internasional', 22000000, '5D4N', 'Pengalaman mewah di Burj Khalifa dan petualangan seru di padang pasir Dubai.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800', 'Exclusive', 10);

-- Insert Mock Data for Testimonials
INSERT INTO testimonials (name, location, content, avatar_url, rating)
VALUES 
('Rina & Daniel', 'Private Trip', 'Perjalanan kami ke Labuan Bajo terasa sangat personal dan terorganisir. Dari awal konsultasi sampai trip selesai, semuanya terasa premium.', 'https://ui-avatars.com/api/?name=Rina+Daniel&background=random', 5),
('HR Manager', 'Jakarta', 'Corporate retreat kami berjalan lancar tanpa drama. Tim Arunika sangat detail dan profesional.', 'https://ui-avatars.com/api/?name=HR+Manager&background=random', 5),
('Andi Wijaya', 'Surabaya', 'Sangat puas dengan layanan custom itinerary-nya. Liburan keluarga jadi jauh lebih santai.', 'https://ui-avatars.com/api/?name=Andi+Wijaya&background=random', 5),
('Siska Putri', 'Medan', 'Tour guide-nya sangat informatif dan sabar. Foto-fotonya juga bagus-bagus!', 'https://ui-avatars.com/api/?name=Siska+Putri&background=random', 4),
('Budi Santoso', 'Semarang', 'Pelayanan admin sangat cepat. Menjawab pertanyaan saya bahkan di luar jam kerja.', 'https://ui-avatars.com/api/?name=Budi+Santoso&background=random', 5),
('Dewi Lestari', 'Yogyakarta', 'Trip ke Bromo kemarin sangat berkesan. Jeep-nya bersih dan drivernya ramah.', 'https://ui-avatars.com/api/?name=Dewi+Lestari&background=random', 5),
('Rully Hidayat', 'Bandung', 'Sangat merekomendasikan paket honeymoon-nya. Detail kecil seperti dekorasi kamar sangat diperhatikan.', 'https://ui-avatars.com/api/?name=Rully+Hidayat&background=random', 5);

-- Insert Mock Data for FAQs
INSERT INTO faqs (question, answer, order_index)
VALUES 
('Bagaimana kebijakan pengembalian dana (Refund)?', 'Refund dapat dilakukan maksimal 14 hari sebelum keberangkatan dengan potongan biaya administrasi sesuai kebijakan maskapai dan hotel.', 1),
('Apakah bisa custom itinerary untuk grup besar?', 'Tentu bisa! Kami melayani corporate gathering, study tour, dan liburan keluarga besar dengan itinerary yang disesuaikan budget dan kebutuhan.', 2),
('Apakah sudah termasuk pengurusan Visa?', 'Untuk paket tour luar negeri, kami menyediakan layanan pendampingan pengurusan Visa agar prosesnya lebih mudah dan cepat.', 3),
('Bagaimana cara memesan paket tour?', 'Anda dapat menekan tombol WhatsApp di website ini untuk berkonsultasi langsung dengan admin kami mengenai jadwal dan ketersediaan.', 4),
('Apakah Arunika menyediakan asuransi perjalanan?', 'Ya, setiap paket tour kami sudah termasuk asuransi perjalanan standar untuk menjamin kenyamanan Anda selama berwisata.', 5),
('Bagaimana jika saya ingin mengubah jadwal (Reschedule)?', 'Reschedule dapat dilakukan tergantung ketersediaan slot dan kebijakan maskapai/hotel. Silakan hubungi admin kami minimal 30 hari sebelum keberangkatan.', 6);

-- Insert Mock Data for Posts
INSERT INTO posts (title, slug, excerpt, content, image_url, author, category)
VALUES 
('10 Tips Packing Hemat untuk Liburan Keluarga', 'tips-packing-hemat', 'Mau liburan tapi koper kepenuhan? Simak tips cerdas packing agar koper tetap ringan dan muat banyak.', 'Packing koper seringkali menjadi drama tersendiri saat ingin berlibur. Namun, dengan teknik folding yang tepat dan penggunaan travel organizer, Anda bisa menghemat banyak ruang.\n\nTips pertama adalah membawa baju yang mudah dipadupadankan. Kedua, gulung pakaian alih-alih melipatnya. Ketiga, manfaatkan celah kecil untuk menyimpan kaos kaki atau charger.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3N5Go1evOuWkm3psbwPOoRiSeDMINk1-qhW1CJ4gM7IAF_7ilGRcZFbTLH3SpZTU0zsu9VcW4ao6IYD0EuBqKR1CBH9zmOu-LL_AkAtYhMx8a5ypFa9MJi8-YTebw7DV4dyUZ2M1c_NTJehodo1FF2R5qDqhpXEun3j02amUFFCfnBya_UtWUyauQUv3B1Q3mLAgDlJ_ifNh8r66FmI4YzEfGFhChfQdrONz7gVb22gFn247Ujfl9PsIlQnnmy6tuMDWIfaQJ', 'Tim Travel', 'Tips'),
('Panduan Wisata Kuliner di Bali yang Wajib Dicoba', 'panduan-kuliner-bali', 'Bali bukan hanya soal pantai. Temukan rekomendasi kuliner hidden gem yang akan memanjakan lidah Anda.', 'Wisata kuliner di Bali menawarkan keberagaman dari makanan tradisional hingga fusion modern. Cobalah mampir ke warung nasi campur di Sanur atau menikmati sunset dengan hidangan laut di Jimbaran.', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800', 'Admin', 'Kuliner'),
('Destinasi Musim Dingin Terbaik di Asia', 'destinasi-musim-dingin-asia', 'Bingung cari tempat liburan akhir tahun? Ini dia 5 destinasi musim dingin terbaik di Asia yang wajib masuk bucket list.', 'Liburan musim dingin memberikan pengalaman yang berbeda. Dari salju di Hokkaido hingga festival lampu di Seoul, Asia punya banyak pilihan menarik untuk dikunjungi di akhir tahun.', 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800', 'Travel Guru', 'Inspirasi'),
('Cara Menemukan Tiket Pesawat Murah', 'cara-cari-tiket-murah', 'Ingin keliling dunia tanpa menguras kantong? Pelajari trik rahasia mencari tiket pesawat dengan harga terbaik.', 'Mencari tiket murah memerlukan kesabaran dan waktu yang tepat. Gunakan fitur incognito saat mencari, pesan jauh-jauh hari, dan manfaatkan poin reward dari kartu kredit Anda.', 'https://images.unsplash.com/photo-1436491865332-7a61a109bd05?auto=format&fit=crop&q=80&w=800', 'Tim Travel', 'Tips');

-- Insert Mock Data for Gallery
INSERT INTO gallery (image_url, alt_text)
VALUES 
('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800', 'Landscape view of mountains'),
('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800', 'Beautiful beach scenery'),
('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800', 'Sunset over the ocean'),
('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800', 'Boat on a serene lake'),
('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800', 'Road trip through the desert'),
('https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&q=80&w=800', 'Walking through a forest path'),
('https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800', 'Ancient temple in Asia'),
('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', 'Tropical island aerial view'),
('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800', 'Mist covered mountains at dawn'),
('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800', 'Sunlight through forest trees'),
('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800', 'Eiffel Tower in Paris'),
('https://images.unsplash.com/photo-1493246507139-91e8bef99c02?auto=format&fit=crop&q=80&w=800', 'Snowy mountain peaks');
-- 11. Site Settings table for Homepage Content
DROP TABLE IF EXISTS site_settings CASCADE;
CREATE TABLE site_settings (
  id text PRIMARY KEY,
  content jsonb NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admin can update settings" ON site_settings FOR ALL TO authenticated USING (true);

-- Insert Initial Content
INSERT INTO site_settings (id, content) VALUES (
  'homepage',
  '{
    "hero": {
      "title_main": "Jelajahi Indonesia",
      "title_accent": "Lebih Berarti",
      "description": "Arunika merancang perjalanan eksklusif untuk Anda yang mengutamakan kenyamanan, detail, dan pengalaman tak terlupakan.",
      "image_url": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=2000",
      "primary_btn": "Mulai Konsultasi",
      "secondary_btn": "Lihat Destinasi"
    },
    "cta": {
      "title": "Siap Merencanakan Liburan Impian?",
      "description": "Hubungi konsultan travel kami dan dapatkan penawaran spesial untuk paket tour pilihan Anda.",
      "button_text": "Konsultasi Sekarang"
    }
  }'::jsonb
);
