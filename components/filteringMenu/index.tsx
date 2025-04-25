"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  url: string;
  path?: string; // Optional agar bisa digunakan untuk menghapus query
  children: string;
  className: string;
};

const Filter = ({ url, path, children, className }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category"); // Ambil category dari query params

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (path) {
      params.set("category", path); // Set kategori jika ada
    } else {
      params.delete("category"); // Hapus query category jika path kosong
    }

    router.push(`${url}?${params.toString()}`);
  };

  // Jika kategori saat ini sama dengan path tombol, ubah warna background
  const isActive = currentCategory === path || (!currentCategory && !path);
  const activeClass = isActive ? "border-2 border-black scale-105" : "";

  return (
    <button
      className={`${className} ${activeClass} rounded-lg font-semibold tracking-wide uppercase text-white px-4 py-1 transition-all`}
      onClick={handleSearch}
    >
      {children}
    </button>
  );
};

export default Filter;
