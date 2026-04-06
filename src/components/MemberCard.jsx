import React from 'react';
import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const MemberCard = ({ user }) => {
  if (!user) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D4C59E] to-[#B8AA7E] p-8 text-white shadow-xl"
    >
      {/* Decorative Crown */}
      <div className="absolute top-[-20px] left-[-20px] opacity-10">
        <Crown size={150} />
      </div>

      <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Crown className="w-8 h-8 text-white" />
             </div>
             <h2 className="text-4xl font-bold tracking-tight">{user.level}</h2>
          </div>
          <p className="text-white/80 font-medium">Chào mừng trở lại !</p>
          <div className="pt-4 space-y-1">
             <div className="flex justify-between text-sm font-semibold opacity-90">
                <span>Hạng hiện tại: Gold</span>
                <span>Hạng tiếp theo: {user.nextLevelName}</span>
             </div>
             {/* Progress Bar */}
             <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${user.progressToNextLevel}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)]"
                />
             </div>
             <p className="text-xs font-medium opacity-80 pt-1">Còn {user.pointsToNextLevel.toLocaleString()} điểm nữa để lên hạng</p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-5xl font-bold">{user.points.toLocaleString()}</div>
          <div className="text-lg font-medium opacity-90">Điểm thưởng</div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;
