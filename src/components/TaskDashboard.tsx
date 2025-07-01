
import React, { useState } from 'react';
import { Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { TaskFilters } from './TaskFilters';
import { AuthHeader } from './AuthHeader';
import { Task, TaskPriority, TaskStatus } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';

export const TaskDashboard = () => {
  const { tasks, loading, createTask, updateTask, deleteTask } = useTasks();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | TaskStatus>('all');
  const [selectedPriority, setSelectedPriority] = useState<'all' | TaskPriority>('all');

  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    await createTask(taskData);
    setShowTaskForm(false);
  };

  const handleUpdateTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingTask) return;
    
    await updateTask(editingTask.id, taskData);
    setEditingTask(null);
    setShowTaskForm(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedFilter === 'all' || task.status === selectedFilter;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in_progress').length,
    todo: tasks.filter(t => t.status === 'todo').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AuthHeader />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your tasks...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AuthHeader />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
              <p className="text-gray-600">Organize, track, and collaborate on your tasks</p>
            </div>
            
            <Button 
              onClick={() => {
                setEditingTask(null);
                setShowTaskForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4 bg-white shadow-sm border-0 shadow-blue-100">
              <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </Card>
            <Card className="p-4 bg-white shadow-sm border-0 shadow-green-100">
              <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </Card>
            <Card className="p-4 bg-white shadow-sm border-0 shadow-orange-100">
              <div className="text-2xl font-bold text-orange-600">{taskStats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </Card>
            <Card className="p-4 bg-white shadow-sm border-0 shadow-gray-100">
              <div className="text-2xl font-bold text-gray-600">{taskStats.todo}</div>
              <div className="text-sm text-gray-600">To Do</div>
            </Card>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white shadow-sm border-gray-200"
              />
            </div>
            
            <TaskFilters
              selectedFilter={selectedFilter}
              selectedPriority={selectedPriority}
              onFilterChange={setSelectedFilter}
              onPriorityChange={setSelectedPriority}
            />
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={filteredTasks}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
            onCancel={() => {
              setShowTaskForm(false);
              setEditingTask(null);
            }}
          />
        )}
      </div>
    </div>
  );
};
