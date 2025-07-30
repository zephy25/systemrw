let nomorUrut = 1;
let editRow = null;

// Fungsi untuk cek duplikasi berdasarkan NIK dan KK
function isDuplicate(nik, kk, excludeRow = null) {
  const rows = document.querySelectorAll("#dataTable tbody tr");
  for (let row of rows) {
    if (row === excludeRow) continue;
    const existingNIK = row.cells[2].textContent.trim();
    const existingKK = row.cells[3].textContent.trim();
    if (existingNIK === nik && existingKK === kk) {
      return true;
    }
  }
  return false;
}

function validateForm(data) {
  // Cek semua field wajib isi
  for (const key in data) {
    if (data[key].trim() === "") {
      alert(`Kolom "${key.toUpperCase()}" wajib diisi.`);
      return false;
    }
  }

  // Validasi panjang NIK
  const nik = data.nik.trim();
  if (!/^\d{16}$/.test(nik)) {
    alert("NIK harus terdiri dari 16 digit angka.");
    return false;
  }

  return true;
}

document.getElementById("wargaForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    nama: document.getElementById("nama").value,
    nik: document.getElementById("nik").value,
    kk: document.getElementById("kk").value,
    ttl: document.getElementById("ttl").value,
    jk: document.getElementById("jk").value,
    agama: document.getElementById("agama").value,
    alamat: document.getElementById("alamat").value,
    telp: document.getElementById("telp").value,
    rt: document.getElementById("rt").value,
    rw: document.getElementById("rw").value,
  };

  // Validasi form
  if (!validateForm(data)) return;

  // Validasi duplikat
  if (isDuplicate(data.nik, data.kk, editRow)) {
    alert("Data dengan NIK dan KK yang sama sudah ada!");
    return;
  }

  if (editRow) {
    updateRow(editRow, data);
    editRow = null;
  } else {
    addRow(data);
  }

  document.getElementById("wargaForm").reset();
});
