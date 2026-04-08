import BSOD from '@/components/xp/BSOD';

export default function NotFound() {
  return (
    <BSOD
      errorCode="PAGE_NOT_FOUND_IN_REVENUE_MAP"
      message={`The page you requested could not be located in the\nRevenue Architecture. It may have been moved, deleted,\nor never existed in this dimension.`}
    />
  );
}
