---
title: Notes about SQLite FTS3 and FTS4
description: FTS4 contentless and external content table implementation notes
date: 2017-05-03
tags: [Full_Text_Search, SQLite]
---

See [the documentation for the content option for fts4 tables](https://www.sqlite.org/fts3.html#*fts4content)

## Implementation Strategy

The way I choose: Using contentless table then joining with the table which contains the data.

This approach has:
- No data duplication
- FTS indexing only the needed column

Using external content table would also save space and allow easier syntax for retrieving data but will also require join to get the non-indexed columns (this would have been solved if android supports newer version of sqlite which allows notindexed option).

## Creating the Index

```sql
CREATE VIRTUAL TABLE pageTextSearch USING fts4(content="", page);
INSERT INTO pageTextSearch(docid,page) SELECT id,page from pages;
select pages.page,pages.id,pages.partnumber,pages.pagenumber ,searchResult.docid,matchedinfo
from pages
inner join
(select docid,matchinfo(pageTextSearch) as matchedinfo from pageTextSearch where pageTextSearch.page match "نَافِع") as searchResult
on pages.id=searchResult.docid
```

## FTS Search

```sql
select
searchResult.docid as searchResult_pageId,
pages.partnumber as searchResult_partnumber,
pages.pagenumber as searchResult_pagenumber,
pages.page as searchResult_page,

titles.id as parent_title_id,
titles.title as parent_title_title,
titles.pageid  as parent_title_pageid,
titlePage.pagenumber as parent_title_pagenumber,
titlePage.partnumber as parent_title_partnumber,
titlePage.page as parent_title_page

from
(SELECT docid FROM pageTextSearch WHERE page MATCH ?
)
as searchResult
join
titles
on
titles.pageid =(select max(titles.pageid) from titles where titles.pageid<=searchResult.docid)
join
pages
on
pages.id=searchResult.docid
join
pages as titlePage
on
titlePage.id=titles.pageid

order by pages.id
```

