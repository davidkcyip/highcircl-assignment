import { ReactNode } from "react";
import { SearchBar } from "@/components/SearchBar";
import Head from "next/head";

function Layout({
  children,
  title,
  description,
  SITE_URL,
  OPEN_METEO_ENDPOINT,
}: {
  children: ReactNode;
  title: string;
  description: string;
  SITE_URL: string;
  OPEN_METEO_ENDPOINT: string;
}) {
  return (
    <>
      <Head>
        <title>{title} - Open Meteo Assignment</title>
        <meta name="description" content={description} />
      </Head>
      <header>
        <SearchBar
          SITE_URL={SITE_URL}
          OPEN_METEO_ENDPOINT={OPEN_METEO_ENDPOINT}
        />
      </header>
      <main>{children}</main>
    </>
  );
}

export default Layout;
