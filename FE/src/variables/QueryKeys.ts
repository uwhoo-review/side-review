import { CONTENTS_TABS } from "@src/variables/APIConstants";

interface SearchFilterProps {
  filter: { type: string; value: any[] }[];
  search: string | null;
  sort: string | null;
  p?: number;
}

interface ReviewProps {
  id: string;
  sort: string;
  isSpoiler: number;
  page: number;
  size: number;
  type?: string;
}

export const QUERY_KEYS = {
  all: ["all"] as const,
  tabs: ["all", "tabs"] as const,
  mainTabs: ["all", "tabs", CONTENTS_TABS.MAIN] as const,
  popularTabs: (p: number = 0) => ["all", "tabs", CONTENTS_TABS.POPULARITY, p] as const,
  recentlyTabs: (p: number = 0) => ["all", "tabs", CONTENTS_TABS.NEW, p] as const,
  upcomingTabs: (p: number = 0) => ["all", "tabs", CONTENTS_TABS.OPEN, p] as const,
  searchAll: ["all", "search"] as const,
  searchContent: ({ filter, search, sort, p = 0 }: SearchFilterProps) =>
    ["all", "search", "content", filter, search, sort, p] as const,
  searchPerson: ({ filter, search, sort, p = 0 }: SearchFilterProps) =>
    ["all", "search", "person", filter, search, sort, p] as const,
  searchSimilar: ({ filter, search, sort, p = 0 }: SearchFilterProps) =>
    ["all", "search", "similar", filter, search, sort, p] as const,

  person: (id: string) => ["all", "person", id] as const,

  detail: (id: string) => ["all", "detail", id] as const,
  reviewAll: ["all", "review"] as const,
  review: ({ id, sort, isSpoiler, page, size, type }: ReviewProps) =>
    ["all", "review", id, sort, isSpoiler, page, size, type] as const,

  user: ["user"] as const,
  userDetail: (id: string) => ["user", id] as const,

  userSearchContent: (p = 0, s = 0) => ["user", "content", "search", p, s] as const,
  userSearchPerson: (p = 0, s = 0) => ["user", "person", "search", p, s] as const,

  footPrints: ["user", "footprints"] as const,
  footPrintsStar: (p = 0, s = 0) => ["user", "footprints", "star", p, s] as const,
  footPrintsReview: (p = 0, s = 0) => ["user", "footprints", "review", p, s] as const,
};
