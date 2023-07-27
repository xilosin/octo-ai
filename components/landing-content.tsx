'use client';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

const testimonials = [
	{
		name: 'Antonio',
		avatar: 'A',
		title: 'Software Engineer',
		description: `This multipurpose AI tool has transformed my 
    productivity, making tasks effortless and saving me valuable 
    time every day!`,
	},
	{
		name: 'Kiri',
		avatar: 'K',
		title: 'UI/UX Developer',
		description: `With its versatile features, this AI tool adapts 
    seamlessly to my needs, helping me tackle diverse challenges 
    effortlessly.`,
	},
	{
		name: 'Samael',
		avatar: 'S',
		title: 'Digital Marketing',
		description: `I never knew handling projects could be this 
    smooth - thank you, Octo, for simplifying my work life`,
	},
	{
		name: 'Yone',
		avatar: 'Y',
		title: 'Product Manager',
		description: `This multipurpose AI tool is like having a team 
    of experts at my fingertips, always ready to assist and innovate`,
	},
];

export const LandingContent = () => {
	return (
		<div className="px-10 pb-20">
			<h2
				className="text-center text-4xl text-white 
        font-extrabold mb-10"
			>
				Testimonials
			</h2>
			<div
				className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-4 gap-4"
			>
				{testimonials.map((item) => (
					<Card
						key={item.description}
						className="bg-[#192339] border-none text-white"
					>
						<CardHeader>
							<CardTitle className="flex items-center gap-x-2">
								<div>
									<p className="text-lg">{item.name}</p>
									<p className="text-zinc-400 text-sm">
										{item.title}
									</p>
								</div>
							</CardTitle>
							<CardContent className="pt-4 px-0">
								{item.description}
							</CardContent>
						</CardHeader>
					</Card>
				))}
			</div>
		</div>
	);
};
