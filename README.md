# EventPassApp

Aplikasi mobile satu layar berbasis **React Native** yang berfungsi sebagai kartu pass digital festival musik indie sekaligus alat kru panggung untuk mencatat kehadiran penonton dan menyusun rundown penampil secara langsung.

> Proyek Ujian Tengah Semester (UTS) Praktik Mandiri, Pemrograman Mobile 1 (MKB5520005), Semester Ganjil 2026/2027.
> Studi Kasus 4: EventPassApp (Kartu Tiket Acara & Susunan Rundown Panggung).

---

## Identitas Pengembang

| | |
|---|---|
| **Nama Mahasiswa** | Loven Marthin Sine |
| **NIM** | 2555200005 |
| **Program Studi** | S1 Informatika |
| **Fakultas** | Sains dan Teknologi |
| **Perguruan Tinggi** | Universitas PGRI Delta Sidoarjo |
| **Dosen Pengampu** | Agung Kurniawan Faisol, S.Kom., M.Kom. |

---

## Fitur

1. **Kartu tiket festival** menampilkan poster, nama acara, tanggal, dan lokasi dengan tampilan tiket (sobekan dan barcode).
2. **Check-in kehadiran** menambah jumlah penonton +1 setiap tombol ditekan, lengkap dengan meter kapasitas venue.
3. **Tambah penampil** menambahkan band ke rundown lewat formulir. Input kosong ditolak dengan `Alert`.
4. **Rundown timeline** menampilkan jam tampil, nama penampil, dan stage (Main Stage / Indie Stage) dalam bentuk linimasa.

---

## Tampilan & Konsep Desain

Tema **"malam festival"**: latar arang hangat, aksen oranye bara dan kuning matahari, serta kartu tiket berwarna kertas krem.

| Elemen | Warna |
|---|---|
| Latar aplikasi | `#14110F` |
| Kartu gelap | `#1F1A17` |
| Kertas tiket | `#F4EBDD` |
| Aksen utama (Main Stage, tombol tambah) | `#FF5A36` |
| Aksen sekunder (counter, Indie Stage) | `#F6B73C` |

Seluruh warna dan font dipusatkan di `src/theme.js`, sehingga perubahan tema cukup dilakukan di satu berkas.

---

## Struktur Proyek

```text
utsproject/
├── App.jsx                          # Komponen induk: state, handler, susunan layar
├── README.md
└── src/
    ├── theme.js                     # Palet warna dan font terpusat
    └── components/
        ├── EventHeader.jsx          # Kartu tiket: poster, tanggal, lokasi, barcode
        ├── StatBadge.jsx            # Counter kehadiran, meter kapasitas, tombol check-in
        └── RundownItemCard.jsx      # Satu item penampil pada timeline rundown
```

---

## Teknologi & Dependensi

- React Native (CLI, tanpa Expo)
- `react-native-safe-area-context` untuk area aman perangkat
- `@react-native-vector-icons/fontawesome-free-solid` untuk ikon
- `prop-types` untuk validasi tipe data props

---

## Cara Menjalankan

```bash
# 1. Pasang dependensi
npm install

# 2. Jalankan Metro bundler
npx react-native start

# 3. Pada terminal lain, jalankan di Android emulator
npx react-native run-android
```

Pastikan Android emulator sudah menyala dan terhubung ke internet agar gambar poster dapat dimuat.

---

## Arsitektur Komponen & Props

Aliran data **satu arah**: `App.jsx` (induk) mengirim data ke komponen anak melalui props.

Setiap komponen menerima props sebagai parameter fungsi (`function Nama(props)`) dan membacanya dengan `props.namaProp`. Tipe data props divalidasi memakai `PropTypes`:

```jsx
// App.jsx (mengirim)
<StatBadge label="Penonton hadir di venue" count={checkInCount} onPress={handleCheckIn} />

// StatBadge.jsx (menerima dan memvalidasi)
export default function StatBadge(props) {
  return <Text>{props.count}</Text>;
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
};
```

| Komponen | Props | Tipe | Fungsi |
|---|---|---|---|
| `EventHeader` | `eventName` | String | Judul acara |
| | `venue` | String | Lokasi acara |
| | `eventDate` | String | Tanggal pelaksanaan |
| | `posterUrl` | String | URL gambar poster |
| `StatBadge` | `label` | String | Keterangan counter |
| | `count` | Number | Jumlah penonton hadir |
| | `onPress` | Function | Callback tombol check-in |
| `RundownItemCard` | `performerName` | String | Nama band/penampil |
| | `timeSlot` | String | Rentang jam tampil |
| | `stageName` | String | Nama panggung |

---

## Manajemen State

Seluruh state dipusatkan di `App.jsx` sebagai *single source of truth* menggunakan hook `useState`.

| State | Tipe | Fungsi |
|---|---|---|
| `checkInCount` | Number | Total penonton hadir (nilai awal 128) |
| `performerInput` | String | Nilai input teks formulir (*controlled input*) |
| `rundownList` | Array of Object | Daftar penampil pada rundown |

Pembaruan state memakai bentuk fungsional agar selalu berdasarkan nilai terbaru:

```javascript
setCheckInCount((prevCount) => prevCount + 1);
setRundownList((prevList) => [...prevList, newRundown]);
```

### Prinsip Immutability

Penambahan item pada `rundownList` memakai **spread operator** yang membuat array baru. Metode yang memutasi array asli seperti `push()` dan `splice()` tidak digunakan, sehingga React mendeteksi perubahan referensi dan merender ulang daftar dengan benar.

---

## Disiplin Styling

- 100% gaya ditulis dengan `StyleSheet.create`, **tanpa inline style** (`style={{ ... }}`).
- Variasi tampilan (misalnya segmen meter menyala/padam, warna titik Main Stage/Indie Stage) dipilih lewat kondisi terhadap style yang sudah didefinisikan, contoh: `isMainStage ? styles.dotMain : styles.dotIndie`.
- Warna dan font dibaca dari `src/theme.js`.

---

## Pengujian Fungsional (Black Box)

| ID | Skenario | Hasil yang Diharapkan |
|---|---|---|
| TC-01 | Membuka aplikasi pertama kali | Header, counter awal 128, dan 3 kartu penampil bawaan tampil |
| TC-02 | Menekan "Check-In Kehadiran" 3 kali | Counter berubah 128 → 131 tanpa reload |
| TC-03 | Menekan "Tambah ke Rundown" dengan input kosong | Muncul `Alert` peringatan |
| TC-04 | Mengetik nama band lalu menekan tambah | Item baru muncul di akhir daftar, input kembali kosong |
| TC-05 | Audit inline style pada seluruh berkas JSX | Tidak ditemukan `style={{ ... }}` |

---

## Riwayat Commit

Repositori dikelola dengan Git secara bertahap dengan pesan yang deskriptif:

```text
feat: setup initial utsproject architecture and safe-area dependencies
style: add centralized festival theme with colors and fonts
feat: create modular EventHeader, StatBadge, and RundownItemCard components
feat: implement check-in counter and immutable rundown array state mutation
docs: add README.md with system architecture and testing matrix
```

Lihat riwayat lengkap dengan `git log --oneline`.
