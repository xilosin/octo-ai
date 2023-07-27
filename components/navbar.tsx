import { UserButton } from '@clerk/nextjs';

import MobileSidebar from '@/components/mobile-sidebar';

import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const Navbar = async () => {
	const apiLimitCount = await getApiLimitCount();
	const isSubscribed = await checkSubscription();

	return (
		<div className="flex items-center p-4">
			{/* Mobile Navbar */}
			<MobileSidebar
				apiLimitCount={apiLimitCount}
				isSubscribed={isSubscribed}
			/>

			{/* Main Navbar */}
			<div className="flex w-full justify-end">
				<UserButton afterSignOutUrl="/" />
			</div>
		</div>
	);
};

export default Navbar;
