import { motion } from 'framer-motion'
import { 
  Cpu, Database, Globe, Code, Brain, Shield, 
  Rocket, Cog, Laptop, Radio, Microscope, Atom,
  Wifi, Server, Cable, Wrench, Gauge, Lightbulb
} from 'lucide-react'

const fields = [
  {
    title: "Computer Science",
    icon: Code,
    description: "Software development, algorithms, and computer systems",
    color: "from-blue-500 to-purple-600"
  },
  {
    title: "Networks & Security",
    icon: Shield,
    description: "Network infrastructure, cybersecurity, and cloud computing",
    color: "from-red-500 to-orange-600"
  },
  {
    title: "Industrial Engineering",
    icon: Cog,
    description: "Process optimization, manufacturing, and automation",
    color: "from-emerald-500 to-teal-600"
  },
  {
    title: "Telecommunications",
    icon: Wifi,
    description: "Communication systems, signal processing, and wireless technologies",
    color: "from-yellow-500 to-orange-600"
  },
  {
    title: "Robotics & AI",
    icon: Brain,
    description: "Artificial intelligence, machine learning, and robotics",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "Electronics",
    icon: Cpu,
    description: "Circuit design, embedded systems, and microelectronics",
    color: "from-green-500 to-teal-600"
  }
]

export default function FieldsOverview() {
  return (
    <section id="fields" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-purple-600 text-transparent bg-clip-text">
            Engineering Fields
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore diverse engineering specializations and find your perfect match
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map((field, index) => (
            <motion.div
              key={field.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${field.color}`} />
              <div className="p-6">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${field.color} flex items-center justify-center mb-4`}>
                  <field.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{field.title}</h3>
                <p className="text-gray-600">{field.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}