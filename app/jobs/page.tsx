import FilterSideBar from "@/components/Job/filterCard";
import JobCard from "@/components/Job/jobCard";

export default function AllJobs() {
  const arr = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex">
      <FilterSideBar />

      <div className="flex flex-col gap-8 max-h-screen overflow-y-scroll no-scrollbar mt-8">
        {arr.map((e) => {
          return <JobCard />;
        })}
      </div>
    </div>
  );
}
