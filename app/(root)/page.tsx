import SearchForm from "../../components/SearchForm";
export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  
  return (
    <>
      <section className="yellow_container">
        <h1 className="heading"> The Pulse of New Startups. <br /> Be Part of the Journey.</h1>
        <p className="sub-heading !max-w-3xl !font-weight-bold">
          Share your startup vision. <br /> Earn community votes and stand out in a virtual arena.
        </p>

        <SearchForm query={query} />
      </section>

    </> 
  );
}
