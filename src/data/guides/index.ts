import { ToolGuideContent } from "./types";
import { TIKTOK_GUIDE } from "./tiktokGuide";
import { ETSY_GUIDE } from "./etsyGuide";
import { ROAS_GUIDE } from "./roasGuide";
import { STRIPE_PAYPAL_GUIDE } from "./stripePaypalGuide";
import { SHOPIFY_POD_GUIDE } from "./shopifyPodGuide";
import { FREELANCE_GUIDE } from "./freelanceGuide";

export const TOOL_GUIDES: Record<string, ToolGuideContent> = {
  [TIKTOK_GUIDE.slug]: TIKTOK_GUIDE,
  [ETSY_GUIDE.slug]: ETSY_GUIDE,
  [ROAS_GUIDE.slug]: ROAS_GUIDE,
  [STRIPE_PAYPAL_GUIDE.slug]: STRIPE_PAYPAL_GUIDE,
  [SHOPIFY_POD_GUIDE.slug]: SHOPIFY_POD_GUIDE,
  [FREELANCE_GUIDE.slug]: FREELANCE_GUIDE,
};

