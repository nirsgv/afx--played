// Track filtering and search run on the server (GET /api/tracks/search).

const areFiltersApplied = (filteredByTags, filteredByPeriods, filteredBySearch) => {
    return filteredByTags.length || filteredByPeriods.length || filteredBySearch.length;
};

export { areFiltersApplied };
