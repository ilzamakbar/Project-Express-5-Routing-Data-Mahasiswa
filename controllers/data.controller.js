let dataMahasiswa = [
    {
        id: 1,
        nim: "23010001",
        nama: "Andi Pratama",
        prodi: "Informatika"
    }, {
        id: 2,
        nim: "23010002",
        nama: "Siti Rahma",
        prodi: "Sistem Informasi"
    }, {
        id: 3,
        nim: "23010003",
        nama: "Budi Santoso",
        prodi: "Informatika"
    }, {
        id: 4,
        nim: "23010004",
        nama: "Dewi Lestari",
        prodi: "Teknik Komputer"
    }
];

const getAllData = (req, res) => {
    const {keyword, prodi} = req.query;

    let result = [...dataMahasiswa];

    if (keyword) {
        const searchKeyword = keyword.toLowerCase();
        result = result.filter(
            (mhs) => mhs.nama.toLowerCase().includes(searchKeyword) || mhs.nim.includes(searchKeyword)
        );
    }

    if (prodi) {
        result = result.filter(
            (mhs) => mhs.prodi.toLowerCase() === prodi.toLowerCase()
        );
    }

    return res
        .status(200)
        .json({status: "success", total: result.length, data: result});
};


const getDataById = (req, res) => {
    const {id} = req.params;
    const mhs = dataMahasiswa.find((item) => item.id === parseInt(id, 10));

    if (!mhs) {
        return res
            .status(404)
            .json(
                {status: "fail", message: `Data mahasiswa dengan ID ${id} tidak ditemukan`}
            );
    }

    return res
        .status(200)
        .json({status: "success", data: mhs});
};

const getDataByNim = (req, res) => {
  const { nim } = req.params;
  const mhs = dataMahasiswa.find((item) => item.nim === nim);

  if (!mhs) {
    return res.status(404).json({
      status: "fail",
      message: `Mahasiswa dengan NIM ${nim} tidak ditemukan`
    });
  }

  return res.status(200).json({
    status: "success",
    data: mhs
  });
};


const createData = (req, res) => {
    const {nim, nama, prodi} = req.body;

    if (!nim || !nama || !prodi) {
        return res
            .status(400)
            .json({status: "fail", message: "Data nim, nama, dan prodi wajib diisi!"});
    }

    const newId = dataMahasiswa.length > 0
        ? dataMahasiswa[dataMahasiswa.length - 1].id + 1
        : 1;
    const newMahasiswa = {
        id: newId,
        nim,
        nama,
        prodi
    };

    dataMahasiswa.push(newMahasiswa);

    return res
        .status(201)
        .json(
            {status: "success", message: "Data mahasiswa berhasil ditambahkan", data: newMahasiswa}
        );
};

module.exports = {
    getAllData,
    getDataById,
    getDataByNim,
    createData
};