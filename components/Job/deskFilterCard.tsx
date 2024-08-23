import FilterSideBar from "./filterCard";

export default function DesktopFilterCard() {
  return (
    <div className="hidden lg:flex flex-col gap-4 border-r-2 min-w-[300px] w-1/5 bg-white rounded-md max-h-screen overflow-y-scroll filter-scrollbar">
      <FilterSideBar />
    </div>
  );
}
