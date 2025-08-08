export default async function getData({
  URL,
  options,
}: {
  URL: string;
  options?: {
    method: string;
    headers: { accept: string; Authorization: string };
  };
}) {
  if (URL) {
    const response = await fetch(URL, options);

    const json = await response.json();

    return json || {};
  }
}
