'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from '@/components/ui/sheet';
import Sidebar from '@/components/sidebar';

interface MobileSidebarProps {
	apiLimitCount: number;
	isSubscribed: boolean;
}

const MobileSidebar = ({
	apiLimitCount = 0,
	isSubscribed = false,
}: MobileSidebarProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	return (
		<Sheet>
			<SheetTrigger>
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
				>
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent
				side="left"
				className="p-0"
			>
				<Sidebar
					apiLimitCount={apiLimitCount}
					isSubscribed={isSubscribed}
				/>
			</SheetContent>
		</Sheet>
	);
};
export default MobileSidebar;