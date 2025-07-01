
import React from 'react';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TaskPriority, TaskStatus } from '@/types/task';

interface TaskFiltersProps {
  selectedFilter: 'all' | TaskStatus;
  selectedPriority: 'all' | TaskPriority;
  onFilterChange: (filter: 'all' | TaskStatus) => void;
  onPriorityChange: (priority: 'all' | TaskPriority) => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  selectedFilter,
  selectedPriority,
  onFilterChange,
  onPriorityChange,
}) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Filter className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600 hidden md:block">Filter:</span>
      </div>
      
      <Select value={selectedFilter} onValueChange={onFilterChange}>
        <SelectTrigger className="w-32 bg-white shadow-sm border-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="todo">To Do</SelectItem>
          <SelectItem value="in_progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedPriority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-32 bg-white shadow-sm border-gray-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Priority</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
