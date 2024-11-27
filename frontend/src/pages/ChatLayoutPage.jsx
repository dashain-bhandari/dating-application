import React from "react";
import profile1 from "../images/exploreProfile/profile1.png";
import { Icon } from "@iconify/react";

export default function ChatLayoutPage() {
  return (
    <main className="bg-[#D9D9D9] p-4 rounded-2xl">
      <section className="flex justify-between">
        <div className="flex items-center gap-2">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img
              src={profile1}
              alt="profile1"
              className="h-full w-full object-top object-cover"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg px-2">Sita gautam</span>
            <span className="flex gap-1 items-center justify-start">
              <Icon icon="radix-icons:dot-filled" className="text-2xl" />
              Offline
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Icon
            icon="fluent:call-12-filled"
            className="text-2xl text-[#662D91]"
          />
          <Icon icon="wpf:video-call" className="text-2xl text-[#662D91]" />
        </div>
      </section>
    </main>
  );
}
