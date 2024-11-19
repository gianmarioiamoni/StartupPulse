import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY = defineQuery(
  `*[_type=="startup" && defined(slug.current)
    && !(_id in path('drafts.**'))
    && !defined($search) ||
    title match $search ||
    category match $search ||
    author->name match $search] |
    order(_createdAt desc) {
        _id, 
        title, 
        slug, 
        _createdAt,
        author->{_id, name, bio},
        views, 
        description,
        category,
        image
    }`
);
