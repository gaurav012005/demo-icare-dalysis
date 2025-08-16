import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchAndFilter = ({ onSearch, onFilter, activeFilters = {} }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(activeFilters);

  const documentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'pdf', label: 'PDF Documents' },
    { value: 'image', label: 'Images' },
    { value: 'doc', label: 'Word Documents' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const doctors = [
    { value: 'all', label: 'All Doctors' },
    { value: 'sharma', label: 'Dr. Rajesh Sharma' },
    { value: 'patel', label: 'Dr. Priya Patel' },
    { value: 'kumar', label: 'Dr. Amit Kumar' },
    { value: 'singh', label: 'Dr. Sunita Singh' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'draft', label: 'Draft' }
  ];

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...tempFilters,
      [filterType]: value
    };
    setTempFilters(newFilters);
  };

  const applyFilters = () => {
    onFilter(tempFilters);
    setShowFilters(false);
  };

  const clearFilters = () => {
    const clearedFilters = {
      type: 'all',
      dateRange: 'all',
      doctor: 'all',
      status: 'all',
      customStartDate: '',
      customEndDate: ''
    };
    setTempFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => 
      value && value !== 'all' && value !== ''
    )?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg clinical-shadow">
      <div className="p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="Search" size={20} className="text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search documents by name, doctor, or content..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
          
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            iconPosition="left"
            className="relative"
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Document Type Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Document Type
                </label>
                <select
                  value={tempFilters?.type || 'all'}
                  onChange={(e) => handleFilterChange('type', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {documentTypes?.map(type => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date Range
                </label>
                <select
                  value={tempFilters?.dateRange || 'all'}
                  onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {dateRanges?.map(range => (
                    <option key={range?.value} value={range?.value}>
                      {range?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Doctor Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Doctor
                </label>
                <select
                  value={tempFilters?.doctor || 'all'}
                  onChange={(e) => handleFilterChange('doctor', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {doctors?.map(doctor => (
                    <option key={doctor?.value} value={doctor?.value}>
                      {doctor?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={tempFilters?.status || 'all'}
                  onChange={(e) => handleFilterChange('status', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  {statusOptions?.map(status => (
                    <option key={status?.value} value={status?.value}>
                      {status?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Date Range */}
            {tempFilters?.dateRange === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Input
                  label="Start Date"
                  type="date"
                  value={tempFilters?.customStartDate || ''}
                  onChange={(e) => handleFilterChange('customStartDate', e?.target?.value)}
                />
                <Input
                  label="End Date"
                  type="date"
                  value={tempFilters?.customEndDate || ''}
                  onChange={(e) => handleFilterChange('customEndDate', e?.target?.value)}
                />
              </div>
            )}

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <Button
                variant="ghost"
                onClick={clearFilters}
                iconName="X"
                iconPosition="left"
              >
                Clear All Filters
              </Button>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={applyFilters}
                  iconName="Check"
                  iconPosition="left"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {getActiveFilterCount() > 0 && !showFilters && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center space-x-2 flex-wrap">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {Object.entries(activeFilters)?.map(([key, value]) => {
                if (!value || value === 'all' || value === '') return null;
                
                let displayValue = value;
                if (key === 'doctor') {
                  const doctor = doctors?.find(d => d?.value === value);
                  displayValue = doctor ? doctor?.label : value;
                } else if (key === 'type') {
                  const type = documentTypes?.find(t => t?.value === value);
                  displayValue = type ? type?.label : value;
                } else if (key === 'dateRange') {
                  const range = dateRanges?.find(r => r?.value === value);
                  displayValue = range ? range?.label : value;
                } else if (key === 'status') {
                  const status = statusOptions?.find(s => s?.value === value);
                  displayValue = status ? status?.label : value;
                }
                
                return (
                  <span
                    key={key}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {displayValue}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-1 h-4 w-4"
                      onClick={() => {
                        const newFilters = { ...activeFilters, [key]: 'all' };
                        onFilter(newFilters);
                      }}
                    >
                      <Icon name="X" size={12} />
                    </Button>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;