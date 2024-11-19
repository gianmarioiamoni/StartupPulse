import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupTypeCard} from "../../components/StartupCard";
import { STARTUPS_QUERY } from "../../sanity/lib/queries";

import { sanityFetch, SanityLive } from "../../sanity/lib/live"

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});

  console.log(JSON.stringify(posts, null, 2))

  
  return (
    <>
      <section className="yellow_container">
        <h1 className="heading"> The Pulse of New Startups. <br /> Be Part of the Journey.</h1>
        <p className="sub-heading !max-w-3xl !font-weight-bold">
          Share your startup vision. <br /> Earn community votes and stand out in a virtual arena.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post}/>
            ))
          ) : (
              <p className="no-results">No startups found</p>
          )}
        </ul>  
      </section>

      <SanityLive />

    </> 
  );
}
