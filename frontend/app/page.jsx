import Home from './(homes)/home-6/page';
import CookieBanner from '@/components/ui/banner/CookieBanner';

export const metadata = {
  title: 'DeliBike',
  description: 'DeliBike',
};
export default function HomePage1() {
  return (
    <>
      <Home />
      <CookieBanner />
    </>
  );
}
