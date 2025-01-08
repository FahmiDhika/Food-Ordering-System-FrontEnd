'use client'

import Image from "next/image";
import Link from "next/link";
import { TypeAnimation } from "react-type-animation";

export default function Home() {
  return (
    <div className="text-center mainBackground w-full h-dvh pt-52">
      <h1 className="text-5xl mb-6 tracking-wider font-bold">
        ini bukan halaman utama
      </h1>
      <p className="font-mono text-xl mb-11">
        silahkan tekan tombol berikut untuk menuju {" "}
        <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "Dashboard",
            1000, // wait 1s before replacing "Mice" with "Hamsters"
            "Menu",
            1000,
            "User",
            1000,
            "Transaksi",
            1000,
          ]}
          wrapper="span"
          speed={25}
          style={{display: "inline-block" }}
          repeat={Infinity}
          className="font-bold text-white drop-shadow-lg"
        />
      </p>

      <Link
        href={`/manager/dashboard`}
        className="py-4 px-12 bg-white shadow-xl tekanButton"
      >
        Tekan
      </Link>
    </div>
  );
}
