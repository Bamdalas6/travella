import React, { useState } from 'react';
import { Search, LayoutGrid, List, Sparkles, MapPin } from 'lucide-react';
import DestinationCard from './DestinationCard';
import CategoryChips from './CategoryChips';

export default function ExploreTab({
  destinations,
  onSelectDestination,
  savedIds,
  onToggleSave
}) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const filtered = destinations.filter((dest) => {
    const matchesCat = activeCategory === 'all' || dest.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      dest.title.toLowerCase().includes(search.toLowerCase()) ||
      dest.location.toLowerCase().includes(search.toLowerCase()) ||
      dest.country.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8F7F4] pb-28">
      <div className="px-6 pt-5 pb-3">
        <h1 className="text-2xl font-bold text-[#1A1C1E] tracking-tight">Explore Stays</h1>
        <p className="text-xs text-[#6A717A] mt-0.5">Find your dream retreat across 40+ countries</p>
      </div>

      {/* Search Input */}
      <div className="px-6 py-2">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8E95A0] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by country, city or feature..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E7E2] rounded-xl text-xs font-medium text-[#1A1C1E] placeholder:text-[#8E95A0] focus:outline-none focus:border-[#387FAB]"
          />
        </div>
      </div>

      {/* Category Chips */}
      <CategoryChips
        selectedCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />

      {/* View Mode Controls & Count */}
      <div className="px-6 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#6A717A]">
          Showing {filtered.length} curated stays
        </span>
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E8E7E2]">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'grid' ? 'bg-[#387FAB] text-white' : 'text-[#6A717A] hover:bg-[#F8F7F4]'
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg transition-colors ${
              viewMode === 'list' ? 'bg-[#387FAB] text-white' : 'text-[#6A717A] hover:bg-[#F8F7F4]'
            }`}
            aria-label="List view"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Destinations List / Grid */}
      <div className="px-6">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-[#E8E7E2] p-8">
            <Sparkles className="w-10 h-10 text-[#8E95A0] mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#1A1C1E]">No stays found</h3>
            <p className="text-xs text-[#6A717A] mt-1">Try relaxing your search terms or category filter.</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <DestinationCard
                key={item.id}
                destination={item}
                layout="vertical"
                onSelect={onSelectDestination}
                isSaved={savedIds.includes(item.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <DestinationCard
                key={item.id}
                destination={item}
                layout="horizontal"
                onSelect={onSelectDestination}
                isSaved={savedIds.includes(item.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
