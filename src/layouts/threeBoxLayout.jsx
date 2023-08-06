import React from "react";

export default function ThreeBoxLayout({ topLeft, bottomLeft, right }) {
  const left = 70;

  const top = 60;

  return (
    <div className="w-full h-full font-Montserrat text-white flex flex-row mx-auto relative">
      <div className='flex flex-col justify-between mr-2 min-w-[830px]'>
        <div className="text-2xl bg-[#3D5E70] h-3/5 flex items-center justify-center">
          {topLeft}
        </div>
        <div className="text-2xl p-4 bg-[#3D5E70] h-2/5 flex-col flex items-center justify-center mt-2">
          {bottomLeft}
        </div>
      </div>
      <div className='text-2xl p-8 bg-[#3D5E70] flex flex-col h-auto'>
        {right}
      </div>
    </div>
  );
}

