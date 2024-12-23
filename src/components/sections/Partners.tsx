import { motion } from "framer-motion"

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
            <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-xl font-semibold text-gray-700">{partner.name}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}