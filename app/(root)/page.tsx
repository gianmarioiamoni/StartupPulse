import SearchForm from "../../components/SearchForm";
import StartupCard from "../../components/StartupCard";

export default async function Home({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "John Doe" },
      _id: 1,
      description: "The Pulse of New Startups. Be Part of the Journey.",
      image: "https://thumbs.dreamstime.com/b/dog-reading-newspaper-cool-funny-jack-russell-magazine-125398832.jpg?w=768",
      category: "Robots",
      title: "We Robots"
    }
  ]
  
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
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={index} post={post}/>
            ))
          ) : (
              <p className="no-results">No startups found</p>
          )}
        </ul>  
      </section>

    </> 
  );
}
