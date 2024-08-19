import FilterSideBar from "@/components/Job/filterCard";
import JobCard from "@/components/Job/jobCard";
import Navbar from "@/components/Navbar/Navbar";

export default function AllJobs() {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="bg-gray-100">
      <Navbar />
      <FilterSideBar />
      <FilterSideBar />
      <div>
        {arr.map((e) => {
          return <JobCard />;
        })}
      </div>
    </div>
  );
}
