import { useSelector } from "react-redux"
import { Badge } from "./ui/badge"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"


const AppliedJobTable = () => {
  const {allAppliedJobs}=useSelector(state=>state.jobs);
  return (
    <div>
      <Table>
        <TableCaption>A list of applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
            </TableRow>
        </TableHeader>    
            <TableBody>
                {
                  allAppliedJobs.length<=0 ? <span>You Haven't Applied to any job yet</span> : allAppliedJobs.map((application)=>{
                     return(
                      <TableRow key={application?._id}>
                            <TableCell>{application?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell>{application?.job?.title}</TableCell>
                            <TableCell>{application?.job?.company?.name}</TableCell>
                            <TableCell className={`text-right`}><Badge className={`${application?.status==="rejected" ? 'bg-red-600':application?.status==="pending" ? 'bg-gray-600' : 'bg-green-600'}`}>{application?.status.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                     )
                   })
                }
            </TableBody>
        
      </Table>
    </div>
  )
}

export default AppliedJobTable
