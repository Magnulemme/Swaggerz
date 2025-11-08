import { SectionTitle } from "../SectionTitle";
import BannerAndFeaturedProductLg from "./BannerAndFeaturedProductLg";
import BannerAndFeaturedProductMobile from "./BannerAndFeaturedProductMobile";
import FeaturedProduct from "./FeaturedProduct";

const BannerAndFeaturedProductWithTitle = () => {
  return (
    <>
      <SectionTitle
        title="Collaborazioni"
        shaderText="Esclusive"
        description="Drop limitati e partnership uniche con i migliori brand streetwear"
        size="md"
      />
      <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 auto-rows-auto z-50 mx-lg">
        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:contents">
          <BannerAndFeaturedProductLg />
        </div>

        {/* Mobile/Tablet Layout (< lg) */}
        <div className="lg:hidden contents">
          <BannerAndFeaturedProductMobile />
        </div>

        {/* Featured Product - SOLO mobile */}
        <div className="col-span-2 lg:hidden min-h-[300px] z-20">
          <FeaturedProduct />
        </div>
      </div>
    </>
  );
};
export default BannerAndFeaturedProductWithTitle;
