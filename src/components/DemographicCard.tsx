import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { clsx } from 'clsx';
import { GoogleIcon } from './icons/GoogleIcon';
import { FacebookIcon } from './icons/FacebookIcon';
import { LinkedInIcon } from './icons/LinkedInIcon';

interface DemographicCardProps {
  title: string;
  type: 'gender' | 'age' | 'devices';
  data: any;
  tooltipDescription: string;
  selectedPlatforms: string[];
}

const COLORS = {
  gender: {
    Male: '#3B82F6',    // Blue
    Female: '#EC4899',  // Pink
    Other: '#6366F1'    // Indigo
  },
  age: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#DBEAFE'],
  devices: ['#3B82F6', '#60A5FA', '#93C5FD']
};

const platformIcons: Record<string, React.ReactNode> = {
  google: <GoogleIcon className="w-4 h-4" />,
  facebook: <FacebookIcon className="w-4 h-4" />,
  linkedin: <LinkedInIcon className="w-4 h-4" />
};

const platformColors: Record<string, string> = {
  google: '#4285F4',
  facebook: '#1877F2',
  linkedin: '#0A66C2'
};

interface TooltipProps {
  children: React.ReactNode;
  mouseX: number;
  mouseY: number;
}

const CustomTooltip: React.FC<TooltipProps> = ({ children, mouseX, mouseY }) => {
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      let x = mouseX;
      let y = mouseY - rect.height - 10;

      // Keep tooltip within card boundaries
      x = Math.max(10, Math.min(x, viewportWidth - rect.width - 10));
      
      setPosition({ x, y });
    }
  }, [mouseX, mouseY]);

  return (
    <div
      ref={tooltipRef}
      className="fixed z-50 bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] px-3 py-2 rounded-lg shadow-lg text-sm border border-[var(--color-border)]"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
      }}
    >
      {children}
    </div>
  );
};

const CustomChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-lg p-2 shadow-lg">
        <p className="text-[var(--color-text-primary)] text-sm font-medium">
          {`${payload[0].name}: ${payload[0].value.toFixed(1)}%`}
        </p>
      </div>
    );
  }
  return null;
};

const GenderPieChart: React.FC<{ data: any }> = ({ data }) => {
  const formattedData = [
    { name: 'Male', value: data.male },
    { name: 'Female', value: data.female },
    { name: 'Other', value: data.other }
  ];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="var(--color-text-primary)"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${name} ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={formattedData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={2}
          dataKey="value"
          label={renderCustomizedLabel}
          labelLine={false}
        >
          {formattedData.map((entry) => (
            <Cell 
              key={entry.name} 
              fill={COLORS.gender[entry.name as keyof typeof COLORS.gender]}
              stroke="var(--color-bg-secondary)"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip 
          content={<CustomChartTooltip />}
          cursor={false}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const DemographicCard: React.FC<DemographicCardProps> = ({
  title,
  type,
  data,
  tooltipDescription,
  selectedPlatforms
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const titleRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect();
      setMousePosition({
        x: rect.right,
        y: rect.top
      });
    }
  };

  const formatData = () => {
    if (type === 'age') {
      return Object.entries(data).map(([range, value]) => ({
        name: range,
        value: value as number
      }));
    } else if (type === 'devices') {
      return Object.entries(data).map(([device, value]) => ({
        name: device.charAt(0).toUpperCase() + device.slice(1),
        value: value as number
      }));
    }
    return [];
  };

  const renderChart = () => {
    if (type === 'gender') {
      return <GenderPieChart data={data} />;
    } else if (type === 'age') {
      const formattedData = formatData();
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={formattedData} barCategoryGap={4}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide />
            <Tooltip
              cursor={false}
              content={<CustomChartTooltip />}
            />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              minPointSize={2}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS.age[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      const formattedData = formatData();
      return (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={formattedData} layout="vertical" barCategoryGap={4}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12, fill: 'var(--color-text-secondary)' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={false}
              content={<CustomChartTooltip />}
            />
            <Bar 
              dataKey="value" 
              radius={[0, 4, 4, 0]}
              minPointSize={2}
            >
              {formattedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS.devices[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      );
    }
  };

  return (
    <div className="bg-[var(--color-card)] rounded-xl p-6 shadow-sm relative">
      <div className="flex items-center justify-between mb-4">
        <div ref={titleRef} className="flex items-center gap-2">
          <h3 className="text-[var(--color-text-primary)] font-medium">{title}</h3>
          <button
            className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onMouseMove={handleMouseMove}
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedPlatforms.map(platform => (
            <div
              key={platform}
              className={clsx(
                'w-6 h-6 rounded flex items-center justify-center',
                `bg-[${platformColors[platform]}]10`
              )}
              style={{ color: platformColors[platform] }}
            >
              {platformIcons[platform]}
            </div>
          ))}
        </div>
      </div>

      {renderChart()}

      {showTooltip && (
        <CustomTooltip mouseX={mousePosition.x} mouseY={mousePosition.y}>
          {tooltipDescription}
        </CustomTooltip>
      )}
    </div>
  );
};