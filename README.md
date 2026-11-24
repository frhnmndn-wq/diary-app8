# Diary App (`diary-app8`) - Pertemuan 8

Aplikasi catatan harian sederhana berbasis **React Native + Expo Router** yang menggunakan **Redux Toolkit + React-Redux** untuk pengelolaan *global state*[cite: 5].

## Perbedaan Local State, Global Redux State, dan Persistent Database

| Aspek | Local State (`useState`) | Global Redux State (Redux Toolkit) | Persistent Database (mis. SQLite / MySQL / API DB) |
| :--- | :--- | :--- | :--- |
| **Cakupan Data** | Terbatas pada satu komponen atau *screen* tertentu[cite: 7]. | Dibagikan ke banyak *screen* dan komponen melalui *Redux Store* terpusat[cite: 6, 7, 38]. | Tersimpan di penyimpanan permanen/server untuk seluruh sesi aplikasi[cite: 38, 39]. |
| **Lokasi Penyimpanan** | Di dalam siklus hidup komponen (*component memory*). | Di memori aplikasi (*in-memory store*) selama aplikasi berjalan[cite: 38]. | Di disk/file lokal perangkat atau server database[cite: 38]. |
| **Saat App di-Reload / Restart** | Hilang / kembali ke nilai awal komponen. | Kembali ke `initialState` (bukan pengganti database)[cite: 38, 40]. | Tetap tersimpan dan dapat dimuat kembali[cite: 38, 39]. |
| **Contoh pada Proyek Ini** | Nilai input form (`title`, `body`, `mood`) saat mengetik atau filter mood aktif di *Home*[cite: 7, 25, 29]. | Daftar `entries`, status `liked` (favorite), `addDiary`, `editDiary`, `deleteDiary`, dan `clearAllFavorites`[cite: 7, 13, 14, 40]. | Belum digunakan pada modul ini; akan diintegrasikan pada pertemuan berikutnya[cite: 5, 38, 39]. |

### Ringkasan Alur
1. **Local State (`useState`)** menangani interaksi form yang bersifat sementara sebelum di-*submit*[cite: 7, 29].
2. **Global Redux State** menjaga konsistensi data `diary` lintas *screen* (*Home*, *Tambah*, *Favorite*, *Detail*, dan *Edit*)[cite: 6, 7, 16, 17, 40].
3. **Persistent Database** berfungsi sebagai penyimpanan jangka panjang agar data tidak hilang ketika aplikasi ditutup atau di-*reload*[cite: 38, 39].