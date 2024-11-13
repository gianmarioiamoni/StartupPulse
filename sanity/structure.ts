import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Authors")
        .child(S.documentTypeList("author").title("Authors")),
      // Puoi aggiungere altri tipi di documenti come questo:
      // S.listItem()
      //   .title('Posts')
      //   .child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title("Startups")
        .child(S.documentTypeList("startup").title("Startups")),
    ]);