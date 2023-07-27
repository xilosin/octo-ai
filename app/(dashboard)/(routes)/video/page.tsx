'use client';

import axios from 'axios';
import { Video } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Heading } from '@/components/heading';
import { Empty } from '@/components/empty';
import { Loader } from '@/components/loader';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { formSchema } from './constants';
import { useSubscriptionModal } from '@/hooks/use-subscription-modal';

const VideoPage = () => {
	const router = useRouter();
	const [video, setVideo] = useState<string>();

	const subscriptionModal = useSubscriptionModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setVideo(undefined);

			const response = await axios.post('/api/video', values);

			setVideo(response.data[0]);
		} catch (error: any) {
			if (error?.response?.status === 403) {
				subscriptionModal.onOpen();
			} else {
				toast.error('Something went wrong');
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Video Generation"
				description="Film your thoughts into video"
				icon={Video}
				iconColor="text-yellow-400"
				bgColor="bg-yellow-400/10"
			/>

			<div className="px-4 lg:px-8">
				<div>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="rounded-lg border w-full p-4 px-3 md:px-6
                focus-within:shadow-sm grid grid-cols-12 gap-2"
						>
							<FormField
								name="prompt"
								render={({ field }) => (
									<FormItem className="col-span-12 lg:col-span-10">
										<FormControl className="m-0 p-0">
											<Input
												className="
                          text-md
                          border-0 
                          outline-none 
                          focus-visible:ring-0 
                          focus-visible:ring-transparent
                        "
												disabled={isLoading}
												placeholder="Swarm of tiny, tiny kittens"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button
								disabled={isLoading}
								className="bg-gray-800 hover:bg-gray-900 col-span-12 
                  lg:col-span-2 w-full"
							>
								Generate
							</Button>
						</form>
					</Form>
				</div>

				<div className="space-y-4 mt-4">
					{isLoading && (
						<div
							className="p-8 rounded-lg w-full flex items-center 
							justify-center bg-muted"
						>
							<Loader />
						</div>
					)}
					{!video && !isLoading && (
						<Empty label="Octo is adjusting their cameras 🎥" />
					)}
					{video && (
						<video
							controls
							className="w-full aspect-video mt-8 rounded-lg border 
								bg-black"
						>
							<source src={video} />
						</video>
					)}
				</div>
			</div>
		</div>
	);
};
export default VideoPage;
