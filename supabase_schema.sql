-- Clean up existing tables
DROP TABLE IF EXISTS tours CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS faqs CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS posts CASCADE;

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

-- Enable Row Level Security (RLS)
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create public read policies
CREATE POLICY "Public can read tours" ON tours FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public can read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public can read posts" ON posts FOR SELECT USING (true);

-- Insert Mock Data for Tours
INSERT INTO tours (name, slug, category, price, duration, description, image_url, badge, remaining_slots)
VALUES 
('Bali Luxury Honeymoon 4D3N', 'bali-luxury-honeymoon', 'Domestik', 12500000, '4D3N', 'Pengalaman romantis tak terlupakan di villa privat dengan pemandangan samudera.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800', 'Best Seller', 2),
('Labuan Bajo Private Sailing Trip', 'labuan-bajo-private', 'Domestik', 8500000, '3D2N', 'Jelajahi keajaiban Komodo dengan kapal phinisi eksklusif hanya untuk Anda.', 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800', 'Exclusive', NULL),
('Jogja Culture & Heritage Tour', 'jogja-culture', 'Domestik', 4500000, '3D2N', 'Menyelami kekayaan budaya dan sejarah Jawa dengan akses VIP ke destinasi ikonik.', 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&q=80&w=800', 'Cultural', NULL),
('Bandung Exclusive Family Escape', 'bandung-exclusive', 'Domestik', 3800000, '2D1N', 'Liburan keluarga yang nyaman di Lembang dengan aktivitas seru dan privat.', 'https://images.unsplash.com/photo-1590523741491-3453bc02e472?auto=format&fit=crop&q=80&w=800', 'Family Choice', 5);

-- Insert Mock Data for Testimonials
INSERT INTO testimonials (name, location, content, avatar_url, rating)
VALUES 
('Rina & Daniel', 'Private Trip', 'Perjalanan kami ke Labuan Bajo terasa sangat personal dan terorganisir. Dari awal konsultasi sampai trip selesai, semuanya terasa premium.', 'https://ui-avatars.com/api/?name=Rina+Daniel&background=random', 5),
('HR Manager', 'Jakarta', 'Corporate retreat kami berjalan lancar tanpa drama. Tim Arunika sangat detail dan profesional.', 'https://ui-avatars.com/api/?name=HR+Manager&background=random', 5);

-- Insert Mock Data for FAQs
INSERT INTO faqs (question, answer, order_index)
VALUES 
('Bagaimana kebijakan pengembalian dana (Refund)?', 'Refund dapat dilakukan maksimal 14 hari sebelum keberangkatan dengan potongan biaya administrasi sesuai kebijakan maskapai dan hotel.', 1),
('Apakah bisa custom itinerary untuk grup besar?', 'Tentu bisa! Kami melayani corporate gathering, study tour, dan liburan keluarga besar dengan itinerary yang disesuaikan budget dan kebutuhan.', 2),
('Apakah sudah termasuk pengurusan Visa?', 'Untuk paket tour luar negeri, kami menyediakan layanan pendampingan pengurusan Visa agar prosesnya lebih mudah dan cepat.', 3);

-- Insert Mock Data for Posts
INSERT INTO posts (title, slug, excerpt, content, image_url, author, category)
VALUES 
('10 Tips Packing Hemat untuk Liburan Keluarga', 'tips-packing-hemat', 'Mau liburan tapi koper kepenuhan? Simak tips cerdas packing agar koper tetap ringan dan muat banyak.', 'Packing koper seringkali menjadi drama tersendiri saat ingin berlibur. Namun, dengan teknik folding yang tepat dan penggunaan travel organizer, Anda bisa menghemat banyak ruang.\n\nTips pertama adalah membawa baju yang mudah dipadupadankan. Kedua, gulung pakaian alih-alih melipatnya. Ketiga, manfaatkan celah kecil untuk menyimpan kaos kaki atau charger.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3N5Go1evOuWkm3psbwPOoRiSeDMINk1-qhW1CJ4gM7IAF_7ilGRcZFbTLH3SpZTU0zsu9VcW4ao6IYD0EuBqKR1CBH9zmOu-LL_AkAtYhMx8a5ypFa9MJi8-YTebw7DV4dyUZ2M1c_NTJehodo1FF2R5qDqhpXEun3j02amUFFCfnBya_UtWUyauQUv3B1Q3mLAgDlJ_ifNh8r66FmI4YzEfGFhChfQdrONz7gVb22gFn247Ujfl9PsIlQnnmy6tuMDWIfaQJ', 'Tim Travel', 'Tips'),
('Destinasi Tersembunyi di Bali yang Wajib Dikunjungi', 'destinasi-tersembunyi-bali', 'Bosan dengan Kuta? Temukan pantai dan air terjun rahasia di pelosok Bali yang masih sepi pengunjung.', 'Bali bukan hanya soal Kuta atau Seminyak. Jika Anda bergeser sedikit ke arah timur atau utara, Anda akan menemukan surga tersembunyi.\n\nMisalnya, Pantai Nyang Nyang yang memiliki bangkai kapal ikonik di pinggir pantai, atau Air Terjun Sekumpul yang memiliki pemandangan megah seperti di film Jurassic Park.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtSfZMBH6s0ZSS-Ej3DYjNVhpaxxL-Z0PmBko2Lh9fDRFzXI69YjrMpTZDOw78R4j2K8JYkb6O6rKjvomVM0WF_anIH5qxrYtqfyTpyccNaLG50o24PQjT-oxJBlvAy-JykWk2AcrlCn-2DzhsilEpUoVCefhN420BP18aR-ri8qy-MuhvfH6y878nSUDPsjeZgpCh6LAlF7rjSRv7mNgERv-iKoKfTU4FskvVRW3uw8QGO88H45lurk__RRIPzbw1oM7gINtx', 'Admin', 'Destinasi');
