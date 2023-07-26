'use client';

import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {
	Code,
	ImageIcon,
	LayoutDashboard,
	MessageSquare,
	Music,
	Settings,
	VideoIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const montserrat = Montserrat({
	weight: '600',
	subsets: ['latin'],
});

const routes = [
	{
		label: 'Dashboard',
		icon: LayoutDashboard,
		href: '/dashboard',
		color: 'text-violet-400',
	},
	{
		label: 'Conversation',
		icon: MessageSquare,
		href: '/conversation',
		color: 'text-blue-400',
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		href: '/image',
		color: 'text-pink-400',
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		href: '/video',
		color: 'text-yellow-400',
	},
	{
		label: 'Music Generation',
		icon: Music,
		href: '/music',
		color: 'text-green-400',
	},
	{
		label: 'Code Generation',
		icon: Code,
		href: '/code',
		color: 'text-orange-400',
	},
	{
		label: 'Settings',
		icon: Settings,
		href: '/settings',
		color: 'text-gray-400',
	},
];

const Sidebar = () => {
	const pathname = usePathname()

	return (
		<div
			className="space-y-4 py-4 flex flex-col h-full bg-[#111827] 
      text-white"
		>
			<div className="px-3 py-2 flex-1">
				<Link
					href="/dashboard"
					className="flex items-center pl-3 mb-14"
				>
					<div className="relative w-8 h-8 mr-4">
						<Image
							fill
							alt="Logo"
							src="/logo_base.png"
						/>
					</div>
					<h1
						className={cn(
							'text-2xl font-bold text-orange-400',
							montserrat.className
						)}
					>
						OctoAI
					</h1>
				</Link>
				<div className="space-y-1">
					{routes.map((route) => (
						<Link
							key={route.href}
							href={route.href}
							className={cn(`text-sm group flex p-3 w-full justify-start 
                font-medium cursor-pointer hover:text-white 
                hover:bg-white/10 rounded-lg transition`,
								pathname === route.href ? 'text-white bg-white/10' :
								'text-zinc-400'
							)}
						>
							<div className="flex items-center flex-1">
								<route.icon className={cn('h-5 w-5 mr-3', route.color)} />
								{route.label}
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Sidebar;
