import { useEffect, useState } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';

export const useClientSideRouter = () => {
  const [router, setRouter] = useState<ReturnType<typeof useNextRouter> | null>(null);

  useEffect(() => {
    setRouter(useNextRouter());
  }, []);

  return router;
};