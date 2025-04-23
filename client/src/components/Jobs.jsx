import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'


const Jobs = () => {
  const { getAllJobs, searchedQuery } = useSelector(state => state.jobs)
  const [filterJobs, setFilterJobs] = useState(getAllJobs)

  useEffect(() => {
    if (searchedQuery) {
      const filtered = getAllJobs.filter(job =>
        job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      )
      setFilterJobs(filtered)
    } else {
      setFilterJobs(getAllJobs)
    }
  }, [getAllJobs, searchedQuery])

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 max-w-7xl mx-auto w-full overflow-hidden mt-4">
        
        {/* Filter Section */}
        <div className="w-64 min-w-[240px] bg-white border-r px-4 py-6 overflow-y-auto">
          <FilterCard />
        </div>

        {/* Job Cards Section */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {
            filterJobs.length <= 0 ? (
              <p className="text-center text-gray-500 mt-10">No jobs found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )
          }
        </div>
      </div>
      
    </div>
  )
}

export default Jobs
