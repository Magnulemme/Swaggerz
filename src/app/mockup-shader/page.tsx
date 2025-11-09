"use client";

import ShaderText from "@/components/ShaderText";

export default function MockupShaderPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-6xl">
        {/* ShaderText per SwaggerZ */}
        <div id="swaggerz-text">
          <ShaderText
            className="w-full"
            fontSize="clamp(120px, 20vw, 280px)"
            shouldRender={true}
            shouldAnimate={true}
          >
            SwaggerZ
          </ShaderText>
        </div>
      </div>
    </div>
  );
}
