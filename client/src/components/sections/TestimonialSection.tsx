import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Soufiane Abdelouahab",
    role: "Software Engineer at Microsoft",
    image: "https://scontent.ftng3-2.fna.fbcdn.net/v/t39.30808-6/398122406_3830655560536156_6339114606259192356_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeF_rWdaxDkOA4_NykqY3_cX4QovoiWL7ufhCi-iJYvu5-X739ksYqSgUDNpNaufoEn0i6fzI4ElnGHElb2bBQl2&_nc_ohc=aompfvaZLAoQ7kNvgEO5Nbj&_nc_oc=Adgf8PJwVVkZAmdaKLoSGX0OOFvYtCmEfMq2qMrNyUC7vpVcSmDtjNnfUB-mvuc-95E&_nc_zt=23&_nc_ht=scontent.ftng3-2.fna&_nc_gid=A7rK9y7tIY2W8Z4E5CrIyYd&oh=00_AYDmuflcWrKkGyINAHG1WiPqpdMWTJl8aWLXjkaNWbATIw&oe=67AF076A",
    quote: "This platform helped me discover my passion for software engineering. Now I'm living my dream!"
  },
  {
    name: "Taha Naya",
    role: "Oracle Cloud Specialist",
    image: "https://scontent.ftng3-2.fna.fbcdn.net/v/t39.30808-1/469113926_1251906592809888_6719615310893370798_n.jpg?stp=dst-jpg_s160x160_tt6&_nc_cat=107&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEBMZWjH9NFyGfirBVBOo6r4L3VW9SK1vngvdVb1IrW-bBCrslRUseFdVyr8yj_X0vU0_zZmZ2EdXTTvjbLt_z0&_nc_ohc=cfRSHJCu3rYQ7kNvgGmWsoZ&_nc_oc=AdhxMfg_pfiv0zLzf9_I1x76e7CI0NhGirmOv0sXv0Zl9DFgenN-aomTsboh-VsNoGw&_nc_zt=24&_nc_ht=scontent.ftng3-2.fna&_nc_gid=A2qdwl3DXnXzIu-pDF6UC5j&oh=00_AYBr3IzAPq9RcDr-O2E5nrC7dV0emK4sM8ugrJIbP4ObFw&oe=67AEEFDD",
    quote: "The career guidance was spot-on! It helped me choose the perfect specialization in cybersecurity."
  },
  {
    name: "Hilaly Anas",
    role: "Industrial Engineer",
    image: "https://scontent.ftng3-2.fna.fbcdn.net/v/t39.30808-6/459882644_1881745458903698_2117682185675402320_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEvMXRjSDWO5yQcq8rrCdngJ_6KERYxp4Un_ooRFjGnhfsgbFibrm2cs1Ps5EQesk39ozOXmXf__5HCNxiu5fII&_nc_ohc=KjuFQmlJUUAQ7kNvgGj0gVY&_nc_oc=AdhuZ5t78qlhjnB0vo3GY_yVydat4ygFJq8tIKrjT_hpDLGh06TwKbt35Gko9ip-wt8&_nc_zt=23&_nc_ht=scontent.ftng3-2.fna&_nc_gid=AyiJxStHpnNeweukrc_pEAJ&oh=00_AYArXZxvvTGdGACxm_VS_GrUP8hQYwoi61uVdCNi8NCVBg&oe=67AEEB3A",
    quote: "Thanks to this platform, I found my calling in industrial engineering. The assessment was incredibly accurate!"
  }
]

export default function TestimonialSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 to-emerald-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Hear from engineers who found their path through our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
            >
              <Quote className="w-8 h-8 text-purple-400 mb-4" />
              <p className="text-gray-200 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-300">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}