import { useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useMenuFilters = (initialItems) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL params — stable string references
  const search   = searchParams.get('search')   || '';
  const category = searchParams.get('category') || 'All';
  const sort     = searchParams.get('sort')      || 'default';
  const price    = searchParams.get('price')     || '';
  const tagsParam = searchParams.get('tags')     || '';

  // Stable filtered/sorted list — deps are all primitive strings
  const filteredItems = useMemo(() => {
    const activeTags = tagsParam ? tagsParam.split(',') : [];
    let result = [...initialItems];

    // 1. Category filter
    if (category && category !== 'All') {
      result = result.filter(item => item.category === category);
    }

    // 2. Full-text search (name + description)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }

    // 3. Price range filter
    if (price === 'under-100') {
      result = result.filter(item => item.price < 100);
    } else if (price === '100-200') {
      result = result.filter(item => item.price >= 100 && item.price <= 200);
    } else if (price === 'over-200') {
      result = result.filter(item => item.price > 200);
    }

    // 4. Dietary / tag filter (AND logic — item must have ALL selected tags)
    if (activeTags.length > 0) {
      result = result.filter(item =>
        activeTags.every(tag => item.tags && item.tags.includes(tag))
      );
    }

    // 5. Sorting
    switch (sort) {
      case 'price-asc':   result.sort((a, b) => a.price - b.price);                break;
      case 'price-desc':  result.sort((a, b) => b.price - a.price);                break;
      case 'rating-desc': result.sort((a, b) => b.rating - a.rating);              break;
      case 'name-asc':    result.sort((a, b) => a.name.localeCompare(b.name));     break;
      default:            break; // preserve data-source order (i.e. popularity)
    }

    return result;
  // All deps are primitive strings — no stale-array bug
  }, [initialItems, search, category, sort, price, tagsParam]);

  // ── Setters ────────────────────────────────────────────────────────────────
  const updateParam = useCallback((key, value) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (value && value !== 'All' && value !== 'default') {
        next.set(key, value);
      } else {
        next.delete(key);
      }
      return next;
    });
  }, [setSearchParams]);

  const setSearch   = useCallback((val) => updateParam('search',   val), [updateParam]);
  const setCategory = useCallback((val) => updateParam('category', val), [updateParam]);
  const setSort     = useCallback((val) => updateParam('sort',     val), [updateParam]);
  const setPrice    = useCallback((val) => updateParam('price',    val), [updateParam]);

  const toggleTag = useCallback((tag) => {
    const current = tagsParam ? tagsParam.split(',') : [];
    const next = current.includes(tag)
      ? current.filter(t => t !== tag)
      : [...current, tag];
    updateParam('tags', next.join(','));
  }, [tagsParam, updateParam]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams());
  }, [setSearchParams]);

  const clearFilter = useCallback((key) => {
    updateParam(key, '');
  }, [updateParam]);

  // Count only the active sidebar filters (exclude 'category' — handled by pills)
  const activeFiltersCount = ['search', 'price', 'tags'].reduce(
    (acc, key) => acc + (searchParams.has(key) ? 1 : 0),
    0
  );

  return {
    filteredItems,
    filters: {
      search,
      category,
      sort,
      price,
      activeTags: tagsParam ? tagsParam.split(',') : [],
    },
    setSearch,
    setCategory,
    setSort,
    setPrice,
    toggleTag,
    clearFilters,
    clearFilter,
    activeFiltersCount,
  };
};
