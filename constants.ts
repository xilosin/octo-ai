import { 
	Code,
	ImageIcon,
	MessageSquare,
	Music,
	VideoIcon
} from 'lucide-react'

export const MAX_FREE_COUNTS = 100

export const tools = [
	{
		label: 'Conversation',
		icon: MessageSquare,
		color: 'text-blue-400',
		bgColor: 'bg-blue-400/10',
		href: '/conversation'
	},
	{
		label: 'Image Generation',
		icon: ImageIcon,
		color: 'text-pink-400',
		bgColor: 'bg-pink-400/10',
		href: '/image'
	},
	{
		label: 'Video Generation',
		icon: VideoIcon,
		color: 'text-yellow-400',
		bgColor: 'bg-yellow-400/10',
		href: '/video'
	},
	{
		label: 'Music Generation',
		icon: Music,
		color: 'text-green-400',
		bgColor: 'bg-green-400/10',
		href: '/music'
	},
	{
		label: 'Code Generation',
		icon: Code,
		color: 'text-orange-400',
		bgColor: 'bg-orange-400/10',
		href: '/code'
	},
]