import Layout from "@/components/Layout";
import Error from "@/components/Error";

function NotFound({
  SITE_URL,
  OPEN_METEO_ENDPOINT,
}: {
  SITE_URL: string;
  OPEN_METEO_ENDPOINT: string;
}) {
  return (
    <Layout
      title="Not Found"
      description="Welcome to the Open Meteo Assignment by David Yip"
      SITE_URL={SITE_URL}
      OPEN_METEO_ENDPOINT={OPEN_METEO_ENDPOINT}
    >
      <div className="m-4 gap-4">
        <Error />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const SITE_URL = process.env.SITE_URL;
  const OPEN_METEO_ENDPOINT = process.env.OPEN_METEO_ENDPOINT || "";

  return {
    props: {
      SITE_URL,
      OPEN_METEO_ENDPOINT,
    },
  };
}

export default NotFound;
