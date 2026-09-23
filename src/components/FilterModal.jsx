import React, { useState, useEffect } from 'react';
import { X, Star, Check, RotateCcw } from 'lucide-react';
import { CATEGORIES } from '../data/destinations';

const AVAILABLE_AMENITIES = [
  { id: 'wifi', name: 'High-Speed WiFi' },
  { id: 'pool', name: 'Infinity Pool' },
  { id: 'breakfast', name: 'Artisan Breakfast' },
  { id: 'ac', name: 'Climate Control' },
  { id: 'view', name: 'Ocean Panorama' },
  { id: 'spa', name: 'Private Spa' },
  { id: 'parking', name: 'Valet Parking' }
];

export default function FilterModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters
}) {
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice || 1000);
  const [selectedCategory, setSelectedCategory] = useState(filters.category || 'all');
  const [minRating, setMinRating] = useState(filters.minRating || 0);
  const [selectedAmenities, setSelectedAmenities] = useState(filters.amenities || []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleAmenity = (id) => {
    if (selectedAmenities.includes(id)) {
      setSelectedAmenities(selectedAmenities.filter(item => item !== id));
    } else {
      setSelectedAmenities([...selectedAmenities, id]);
    }
  };

  const handleReset = () => {
    setMaxPrice(1000);
    setSelectedCategory('all');
    setMinRating(0);
    setSelectedAmenities([]);
  };

  const handleApply = () => {
    onApplyFilters({
      maxPrice,
      category: selectedCategory,
      minRating,
      amenities: selectedAmenities
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="filter-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-t-[2.5rem] sm:rounded-3xl max-h-[85vh] overflow-y-auto no-scrollbar shadow-travella-lg border border-[#E8E7E2]"
      >
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F4F3EF] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <h3 id="filter-modal-title" className="text-base font-bold text-[#1A1C1E]">Filters</h3>
            <button
              onClick={handleReset}
              className="text-xs text-[#387FAB] hover:underline flex items-center gap-1 font-semibold ml-2"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#F4F3EF] text-[#6A717A] hover:text-[#1A1C1E]"
            aria-label="Close filter modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1A1C1E]">Max Price per Night</span>
              <span className="text-sm font-extrabold text-[#387FAB]">Up to ${maxPrice}</span>
            </div>
            <input
              type="range"
              min="150"
              max="1000"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#387FAB] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#8E95A0] mt-1 font-medium">
              <span>$150</span>
              <span>$500</span>
              <span>$1,000+</span>
            </div>
          </div>

          {/* Category */}
          <div>
            <span className="text-xs font-bold text-[#1A1C1E] block mb-2.5">Category</span>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#387FAB] text-white border-[#387FAB] shadow-xs'
                      : 'bg-white text-[#6A717A] border-[#E8E7E2] hover:bg-[#F8F7F4]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating */}
          <div>
            <span className="text-xs font-bold text-[#1A1C1E] block mb-2.5">Minimum Rating</span>
            <div className="grid grid-cols-4 gap-2">
              {[0, 4.5, 4.8, 4.9].map((ratingVal) => (
                <button
                  key={ratingVal}
                  type="button"
                  onClick={() => setMinRating(ratingVal)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1 transition-all ${
                    minRating === ratingVal
                      ? 'bg-[#387FAB] text-white border-[#387FAB] shadow-xs'
                      : 'bg-white text-[#6A717A] border-[#E8E7E2] hover:bg-[#F8F7F4]'
                  }`}
                >
                  {ratingVal === 0 ? (
                    'Any'
                  ) : (
                    <>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{ratingVal}+</span>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <span className="text-xs font-bold text-[#1A1C1E] block mb-2.5">Amenities</span>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_AMENITIES.map((item) => {
                const isSelected = selectedAmenities.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAmenity(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-[#E8F1F8] border-[#387FAB] text-[#387FAB]'
                        : 'bg-white border-[#E8E7E2] text-[#6A717A] hover:bg-[#F8F7F4]'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 bg-[#F4F3EF] hover:bg-[#E8E7E2] text-[#1A1C1E] text-xs font-bold rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-3.5 bg-[#387FAB] hover:bg-[#2E698D] text-white text-xs font-bold rounded-2xl shadow-travella-float transition-all active:scale-98"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
