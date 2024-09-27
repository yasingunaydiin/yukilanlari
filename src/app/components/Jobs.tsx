import JobRow from "@/app/components/JobRow";

export default function Jobs() {
  return (
    <div className="bg-slate-100 p-6 rounded-2xl">
      <h1 className="font-bold mb-4">Güncel İşler</h1>
      <div className="flex flex-col gap-4">
        <JobRow />
        <JobRow />
        <JobRow />
        <JobRow />
        <JobRow />
      </div>
    </div>
  );
}
