export default function Gallery({ gallery }) {
  // If gallery is empty, use some defaults
  const images = gallery.length > 0 ? gallery : [
    { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHynYaO3GUFp7GDr2tBomuv-EAIAhg5VYzaSJCbKeM2fXJSbsC6JWurcX7vUU38Hss6BCz7NCGI8vgCZLlRY0bIMbNf8ocAIfU-68eVTc-He-XkxIEaBLro1Qmfb3QIQTYGbU9HS3OSkS-ff3I8tdZz6sHg_B5lHjnK_vcInr4wbfPikybPW-It4pNmNyMGunvezBsewY8WNZQe1Xf3LcF6d17GyrGbXMgZsSCyZK0196yPcBwvSY9mQpOvkWhvLEMH73wxy3G", alt_text: "Traveler" },
    { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBz2RDg2pksGRUhgBF0xvlccN067y1LUtryGbZXG0MKDzquJZ2e_5NK3l9skVJbqPyWVUrb0DEEiTj9ahpY2nuglT2PvfcOUNc7l62EnETFoXRgN9l0LSeLZtq5XvtPBSgbDezv1fknkEUaXQyUzzMpFolhlm05_UvJRe0mb4iYRa6gsWJ0Xi7OUUpRF0yBTfqJibzr_61_VryfI-PSEf6Fm8rCIEKpgdYtMeRw2PL61_gPN6UG-MSMsxgL-gVLF7QlkaOcTkbP", alt_text: "Traveler" },
    { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsBj1iSrdniH3lKBFAMwwF5lNJd0cIDkiSOriH3jsAybH4qQhvn7v8n3Lp-IdK24UvBKSzKnt-_4qnWuvt0uOnYf3ju-vXsI9CEE_wkbBfNAlyPRB6iqYTPEmvkiFk92B0XHO-vZTCaqoAmKI6qkzFyuRo6hM_4WiP9JsJ-8h0Aa9Uj6bnxXCicnaFblIcQGGTTAI86Qi0zXMVdb8nIgSIK31DGn-yLj2Fur5gTxXj7Zt-9e23D_akZJL-vCPesuMDOmth7GzJ", alt_text: "Traveler" },
    { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjm26fYqVF2WJCKaFcukue8ePLNEJ53Vp8HkeTw7gywlzNGUrRyCXcCqLFvG_9DE7nnZ0rxtSPu2QYQbuUcPmPnGnrqyqH4X7gbjJcv2mGrL0ME62UNWemUwmSCshe8TBRnT92L7RNOP88sQktGX70PFWeSXCczAHLWb5k6TcetOYugY_k98I6vX231t63t0PDarMVioOzYHhC27sZ_JjIrf3xSw8CTajw_Z1__5pHEEim5OfXbtdnBfZzkei3AcW1XDhB_M9J", alt_text: "Traveler" },
    { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAKMwXYOfffi_iKv13hOrn9NGSJ3pjwtBg1eFB5LeU6I7BYLxXfU0iHtSPg4QZbU5kw2_vV7SidBAIpGS4EiDIKs4B9dIAqAehXK1xPtDygTa8_ZxC55VdMhmU53bovLM8yKx9FBqJM3AzYJwGaJpmP8CTo8fpaFmW2BhdUTvLiEHTI3L1atEYsFRyU2W7w37fKcfd5hmeVMUKkiqLhA200j012WSj3ylEuWLZCf5ukSMLETsX5Ed8D3Js2jFvPKASW0627imFI", alt_text: "Traveler" },
    { image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3N5Go1evOuWkm3psbwPOoRiSeDMINk1-qhW1CJ4gM7IAF_7ilGRcZFbTLH3SpZTU0zsu9VcW4ao6IYD0EuBqKR1CBH9zmOu-LL_AkAtYhMx8a5ypFa9MJi8-YTebw7DV4dyUZ2M1c_NTJehodo1FF2R5qDqhpXEun3j02amUFFCfnBya_UtWUyauQUv3B1Q3mLAgDlJ_ifNh8r66FmI4YzEfGFhChfQdrONz7gVb22gFn247Ujfl9PsIlQnnmy6tuMDWIfaQJ", alt_text: "Traveler" }
  ]

  return (
    <section className="max-w-[1200px] mx-auto px-4 lg:px-10 py-20 w-full">
      <h2 className="text-3xl font-bold text-center mb-12">Momen Bahagia Pelanggan Kami</h2>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((img, i) => (
          <div key={i} className="break-inside-avoid rounded-xl overflow-hidden">
            <img 
              alt={img.alt_text} 
              className="w-full h-auto hover:scale-110 transition-transform duration-500" 
              src={img.image_url} 
            />
          </div>
        ))}
      </div>
    </section>
  )
}
