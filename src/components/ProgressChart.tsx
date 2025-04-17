
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useStore } from '@/lib/store';

const ProgressChart: React.FC = () => {
  const { tasks } = useStore();
  
  // Count tasks by status
  const completed = tasks.filter(task => task.status === 'completed').length;
  const inProgress = tasks.filter(task => task.status === 'in-progress').length;
  const pending = tasks.filter(task => task.status === 'pending').length;
  
  const data = [
    { name: 'Completed', value: completed, color: '#10B981' },
    { name: 'In Progress', value: inProgress, color: '#3B82F6' },
    { name: 'Pending', value: pending, color: '#6B7280' },
  ];

  // Calculate percentage for progress indicator
  const total = tasks.length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} Tasks`, '']} 
              labelFormatter={(label) => `${label}`}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex items-center justify-between gap-2 w-full mt-4">
        {data.map((status) => (
          <div 
            key={status.name} 
            className="flex items-center text-sm"
          >
            <span 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: status.color }}
            />
            <span>{status.name}: {status.value}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex flex-col items-center w-full">
        <div className="text-2xl font-bold">{completionRate}%</div>
        <div className="text-sm text-muted-foreground">Completion rate</div>
      </div>
    </div>
  );
};

export default ProgressChart;
