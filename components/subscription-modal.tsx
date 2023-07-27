'use client';

import axios from 'axios';
import { Check, Zap } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import { tools } from '@/constants';
import { useSubscriptionModal } from '@/hooks/use-subscription-modal';
import { cn } from '@/lib/utils';

export const SubscriptionModal = () => {
	const subscriptionModal = useSubscriptionModal();
	const [loading, setLoading] = useState(false);

	const onSubscribe = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/stripe');

			window.location.href = response.data.url;
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog
			open={subscriptionModal.isOpen}
			onOpenChange={subscriptionModal.onClose}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle
						className="flex justify-center items-center 
            flex-col gap-y-4 pb-2"
					>
						<div className="flex items-center gap-x-2 font-bold py-1">
							<div>
								Upgrade&nbsp;
								<span className="text-orange-400">Octo</span>
							</div>
							<Badge
								variant="premium"
								className="uppercase text-sm py-1"
							>
								Pro
							</Badge>
						</div>
					</DialogTitle>
					<DialogDescription
						className="text-center pt-2 space-y-2
            text-zinc-900 font-medium"
					>
						{tools.map((tool) => (
							<Card
								key={tool.label}
								className="p-3 border-black/5 flex items-center 
                  justify-between"
							>
								<div className="flex items-center gap-x-4">
									<div
										className={cn(
											`p-2 w-fit rounded-md`,
											tool.bgColor
										)}
									>
										<tool.icon
											className={cn(`w-6 h-6`, tool.color)}
										/>
									</div>
									<div className="font-semibold text-sm">
										{tool.label}
									</div>
								</div>
								<Check className="text-primary w-5 h-5" />
							</Card>
						))}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						disabled={loading}
						onClick={onSubscribe}
						variant="premium"
						size="lg"
						className="w-full"
					>
						Upgrade
						<Zap className="w-5 h-5 ml-2 fill-white" />
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
