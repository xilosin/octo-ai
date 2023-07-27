'use client';

import axios from 'axios';
import { Music } from 'lucide-react';
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

const MusicPage = () => {
	const router = useRouter();
	const [music, setMusic] = useState<string>();

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
			setMusic(undefined);

			const response = await axios.post('/api/music', values);

			setMusic(response.data.audio);
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
				title="Music Generation"
				description="Compose your thoughts into music"
				icon={Music}
				iconColor="text-green-400"
				bgColor="bg-green-400/10"
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
												placeholder="Classical guitar with drums"
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
					{!music && !isLoading && (
						<Empty label="Octo is tuning their instrument \uD83C\uDFB5" />
					)}
					{music && (
						<audio
							controls
							className="w-full mt-8"
						>
							<source src={music} />
						</audio>
					)}
				</div>
			</div>
		</div>
	);
};
export default MusicPage;
