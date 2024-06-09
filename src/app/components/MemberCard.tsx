import React from "react";

interface MemberCardProps {
  isActive: boolean;
  setIsActive: () => void;
}

export default function MemberCard({ isActive, setIsActive }: MemberCardProps) {
  return (
    <div className=" flex flex-col mt-3 bg-white p-3 rounded-lg shadow-md w-60">
      <div>Member Card</div>
      <div className="mt-3 self-center">XXXXXX-XXXXX-XXXXX</div>
      <div className="mt-3">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            id="switch"
            type="checkbox"
            className="peer sr-only"
            onChange={setIsActive}
            checked={isActive}
          />
          <label className="hidden"></label>
          <div className="peer h-6 w-11 rounded-full border bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
        </label>
      </div>
    </div>
  );
}
