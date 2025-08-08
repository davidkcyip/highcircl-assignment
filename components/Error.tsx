function Error({
  errorMessage = "This page either does not exist or we were not able to fetch data for this page. Please try again.",
}: {
  errorMessage?: string;
}) {
  return (
    <div className="bg-rose-400 py-4 px-8 rounded text-center font-bold shadow-card">
      {errorMessage}
    </div>
  );
}

export default Error;
