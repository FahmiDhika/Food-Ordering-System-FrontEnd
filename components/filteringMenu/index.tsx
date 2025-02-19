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

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (path) {
      params.set("category", path); // Set kategori jika ada
    } else {
      params.delete("category"); // Hapus query category jika path kosong
    }

    router.push(`${url}?${params.toString()}`);
  };

  return (
    <button
      className={`${className} rounded-xl px-4 py-1`}
      onClick={handleSearch}
    >
      {children}
    </button>
  );
};

export default Filter;
