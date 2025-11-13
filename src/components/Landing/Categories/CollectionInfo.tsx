import { type CategoryCard } from "./categories.constants";

interface CollectionInfoProps {
  collection: CategoryCard;
  isTransitioning: boolean;
}

export function CollectionInfo({
  collection,
  isTransitioning,
}: CollectionInfoProps) {
  return (
    <div
      className={`
        hidden lg:flex
        absolute right-[10%] xl:right-[14%] top-[55%] -translate-y-1/2
        w-[300px] xl:w-[360px]
        flex-col gap-6
        transition-all duration-700 ease-out
        ${isTransitioning ? "opacity-0 translate-x-12" : "opacity-100 translate-x-0"}
      `}
      style={{
        zIndex: 50,
        pointerEvents: "auto",
      }}
    >
      {/* Collection Label */}
      <div className="flex flex-col gap-2">
        <span className="text-white/40 text-xs font-light uppercase tracking-[0.3em]">
          Collection
        </span>
        <div className="h-px w-12 bg-gradient-to-r from-white/30 to-transparent" />
      </div>

      {/* Nickname - Premium Typography */}
      {collection.nickname && (
        <h3 className="text-white text-3xl xl:text-4xl font-light tracking-tight leading-tight">
          {collection.nickname}
        </h3>
      )}

      {/* Description - Premium Typography */}
      {collection.description && (
        <p className="text-white/70 text-sm xl:text-base font-light leading-relaxed tracking-wide">
          {collection.description}
        </p>
      )}

      {/* Item Count - Minimal Style */}
      {collection.itemCount && (
        <div className="flex items-baseline gap-3 pt-4">
          <span className="text-white text-4xl xl:text-5xl font-extralight tabular-nums">
            {collection.itemCount}
          </span>
          <span className="text-white/40 text-xs font-light uppercase tracking-[0.2em]">
            Items
          </span>
        </div>
      )}
    </div>
  );
}
