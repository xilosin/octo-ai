import { Settings } from 'lucide-react';

import { Heading } from '@/components/heading';
import { SubscriptionButton } from '@/components/subscription-button';

import { checkSubscription } from '@/lib/subscription';

const SettingsPage = async () => {
	const isSubscribed = await checkSubscription();

	return (
		<div>
			<Heading
				title="Settings"
				description="Manage account settings"
				icon={Settings}
				iconColor="text-gray-400"
				bgColor="bg-gray-400/10"
			/>
			<div className="px-4 lg:px-8 space-y-4">
				<div className="text-muted-foreground text-md">
					{isSubscribed
						? 'You are currently subscribed to Pro'
						: 'You are currently on a free plan'}
				</div>
				<SubscriptionButton isSubscribed={isSubscribed}>

				</SubscriptionButton>
			</div>
		</div>
	);
};

export default SettingsPage;
