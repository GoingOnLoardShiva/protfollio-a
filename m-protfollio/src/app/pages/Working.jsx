import React from "react";

export default function Working() {
  return (
    <div>
      <div className="working-project p-4 sm:p-16 grid sm:flex justify-between md:flex gap-10 sm:gap-0 md:gap-0 overflow-hidden">
        <div className="f-w-project relative w-full max-w-[708px] ">
          {/* TEXT OVERLAY */}
          <a href="/" className="overflow-text absolute inset-0 flex flex-col justify-between p-6">
            {/* TOP - COMPANY NAME */}
            <div className="f-o-v-text text-white font-bold text-lg md:text-2xl">
              Company Name
            </div>

            {/* BOTTOM - DETAILS */}
            <div className="bottom-o-v-text flex flex-col sm:flex-row gap-4 sm:justify-between text-white font-mono text-xs md:text-sm">
              <div className="left-text grid">
                <span>UI/UX Design</span>
                <span>Website Development</span>
                <span>SEO Setup</span>
              </div>

              <div className="right-text grid">
                <span>WebSocket</span>
                <span>SaaS App</span>
                <span>N8N</span>
              </div>
            </div>
          </a>

          {/* IMAGE */}
          <div className="w-f-img w-full h-[400px] md:h-[708px] overflow-hidden">
            <img
              src="/Hopstack-website_1.avif"
              className="w-full h-full object-cover"
              alt="Project"
            />
          </div>
        </div>
        <div className="f-w-project relative w-full max-w-[708px] ">
          {/* TEXT OVERLAY */}
          <a href="/" className="overflow-text absolute inset-0 flex flex-col justify-between p-6">
            {/* TOP - COMPANY NAME */}
            <div className="f-o-v-text text-white font-bold text-lg md:text-2xl">
              Company Name
            </div>

            {/* BOTTOM - DETAILS */}
            <div className="bottom-o-v-text flex flex-col sm:flex-row gap-4 sm:justify-between text-white font-mono text-xs md:text-sm">
              <div className="left-text grid">
                <span>UI/UX Design</span>
                <span>Website Development</span>
                <span>SEO Setup</span>
              </div>

              <div className="right-text grid">
                <span>WebSocket</span>
                <span>SaaS App</span>
                <span>N8N</span>
              </div>
            </div>
          </a>

          {/* IMAGE */}
          <div className="w-f-img w-full h-[400px] md:h-[708px] overflow-hidden">
            <img
              src="/Marketplace-Company-Home-Mobile-mockup_1.avif"
              className="w-full h-full object-cover"
              alt="Project"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
