'use client';

import axios from 'axios';
import { MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ChatCompletionRequestMessage } from 'openai';
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
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/user-avatar';
import { BotAvatar } from '@/components/bot-avatar';

import { useSubscriptionModal } from '@/hooks/use-subscription-modal';

const ConversationPage = () => {
	const router = useRouter();
	const [messages, setMessages] = useState<
		ChatCompletionRequestMessage[]
	>([]);

	const subscriptionModal = useSubscriptionModal();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			prompt: '',
		},
	});

	const isLoading = form.formState.isSubmitting;

	const onSubmit = async (
		values: z.infer<typeof formSchema>
	) => {
		try {
			const userMessage: ChatCompletionRequestMessage = {
				role: 'user',
				content: values.prompt,
			};

			const newMessages = [...messages, userMessage];

			const response = await axios.post(
				'/api/conversation',
				{
					messages: newMessages,
				}
			);

			setMessages((current) => [
				...current,
				userMessage,
				response.data,
			]);
		} catch (error: any) {
			if (error?.response?.status === 403) {
				subscriptionModal.onOpen();
			} else {
				toast.error("Something went wrong")
			}
		} finally {
			router.refresh();
		}
	};

	return (
		<div>
			<Heading
				title="Conversation"
				description="Our most advanced conversation AI model"
				icon={MessageSquare}
				iconColor="text-blue-400"
				bgColor="bg-blue-400/10"
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
												placeholder="What are blackholes made of?"
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
					{messages.length === 0 && !isLoading && (
						<Empty label="Octo is staring at you. Quick! \uD83D\uDCAC something!" />
					)}
					<div className="flex flex-col-reverse gap-y-4">
						{messages.map((message) => (
							<div
								key={message.content}
								className={cn(
									`p-8 w-full flex items-center gap-x-8 rounded-lg`,
									message.role === 'user'
										? 'bg-muted'
										: 'bg-gray-400/40 flex-row-reverse'
								)}
							>
								{message.role === 'user' ? (
									<UserAvatar />
								) : (
									<BotAvatar />
								)}
								<p className="text-md leading-8">
									{message.content}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ConversationPage;
