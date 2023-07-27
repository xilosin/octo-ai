import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';

import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const DashboardLayout = async ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const apiLimitCount = await getApiLimitCount();
	const isSubscribed = await checkSubscription();

	return (
		<div className="h-full relative">
			<div
				className="hidden h-full md:w-72 md:flex md:flex-col md:fixed 
        md:inset-y-0 bg-gray-900"
			>
				<Sidebar
					apiLimitCount={apiLimitCount}
					isSubscribed={isSubscribed}
				/>
			</div>
			<main className="md:pl-72">
				<Navbar />
				<div className="h-full mx-auto max-w-screen-xl">{children}</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
