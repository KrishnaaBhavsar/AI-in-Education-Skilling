import { CheckCircle, Clock, BookOpen, Flame } from "lucide-react";

const stats = [
  {
    label: "Concepts Mastered",
    value: "12",
    icon: CheckCircle,
    color: "text-green-400",
  },
  { label: "Study Hours", value: "24.5h", icon: Clock, color: "text-blue-400" },
  {
    label: "Active Courses",
    value: "3",
    icon: BookOpen,
    color: "text-purple-400",
  },
  { label: "Day Streak", value: "7", icon: Flame, color: "text-orange-400" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-2">
            <stat.icon className={stat.color} size={24} />
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
