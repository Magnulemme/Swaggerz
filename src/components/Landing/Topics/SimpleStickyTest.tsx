"use client";

export function SimpleStickyTest() {
  // CONFIGURAZIONE PRECISA
  const CARD_HEIGHT = 400;        // Altezza di ogni card
  const SCROLL_DISTANCE = 600;    // Quanto scroll prima che la card si liberi
  const TOP_GAP = 30;             // Distanza tra i top delle card (20, 50, 80 = gap di 30)

  // CALCOLI AUTOMATICI
  const containerHeight = CARD_HEIGHT + SCROLL_DISTANCE;  // 400 + 600 = 1000px
  const negativeMargin = -(SCROLL_DISTANCE - TOP_GAP);    // -(600 - 30) = -570px

  return (
    <div className="w-full bg-zinc-950 px-8">
      <div className="h-[300px] flex items-center justify-center">
        <p className="text-white">Scrolla giù per vedere l&apos;effetto sticky</p>
      </div>

      {/* Card 1 - Container base */}
      <div style={{ height: `${containerHeight}px` }}>
        <div
          className="sticky w-full bg-red-500 rounded-2xl flex items-center justify-center"
          style={{ height: `${CARD_HEIGHT}px`, top: "20px", zIndex: 1 }}
        >
          <h2 className="text-white text-4xl font-bold">
            Card 1 - Top 20px
          </h2>
        </div>
      </div>

      {/* Card 2 - Container con margine negativo calcolato */}
      <div style={{ height: `${containerHeight}px`, marginTop: `${negativeMargin}px` }}>
        <div
          className="sticky w-full bg-green-500 rounded-2xl flex items-center justify-center"
          style={{ height: `${CARD_HEIGHT}px`, top: "50px", zIndex: 2 }}
        >
          <h2 className="text-white text-4xl font-bold">
            Card 2 - Top 50px
          </h2>
        </div>
      </div>

      {/* Card 3 - Container con margine negativo calcolato */}
      <div style={{ height: `${containerHeight}px`, marginTop: `${negativeMargin}px` }}>
        <div
          className="sticky w-full bg-blue-500 rounded-2xl flex items-center justify-center"
          style={{ height: `${CARD_HEIGHT}px`, top: "80px", zIndex: 3 }}
        >
          <h2 className="text-white text-4xl font-bold">
            Card 3 - Top 80px
          </h2>
        </div>
      </div>

      <div className="h-[300px]"></div>
    </div>
  );
}
