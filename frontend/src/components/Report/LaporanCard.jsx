import React from "react";

export default function LaporanCard({ title, value, icon, bgColor, textColor }) {
  return (
    <div className={`p-5 rounded-xl shadow-md ${bgColor} flex flex-col justify-between h-32`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${textColor}`}>{title}</p>
        <div className={`p-2 rounded-full ${bgColor.replace("-100", "-200")} ${textColor}`}>
          {icon}
        </div>
      </div>
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
    </div>
  );
}
