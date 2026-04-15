"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { 
  TrendingUp, 
  Package, 
  FileText, 
  MessageSquare, 
  Calendar,
  MoreHorizontal,
  Phone,
  Video,
  FileIcon,
  Send,
  CheckCircle2,
  Clock,
  PlayCircle
} from "lucide-react"

export default function DashboardOverview() {
  const [stats, setStats] = useState([
    { name: "Finished", value: "18", sub: "+8 tasks", icon: CheckCircle2, color: "blue" },
    { name: "Tracked", value: "31h", sub: "-6 hours", icon: Clock, color: "orange" },
    { name: "Efficiency", value: "93%", sub: "+12%", icon: TrendingUp, color: "green" },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const { count: toursCount } = await supabase.from('tours').select('*', { count: 'exact', head: true })
      const { count: postsCount } = await supabase.from('posts').select('*', { count: 'exact', head: true })
      const { count: viewsCount } = await supabase.from('page_views').select('*', { count: 'exact', head: true })

      setStats([
        { name: "Finished", value: "18", sub: "+8 tasks", icon: CheckCircle2, color: "blue" },
        { name: "Tracked", value: "31h", sub: "-6 hours", icon: Clock, color: "orange" },
        { name: "Efficiency", value: "93%", sub: "+12%", icon: TrendingUp, color: "green" },
      ])
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
      {/* Left & Middle Column */}
      <div className="flex-1 space-y-6 lg:space-y-8 min-w-0">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">Hello, Admin</h1>
            <p className="text-slate-500 text-sm mt-1">Track your progress here. You almost reach a goal!</p>
          </div>
          <div className="flex items-center self-start sm:self-auto gap-2 px-3 py-2 bg-white border border-slate-100 rounded-xl text-[10px] lg:text-xs font-bold text-slate-600 shadow-sm">
            <Calendar size={14} />
            <span>16 May, 2023</span>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-4 lg:p-5 rounded-2xl lg:rounded-3xl border border-slate-50 shadow-sm flex items-center gap-4">
              <div className={`p-3 rounded-xl lg:rounded-2xl ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-500' :
                stat.color === 'orange' ? 'bg-orange-50 text-orange-500' :
                'bg-emerald-50 text-emerald-500'
              }`}>
                <stat.icon size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">{stat.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-lg lg:text-xl font-bold text-slate-900">{stat.value}</span>
                  <span className={`text-[10px] font-bold ${
                    stat.color === 'blue' ? 'text-blue-500' :
                    stat.color === 'orange' ? 'text-orange-500' :
                    'text-emerald-500'
                  }`}>{stat.sub}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Chart Placeholder */}
        <div className="bg-white p-5 lg:p-8 rounded-2xl lg:rounded-[2rem] border border-slate-50 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-base lg:text-lg font-bold text-slate-900">Performance</h2>
            <div className="px-3 py-1.5 bg-slate-50 rounded-lg text-[10px] font-bold text-slate-500">
              01-07 May
            </div>
          </div>
          
          {/* Mock Chart using SVG */}
          <div className="relative h-40 lg:h-48 w-full mt-4">
            <svg className="w-full h-full" viewBox="0 0 1000 200" preserveAspectRatio="none">
              <line x1="0" y1="0" x2="1000" y2="0" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="50" x2="1000" y2="50" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="100" x2="1000" y2="100" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="150" x2="1000" y2="150" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="200" x2="1000" y2="200" stroke="#f1f5f9" strokeWidth="1" />
              
              <path 
                d="M0,150 C100,160 200,100 300,110 C400,120 500,60 600,80 C700,100 800,40 900,60 C1000,80 1000,200 0,200 Z" 
                fill="url(#blueGradient)" 
                fillOpacity="0.1"
              />
              <path 
                d="M0,150 C100,160 200,100 300,110 C400,120 500,60 600,80 C700,100 800,40 900,60 C1000,80" 
                fill="none" 
                stroke="#3b82f6" 
                strokeWidth="3" 
                strokeLinecap="round"
              />
              <path 
                d="M0,180 C100,170 200,140 300,150 C400,160 500,110 600,130 C700,150 800,90 900,110 C1000,130" 
                fill="none" 
                stroke="#f59e0b" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeDasharray="8 6"
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="white" />
                </linearGradient>
              </defs>
            </svg>
            <div className="hidden lg:block absolute top-10 left-[40%] bg-slate-900 text-white rounded-xl p-3 shadow-xl transform -translate-x-1/2 -translate-y-full">
              <p className="text-[10px] font-bold text-slate-400 mb-1">03 May 2023</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="text-xs font-bold">This month</span>
                  <span className="text-xs font-bold ml-2">7h</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                <span className="text-xs font-bold">Last month</span>
                <span className="text-xs font-bold ml-2">5h</span>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900" />
            </div>
            <div className="absolute top-[44%] left-[40%] w-3 h-3 bg-white border-2 border-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-sm" />
          </div>

          <div className="flex justify-between mt-6 px-2 text-[10px] font-bold text-slate-300">
            <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span>
          </div>
        </div>

        {/* Current Tasks Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="text-base lg:text-lg font-bold text-slate-900">Current Tasks</h2>
              <span className="text-[10px] font-bold text-slate-400">Done 30%</span>
            </div>
            <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
              Week <Calendar size={12} />
            </div>
          </div>

          <div className="space-y-3">
            {[
              { title: "Bali Travel Package Update", status: "In progress", duration: "4h", icon: PlayCircle, color: "orange" },
              { title: "UX Research for Travelers", status: "On hold", duration: "8h", icon: Clock, color: "blue" },
              { title: "Website Performance Audit", status: "Done", duration: "32h", icon: CheckCircle2, color: "emerald" },
            ].map((task, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-slate-100 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-slate-50 rounded-xl text-slate-400 group-hover:text-slate-900 transition-colors shrink-0">
                    <task.icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{task.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-8 border-t sm:border-t-0 pt-3 sm:pt-0">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      task.color === 'orange' ? 'bg-orange-500' :
                      task.color === 'blue' ? 'bg-blue-500' :
                      'bg-emerald-500'
                    }`} />
                    <span className="text-[10px] font-bold text-slate-500">{task.status}</span>
                  </div>
                  <div className="text-[10px] font-bold text-slate-900">{task.duration}</div>
                  <button className="p-1.5 text-slate-300 hover:text-slate-600 transition-colors">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column (Panel) */}
      <div className="w-full xl:w-80 space-y-6 lg:space-y-8">
        {/* User Card */}
        <div className="bg-slate-50 rounded-3xl lg:rounded-[2.5rem] p-6 lg:p-8 flex flex-col items-center shadow-inner">
          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 relative">
            <img src="https://ui-avatars.com/api/?name=Admin&background=1754cf&color=fff" alt="Profile" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 right-1 w-3 h-3 lg:w-4 lg:h-4 bg-emerald-500 border-2 border-white rounded-full" />
          </div>
          <h3 className="text-base lg:text-lg font-bold text-slate-900 text-center">Arunika Admin</h3>
          <p className="text-[10px] font-bold text-slate-400">@superuser_arunika</p>
          
          <div className="flex gap-3 mt-6">
            <button className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-100 hover:text-primary transition-all shadow-sm">
              <Phone size={16} />
            </button>
            <button className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-100 hover:text-primary transition-all shadow-sm">
              <Video size={16} />
            </button>
            <button className="w-9 h-9 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center text-slate-400 border border-slate-100 hover:text-primary transition-all shadow-sm">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-6 bg-white p-6 rounded-3xl lg:bg-transparent lg:p-0">
          <h3 className="text-[10px] lg:text-xs font-bold text-slate-900 px-2 uppercase tracking-widest bg-slate-50 lg:bg-transparent py-2 lg:py-0 inline-block rounded-lg lg:rounded-none">Activity Log</h3>
          
          <div className="space-y-6 px-1">
            {[1, 2, 3].map((item, i) => (
              <div key={i} className="flex gap-4 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden shrink-0 border border-white shadow-sm">
                  <img src={`https://ui-avatars.com/api/?name=${i === 0 ? "FM" : i === 1 ? "GH" : "KW"}&background=random`} alt="User" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {i === 0 ? "Floyd Miles" : i === 1 ? "Guy Hawkins" : "Kristin Watson"}
                    </span>
                    <span className="text-[8px] font-bold text-slate-300 whitespace-nowrap">10:15 AM</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                    Commented on <span className="text-primary font-bold">Bali Project Update</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Placeholder */}
          <div className="pt-2">
            <div className="bg-slate-50 border border-slate-100 p-1.5 rounded-2xl flex items-center">
              <button className="p-2 text-slate-300 hover:text-slate-500 transition-colors">
                <span className="text-lg leading-none">📎</span>
              </button>
              <input 
                type="text" 
                placeholder="Write a message..." 
                className="bg-transparent outline-none flex-1 text-[10px] px-2 text-slate-600 font-medium"
              />
              <button className="p-2 lg:p-2.5 bg-white shadow-sm rounded-xl text-slate-400 hover:text-primary transition-all">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
