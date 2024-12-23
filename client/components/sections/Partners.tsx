"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const partners = [
  { name: "ENSA Tanger", logo: "/logos/ensa-tanger.png" },
  { name: "ENSAM", logo: "/logos/ensam.png" },
  { name: "ENSIAS", logo: "/logos/ensias.png" },
]

export default function Partners() {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Our Partners</h2>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {partners.map((partner, index) => (
          <motion.div
            key={partner.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              width={150}
              height={150}
              className="mx-auto"
            />
            <p className="mt-4 text-center text-gray-700 font-medium">{partner.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}