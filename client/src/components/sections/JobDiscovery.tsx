import { motion } from 'framer-motion'
import { useState } from 'react'
import { Search, Briefcase, MapPin, ExternalLink, Building2, Compass } from 'lucide-react'

interface Job {
  title: string
  company: string
  location: string
  link: string
  description: string | null
}

export default function JobDiscovery() {
  const [searchTerm, setSearchTerm] = useState('')
  const [location, setLocation] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])

  // Reverse-geocode coordinates using OpenStreetMap Nominatim
  async function getLocationFromCoordinates(lat: number, lon: number): Promise<string> {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
      )
      const data = await response.json()
      // Return city/town/village/state if available
      return data.address.city || data.address.town || data.address.village || data.address.state || ''
    } catch (error) {
      console.error('Error fetching location data:', error)
      return ''
    }
  }

  // Handler to detect current location using the browser's geolocation API
  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          const loc = await getLocationFromCoordinates(lat, lon)
          setLocation(loc)
        },
        (error) => {
          console.error('Error getting geolocation:', error)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser')
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const url = `http://127.0.0.1:8000/jobs/?job_title=${encodeURIComponent(
        searchTerm
      )}&location=${encodeURIComponent(location)}&pages=3`
      const response = await fetch(url)
      const data = await response.json()
      setJobs(data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-500 to-purple-600 text-transparent bg-clip-text">
            Discover Engineering Opportunities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the perfect engineering job that matches your skills and aspirations
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.form
          onSubmit={handleSearch}
          className="max-w-3xl mx-auto mb-12 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Job Title Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for jobs or companies..."
              className="w-full px-6 py-4 pr-12 rounded-full border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-emerald-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all disabled:opacity-50"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Location Input and Detect Button */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location..."
              className="flex-1 px-6 py-4 rounded-full border-2 border-purple-100 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
            />
            <button
              type="button"
              onClick={handleDetectLocation}
              className="p-2 bg-gradient-to-r from-emerald-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all"
            >
              <Compass className="w-5 h-5" />
            </button>
          </div>
        </motion.form>

        {/* Job Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 6 }).map((_, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm animate-pulse"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </motion.div>
            ))
          ) : (
            jobs.map((job, index) => (
              <motion.div
                key={job.link}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Building2 className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.company}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-purple-500 hover:text-purple-600 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
                
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 group-hover:gap-2 transition-all"
                  >
                    View Details
                    <motion.span
                      className="inline-block"
                      initial={{ x: -10, opacity: 0 }}
                      whileHover={{ x: 0, opacity: 1 }}
                    >
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </motion.span>
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {jobs.length === 0 && !isLoading && (searchTerm || location) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or explore different categories
            </p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
