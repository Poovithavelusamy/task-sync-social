
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Task } from '@/types/task';
import { useToast } from '@/hooks/use-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchTasks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch tasks",
          variant: "destructive",
        });
        return;
      }

      const formattedTasks: Task[] = data?.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        status: task.status as any,
        priority: task.priority as any,
        dueDate: task.due_date || undefined,
        category: task.category || undefined,
        assignedTo: task.assigned_to || undefined,
        createdAt: task.created_at,
        updatedAt: task.updated_at,
      })) || [];

      setTasks(formattedTasks);
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          user_id: user.id,
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          due_date: taskData.dueDate || null,
          category: taskData.category || null,
          assigned_to: taskData.assignedTo || null,
        })
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create task",
          variant: "destructive",
        });
        return;
      }

      const newTask: Task = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        status: data.status as any,
        priority: data.priority as any,
        dueDate: data.due_date || undefined,
        category: data.category || undefined,
        assignedTo: data.assigned_to || undefined,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      setTasks(prev => [newTask, ...prev]);
      
      toast({
        title: "Success",
        description: "Task created successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const updateTask = async (taskId: string, taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
          priority: taskData.priority,
          due_date: taskData.dueDate || null,
          category: taskData.category || null,
          assigned_to: taskData.assignedTo || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', taskId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update task",
          variant: "destructive",
        });
        return;
      }

      const updatedTask: Task = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        status: data.status as any,
        priority: data.priority as any,
        dueDate: data.due_date || undefined,
        category: data.category || undefined,
        assignedTo: data.assigned_to || undefined,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
      };

      setTasks(prev => prev.map(task => task.id === taskId ? updatedTask : task));
      
      toast({
        title: "Success",
        description: "Task updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete task",
          variant: "destructive",
        });
        return;
      }

      setTasks(prev => prev.filter(task => task.id !== taskId));
      
      toast({
        title: "Success",
        description: "Task deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
