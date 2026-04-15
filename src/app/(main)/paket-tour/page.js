import { supabase } from '@/lib/supabase'
import ToursClient from './ToursClient'

export const metadata = {
  title: "Paket Tour - Destinasi Liburan Terbaik",
  description: "Daftar lengkap paket tour domestik dan internasional dengan layanan premium.",
};

async function getTours() {
  const { data } = await supabase.from('tours').select('*').order('created_at', { ascending: false })
  return data || []
}

export default async function ToursPage() {
  const tours = await getTours()

  return <ToursClient tours={tours} />
}
